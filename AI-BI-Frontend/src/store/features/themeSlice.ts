import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  darkMode: false, // Default to false (Next.js will rehydrate it correctly)
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", state.darkMode ? "dark" : "light");
      }
      document.documentElement.classList.toggle("dark", state.darkMode);
    },
    setTheme: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", action.payload ? "dark" : "light");
      }
      document.documentElement.classList.toggle("dark", action.payload);
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
