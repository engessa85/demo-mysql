"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { login } from "@/store/features/authSlice";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import Link from "next/link";

import { PulseLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";


import Header from "@/components/common/Header";

function LoginPage() {
  const [username, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");


  const router = useRouter()

  const dispath = useDispatch<AppDispatch>();

  const { tokens, loading, error } = useSelector(
    (state: RootState) => state.auth
  );




  


  useEffect(()=>{
    if(tokens){
      router.push('/user/dashboard')
    }
  }, [tokens, loading, router])


  useEffect(()=>{
    if (error!==null) {
      toast.error(error, {className:"custom-toast-error", autoClose:2000});
    }
  }, [error])

  const HandleLogIn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispath(login({ username: username, password: password }));
  };



  return (
    <div className="min-h-screen bg-background text-foreground">
      <ToastContainer />
      <Header/>
      <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut", delay: 0.4 }}
            className="mt-8"
          >
            <div className="max-w-xl mx-auto">
              <Card className="bg-white/5 backdrop-blur-md border border-white/10 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-white text-2xl text-center">
                    <motion.p
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                      className="text-4xl font-extrabold tracking-tight bg-clip-text text-gray-900 dark:text-white"
                    >
                      Access Your Database Assistant
                    </motion.p>
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-center">
                    Interact with your database using natural language..
                  </CardDescription>
                </CardHeader>

                <form onSubmit={HandleLogIn}>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="username" className="text-white">
                          Username
                        </Label>
                        <Input
                          id="username"
                          type="text"
                          placeholder="Enter username"
                          className="bg-slate-100 border-none outline-none"
                          value={username}
                          onChange={(e) => setUserName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password" className="text-white">
                          Password
                        </Label>
                        <Input
                          id="password"
                          type="password"
                          placeholder="Enter password"
                          className="bg-slate-100 border-none outline-none"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-2 mt-5">
                    <Button className="w-[40%] mx-auto cursor-pointer">
                      Login
                    </Button>
                    <p className="text-slate-600 text-xs">
                      Dont have an accout?{" "}
                      <span className="text-white font-semibold">
                        <Link className="text-gray-900 dark:text-white" href="">Register</Link>
                      </span>
                    </p>
                    {loading && (
                      <PulseLoader
                        size={10}
                        className="mt-8 "
                        loading={true}
                      />
                    )}
                  </CardFooter>
                </form>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default LoginPage;
