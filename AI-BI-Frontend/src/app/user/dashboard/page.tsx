"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SideBar from "@/components/Dashboard/SideBar";
import Home from "@/components/Dashboard/Home";
import Metrics from "@/components/Dashboard/Metrics";


function DashboardPage() {
  const router = useRouter();

  const [selection, setSelection] = useState<string>("home")
  const [selectingDb, setSelectingDb] = useState<number>()




  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      {
        router.push("/");
      }
    }
  }, [router]);

  return (
    <div className="">
      <div className="bg-primary-foreground">
        <div className="flex">
          <SideBar selection = {selection} setSelection={setSelection}  setSelectingDb= {setSelectingDb}/>
          {selection === "home" && <Home />}
          {selection === "metrics" && <Metrics selectingDb={selectingDb} />}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
