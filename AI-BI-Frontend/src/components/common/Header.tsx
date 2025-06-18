"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ThemeToggle from "./ThemeToggelButton";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { useRouter } from "next/navigation";
import { logout } from "@/store/features/authSlice";
import { ToastContainer, toast } from "react-toastify";
import { usePathname } from "next/navigation";
import Image from "next/image";
function Header() {
  const [userLogedIn, setUserLogedIn] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setUserLogedIn(true);
    }
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    toast.info("Logged out ...", { autoClose: 3000 });
    setTimeout(() => router.push("/"), 2000);
  };

  return (
    <header className="py-6 px-4 sm:px-6 lg:px-8 relative border-b">
      <ToastContainer />
      <ThemeToggle />
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <div className="h-8 w-auto flex items-center">
            <Image
              src="/logo.png"
              alt="AI-BI"
              width={150}
              height={150}
              className="object-contain"
            />
          </div>
        </Link>

        {userLogedIn ? (
          <ul className="flex items-center gap-6">
            <Link className="hover:opacity-55" href="/">
              Home
            </Link>
            {pathname !== "/user/dashboard" && (
              <Link className="hover:opacity-55" href="/user/dashboard">
                My Page
              </Link>
            )}
            <Button
              className="hover:opacity-55 cursor-pointer hover:scale-105"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </ul>
        ) : (
          <nav>
            <ul className="flex items-center gap-6">
              <li className="hover:opacity-55">
                <a href="#features" className="">
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:opacity-55">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:opacity-55">
                  Contact
                </a>
              </li>
              <li>
                <Button
                  variant="outline"
                  className="hover:scale-105 transition-all duration-300 bg-button animate-bounce"
                >
                  <Link href="/login">Get Started</Link>
                </Button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
