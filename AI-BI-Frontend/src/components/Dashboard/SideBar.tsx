"use client";

import React, { useState } from "react";
import {
  House,
  SquareKanban,
  DatabaseZap,
  ChevronDown,
  ChevronUp,
  Settings,
  LogOut,
  History,
} from "lucide-react";
import Link from "next/link";

import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { useRouter } from "next/navigation";
import { logout } from "@/store/features/authSlice";
import Image from "next/image";
import { GetDB } from "@/services/DbServices";

import { DbDataTypRes } from "@/services/DbServices";

interface PropsType {
  selection: string;
  setSelection: (arg: string) => void;

  setSelectingDb: (arg: number | undefined) => void;
}

function SideBar(props: PropsType) {
  const [dropDataSource, setDropDataSource] = useState<boolean>(false);
  const [databses, setDatabases] = useState<DbDataTypRes[]>([]);

  const [dropHistory, setDropHistory] = useState(false);

  const HandleDropSource = async () => {
    setDropDataSource((prev) => !prev);
    const token = localStorage.getItem("accessToken");

    try {
      const result = await GetDB(token);

      if (result) {
        setDatabases(result);
      }
    } catch {
      toast.error("Error fetching database info.....", {
        className: "custom-toast-success",
        autoClose: 2000,
      });
    } finally {
    }
  };

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    toast.info("Logged out ...", {
      className: "custom-toast-success",
      autoClose: 2000,
    });
    setTimeout(() => router.push("/"), 2000);
  };

  const [selectDataSource, setSelectDataSource] = useState<string>("");

  const HandleSelectDataSource = (name: string) => {
    setSelectDataSource(name);

    const dbID = databses.find((element) => element.db_name === name);
    props.setSelectingDb(dbID?.id);
  };
  return (
    <>
      <ToastContainer />
      <div className="flex-1 min-h-screen px-4 py-5 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-8">
            <Link href="/">
              <div className="h-8 w-auto flex items-center">
                <Image
                  src="/logo.png"
                  alt="AI-BI"
                  width={110}
                  height={110}
                  className="object-contain -ml-4"
                />
              </div>
            </Link>
            <Link href="/user/setting">
              <Settings size={18} />
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => props.setSelection("home")}
              className={`flex items-center gap-2 cursor-pointer hover:opacity-55  ${
                props.selection === "home" && "bg-gray-100 dark:bg-background"
              } p-1 rounded-md  `}
            >
              <House size={20} color="#4b1281" />
              <p className="text-xs font-semibold">Home</p>
            </button>
            <button
              onClick={() => props.setSelection("metrics")}
              className={`flex items-center gap-2 cursor-pointer hover:opacity-55  ${
                props.selection === "metrics" &&
                "bg-gray-100 dark:bg-background "
              } p-1 rounded-md `}
            >
              <SquareKanban size={20} color="#db5a51" />
              <p className="text-xs font-semibold">Metrics</p>
            </button>
            <div className="relative w-full">
              <button
                className={`flex items-center gap-2 cursor-pointer hover:opacity-55  ${
                  props.selection === "database" &&
                  "bg-gray-50 dark:bg-background "
                } rounded-md w-full `}
                onClick={HandleDropSource}
              >
                <DatabaseZap size={20} color="#3d85c6" />
                <p className="text-xs font-semibold">Data Source</p>

                {dropDataSource ? (
                  <ChevronUp size={15} />
                ) : (
                  <ChevronDown size={15} />
                )}
              </button>
              {dropDataSource && (
                <div className="left-8 top-8 w-[80%] flex justify-start">
                  <ul className="flex flex-col gap-2 ml-5 mt-2">
                    {databses.map((item, index) => (
                      <li
                        key={index}
                        className={`text-xs cursor-pointer hover:opacity-60   ${
                          selectDataSource === item.db_name
                            ? "bg-gray-100 px-1 py-1 rounded-md"
                            : "text-gray-600"
                        } `}
                        onClick={() => HandleSelectDataSource(item.db_name)}
                      >
                        <div className="flex gap-1 items-center">
                          {item.db_name}
                          {selectDataSource === item.db_name && (
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="relative w-full">
              <button
                onClick={() => setDropHistory((prev) => !prev)}
                className={`flex items-center gap-2 cursor-pointer hover:opacity-55  ${
                  props.selection === "history" &&
                  "bg-gray-100 dark:bg-background"
                } p-1 rounded-md w-full`}
              >
                <History size={20} color="#50C878" />
                <p className="text-xs font-semibold">History</p>
                {dropHistory ? (
                  <ChevronUp size={15} />
                ) : (
                  <ChevronDown size={15} />
                )}
              </button>

              {dropHistory && (
                <ul className="ml-5 mt-2 flex flex-col gap-1">
                  <li
                    onClick={() => props.setSelection("recent")}
                    className="text-xs cursor-pointer hover:opacity-60 text-gray-600"
                  >
                    Session1
                  </li>
    
                </ul>
              )}
            </div>
          </div>
        </div>
        <div className="mb-30">
          <button
            className="flex items-center justify-start gap-2 cursor-pointer hover:scale-105"
            onClick={handleLogout}
          >
            <LogOut size={15} />
            <p className="text-sm">LogOut</p>
          </button>
        </div>
      </div>
    </>
  );
}

export default SideBar;
