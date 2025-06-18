import React, { useState } from "react";
import { Button } from "../ui/button";
import { AddDB } from "@/services/DbServices";
import { PulseLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import Image from "next/image";


function DataSource() {
  const [db_hostname, setHostName] = useState<string>("");
  const [db_name, setDbName] = useState<string>("");
  const [db_username, setUserName] = useState<string>("");
  const [db_password, setDbPassword] = useState<string>("");
  const [db_type, setEngine] = useState<string>("mysql");
  const [loading, setLoading] = useState<boolean>(false);
  const [mysql, setMySql] = useState<boolean>(false);

  const HandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const dbData = { db_hostname, db_name, db_username, db_password, db_type };

    const token = localStorage.getItem("accessToken");
    e.preventDefault();

    try {
      setLoading(true);

      const result = await AddDB(token, dbData);

      if (result.status !== 200) {
        toast.error("Connection with the db failed", {
          className: "custom-toast-error",
          autoClose: 2000,
        });
      }

      if (result.status === 200) {
        toast.success("Database is connected...", {
          className: "custom-toast-error",
          autoClose: 2000,
        });
        setMySql(true)
      }
    } catch {
      setLoading(false);
      toast.error("Error adding database info.....");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-8 bg-background min-h-screen m-2 rounded-lg px-3 py-4">
      <ToastContainer />
      <div className="flex flex-col  px-4 space-y-4">
        <div className="text-xl text-foreground">
          <h1 className="font-semibold text-sm">Connecting with Database</h1>
        </div>
        <hr></hr>

        <form
          onSubmit={HandleSubmit}
          className="flex flex-col gap-2 min-w-xl mx-auto mt-10 shadow-md p-5"
        >
          {mysql && (
            <div className="w-12 h-12 relative rounded-full overflow-hidden">
              <Image
                src="/MySQL.png"
                alt="mysql"
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="flex-1 flex gap-1  flex-col">
            <label className="mb-2 text-sm text-slate-500">Host Name</label>
            <input
              type="text"
              placeholder="Host Name"
              className="px-4 py-2 rounded-md bg-gray-50 border-none text-sm text-black outline-none placeholder:text-xs"
              value={db_hostname}
              onChange={(e) => setHostName(e.target.value)}
              required
            />
          </div>
          <div className="flex-1 flex gap-1  flex-col">
            <label className="mb-2 text-sm text-slate-500">Database Name</label>
            <input
              type="text"
              placeholder="Database Name"
              className="px-4 py-2 rounded-md bg-gray-50 border-none text-sm text-black outline-none placeholder:text-xs"
              value={db_name}
              onChange={(e) => setDbName(e.target.value)}
              required
            />
          </div>
          <div className="flex-1 flex gap-1  flex-col">
            <label className="mb-2 text-sm text-slate-500">Username</label>
            <input
              type="text"
              placeholder="Username"
              className="px-4 py-2 rounded-md bg-gray-50 border-none text-sm text-black outline-none placeholder:text-xs"
              value={db_username}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div className="flex-1 flex gap-1  flex-col">
            <label className="mb-2 text-sm text-slate-500">Password</label>
            <input
              type="password"
              placeholder="Password"
              className="px-4 py-2 rounded-md bg-gray-50 border-none text-sm text-black outline-none placeholder:text-xs"
              value={db_password}
              onChange={(e) => setDbPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex-1 flex gap-1  flex-col">
            <label htmlFor="dropdown" className="mb-2 text-sm text-slate-500">
              Database Engine
            </label>
            <select
              id="dropdown"
              className="px-4 py-2 rounded-md bg-gray-50 border-none text-sm text-black outline-none placeholder:text-xs"
              value={db_type}
              onChange={(e) => setEngine(e.target.value)}
              required
            >
              <option value="mysql">MySQL</option>
              <option value="sqlite">SQlite</option>
              <option value="postgresql">PostgreSql</option>
            </select>
          </div>
          <div className="flex items-center justify-end">
            <Button type="submit" className="mt-2 cursor-pointer">
              Connect
            </Button>
          </div>
          {loading && (
            <div className="flex items-center justify-center">
              <PulseLoader size={10} className="mt-8 " loading={true} />
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default DataSource;
