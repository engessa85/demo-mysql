"use client";


import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { toggleTheme } from "@/store/features/themeSlice";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const dispatch = useDispatch<AppDispatch>();
  const darkMode = useSelector((state:RootState) => state.theme.darkMode);

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="p-2 bg-slate-200 rounded-full w-9 h-9 flex items-center justify-center shadow-lg transition-colors cursor-pointer fixed right-3 top-6 text-black "
    >
      {darkMode ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
