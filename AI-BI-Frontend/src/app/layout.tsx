"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/store/provider";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { setTheme } from "@/store/features/themeSlice";
import { useEffect } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          <ThemeInitializer />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}

// Ensure theme is applied on page load
function ThemeInitializer() {
  const dispatch = useDispatch<AppDispatch>();
  const darkMode = useSelector((state:RootState) => state.theme.darkMode);


  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") === "dark";
    dispatch(setTheme(storedTheme));
  }, [dispatch, darkMode]);

  return null;
}
