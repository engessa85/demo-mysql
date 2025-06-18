"use client";

import React from "react";
import { CircleUserRound, ChevronLeft, Building2, LogOut } from "lucide-react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { useRouter } from "next/navigation";
import { logout } from "@/store/features/authSlice";


interface PropsType {
  selection: string;
  setSelection: (arg: string) => void;
}

function SideBar(props: PropsType) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    toast.info("Logged out ...", { className: "custom-toast-success" , autoClose: 2000 });
    setTimeout(() => router.push("/"), 2000);
  };

  return (
    <>
    <ToastContainer />
      <div className="flex-1 px-4 py-5 flex flex-col justify-between">
        <div>
          <div className="flex items-center  mb-8">
            <Link href="/user/dashboard">
              <ChevronLeft size={15} />
            </Link>
            <div className="ml-2">
              <h1 className="text-sm">Settings</h1>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-start gap-2">
              <Building2 size={15} color="#364153" />
              <h1 className="text-xs text-gray-600">Workspace</h1>
            </div>
            <button
              onClick={() => props.setSelection("general")}
              className={`flex items-center gap-2 cursor-pointer hover:opacity-55  ${
                props.selection === "general" && "font-semibold"
              } `}
            >
              <p className="text-xs  ml-5 text-black">General</p>
            </button>
            <button
              onClick={() => props.setSelection("dataSources")}
              className={`flex items-center gap-2 cursor-pointer hover:opacity-55  ${
                props.selection === "dataSources" && "font-semibold"
              } `}
            >
              <p className="text-xs  ml-5 text-black">Data Sources</p>
            </button>
            <button
              onClick={() => props.setSelection("integrations")}
              className={`flex items-center gap-2 cursor-pointer hover:opacity-55  ${
                props.selection === "integrations" && "font-semibold"
              } `}
            >
              <p className="text-xs  ml-5 text-black">Integrations</p>
            </button>
            <button
              onClick={() => props.setSelection("datasets")}
              className={`flex items-center gap-2 cursor-pointer hover:opacity-55  ${
                props.selection === "datasets" && "font-semibold"
              } `}
            >
              <p className="text-xs  ml-5 text-black">Datasets</p>
            </button>
          </div>

          <div className="flex flex-col gap-2 mt-5">
            <div className="flex items-center justify-start gap-2">
              <CircleUserRound size={15} color="#364153" />
              <h1 className="text-xs text-gray-600">My Account</h1>
            </div>
            <button
              onClick={() => props.setSelection("general")}
              className={`flex items-center gap-2 cursor-pointer hover:opacity-55  ${
                props.selection === "general" && "font-semibold"
              } `}
            >
              <p className="text-xs  ml-5 text-black">Profile</p>
            </button>
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
