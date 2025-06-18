"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SideBar from "@/components/Setting/SideBar";
import Home from "@/components/Dashboard/Home";
import DataSource from "@/components/Setting/DataSource";



function SettingPage() {
  const router = useRouter();

  const [selection, setSelection] = useState<string>("general")
  


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
          <SideBar selection = {selection} setSelection={setSelection}/>
          {selection === "general" && <Home />}
          {selection === "dataSources" && <DataSource />}
          {selection === "integrations" && <Home />}
          {selection === "datasets" && <Home />}
        </div>
      </div>
    </div>
  );
}

export default SettingPage;
