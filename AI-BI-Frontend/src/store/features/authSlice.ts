import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL

interface AuthTokens {
  access: string;
  refresh: string;
}

interface LoginCredentials {
  username: string;
  password: string;
}

interface AuthState {
  tokens: AuthTokens | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  tokens: null,
  loading: false,
  error: null,
};

// Create the async thunk for login
export const login = createAsyncThunk<
  AuthTokens,
  LoginCredentials,
  { rejectValue: string }
>("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    console.log(`${BaseUrl}/api/token/`);
    const response = await axios.post(
      `${BaseUrl}/api/token/`,
      credentials
    );
    return response.data; // Expecting { access: "...", refresh: "..." }
  } catch  {
    return rejectWithValue("Login failed");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.tokens = null;
      state.error = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.tokens = action.payload;
        
        localStorage.setItem("accessToken",state.tokens.access)
        localStorage.setItem("refreshToken",state.tokens.refresh)
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      });
  },
});


export const { logout } = authSlice.actions;
export default authSlice.reducer;
