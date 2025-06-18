"use client";

import React, {
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  FormEvent,
} from "react";
import { PulseLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import { CircleChevronUp, Brain } from "lucide-react";
import DynamicChart from "@/components/Graphs/DynamicChart";
import { v4 as uuidv4 } from "uuid";

interface PropType {
  selectingDb: number | undefined;
}

type ChartType = "line" | "bar" | "pie" | "scatter";

interface CommonDatasetBase {
  label: string;
  backgroundColor?: string | string[];
  borderColor?: string | string[];
  borderWidth?: number;
}

interface LineBarPieDataset extends CommonDatasetBase {
  data: number[];
  fill?: boolean;
}

interface ScatterDataset extends CommonDatasetBase {
  data: { x: number; y: number }[];
}

type ChartDataset = LineBarPieDataset | ScatterDataset;

interface ChartData {
  labels?: string[];
  datasets: ChartDataset[];
}

interface ChartOptions {
  responsive?: boolean;
  maintainAspectRatio?: boolean;
  plugins?: {
    title?: {
      display: boolean;
      text: string;
    };
    legend?: {
      display?: boolean;
      position?: "top" | "bottom" | "left" | "right";
    };
    [key: string]: unknown;
  };
  scales?: {
    x?: {
      title?: {
        display: boolean;
        text: string;
      };
      min?: number;
      max?: number;
    };
    y?: {
      title?: {
        display: boolean;
        text: string;
      };
      min?: number;
      max?: number;
    };
  };
  [key: string]: unknown;
}

interface ChartSchema {
  type: ChartType;
  data: ChartData;
  options: ChartOptions;
}

const Metrics: React.FC<PropType> = ({ selectingDb }) => {
  const [message, setMessage] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [chartSchemas, setChartSchemas] = useState<ChartSchema[]>([]);
  const [chatHistory, setChatHistory] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const BaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    const newSessionId = uuidv4();
    localStorage.setItem("session_id", newSessionId);
  }, []);

  const sendMessageStreaming = async (
    userMessage: string,
    accessToken: string | null
  ): Promise<string> => {
    const sessionId = localStorage.getItem("session_id");

    const response = await fetch(
      `${BaseUrl}/api/connection/test-chating`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ message: userMessage, session_id: sessionId }),
      }
    );

    if (!response.ok || !response.body) {
      throw new Error("Network response was not OK");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

    let partialText = "";
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (let line of lines) {
        line = line.trim();
        if (!line) continue;

        if (line.startsWith("data:")) {
          line = line.slice("data:".length).trim();
        }

        try {
          const parsed = JSON.parse(line);
          const currentState = parsed.state;
          const dataType = parsed.data_type;
          const currentData = parsed.data;

           console.log(Response);

          if (currentState) {
            setStatus(currentState);
          }

          if (dataType === "text") {
            if (partialText === "") {
              // First chunk, push new assistant message
              setChatHistory((prev) => [
                ...prev,
                { role: "assistant", content: currentData },
              ]);
            } else {
              // Append to the last assistant message
              setChatHistory((prev) => {
                const updated = [...prev];
                const last = updated.pop();
                if (last && last.role === "assistant") {
                  updated.push({
                    ...last,
                    content: last.content + currentData,
                  });
                } else {
                  if (last) updated.push(last);
                  updated.push({ role: "assistant", content: currentData });
                }
                return updated;
              });
            }

            partialText += currentData;
          } else if (dataType === "charts") {
            setChartSchemas(parsed.data.schemas as ChartSchema[]);
          }
        } catch {
          console.warn("Malformed line:", line);
        }
      }
    }

    return partialText;
  };

 
  

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.trim()) return;

    setChartSchemas([]);
    setStatus("loading...");

    // Add user message to chat history
    setChatHistory((prev) => [...prev, { role: "user", content: message }]);

    try {
      const accessToken = localStorage.getItem("accessToken");
      await sendMessageStreaming(message, accessToken);
      setStatus("done");
    } catch {
      toast.error("There was an error processing your request.");
      setStatus("error");
    } finally {
      setMessage("");
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <div className="flex-8 bg-gray-50 m-2 rounded-md px-3 py-4 flex">
      <ToastContainer />

      {/* Left Side: Chart Area */}
      <div className="w-2/3 bg-white p-6  shadow-md overflow-auto">
        <h2 className="text-l font-semibold mb-4">Chart Visualization</h2>
        {chartSchemas.length > 0 ? (
          <div className="h-[400px] w-[90%] mx-auto">
            <DynamicChart
              type={chartSchemas[0].type}
              data={chartSchemas[0].data}
              options={chartSchemas[0].options}
            />
          </div>
        ) : (
          <p className="text-gray-400 text-xs">No chart data yet...</p>
        )}
      </div>

      {/* Right Side: Chat Area */}
      <div className="w-1/3  bg-white p-6  shadow-md overflow-auto ml-1">
        <h2 className="text-l font-semibold mb-4">Live Chat & Assistant</h2>

        {selectingDb === undefined ? (
          <p className="text-red-500">⚠️ Please select a database first.</p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className=" flex flex-col justify-between h-[600px]"
          >
            <div
              className="mt-4 p-4 bg-gray-100 rounded-xl text-gray-700 max-h-[410px] overflow-y-auto flex flex-col gap-3"
              ref={chatContainerRef}
            >
              {chatHistory.length === 0 && (
                <p className="text-xs text-gray-400">
                  How can I assist you today?
                </p>
              )}

              {chatHistory.map((msg, index) => {
                const isLastAssistant =
                  msg.role === "assistant" && index === chatHistory.length - 1;
                const showStatus = isLastAssistant && status !== "done";

                return (
                  <div key={index} className="flex flex-col gap-1">
                    {showStatus && (
                      <div className="flex items-center text-xs text-gray-500 gap-1">
                        <Brain size={14} className="text-purple-500" />
                        <span>{status}</span>
                      </div>
                    )}
                    <div
                      className={`p-2 rounded-md text-sm whitespace-pre-line ${
                        msg.role === "user"
                          ? "bg-blue-100 text-blue-900 self-end"
                          : "bg-gray-200 text-gray-800 self-start"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="">
              <textarea
                value={message}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setMessage(e.target.value)
                }
                placeholder="Type your message here..."
                className="w-full  p-3 border border-gray-300 rounded-lg resize-none placeholder:text-xs text-sm focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                rows={4}
              />

              <div className="flex items-center justify-end w-full">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-3 py-2 bg-gray-200 text-gray-900 rounded-lg hover:opacity-55 text-xs cursor-pointer mt-3"
                >
                  {status === "loading..." ? (
                    <PulseLoader size={6} color="#000000" />
                  ) : (
                    <>
                      <CircleChevronUp size={20} />
                      Send
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Metrics;
