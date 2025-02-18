import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ContractConfig } from "../config/config";
import { getTokenBalance } from "../helper/contract";

interface UserState {
  user: string;
  loading: boolean;

  loadingMyTokenBalance: boolean;
  myTokenBalance: number;
  myUFCTokenBalance: number;
}

const initialState: UserState = {
  user: "",
  loading: false,

  loadingMyTokenBalance: false,
  myTokenBalance: 0,
  myUFCTokenBalance: 0,
};

export const getTokenBalanceByUser = createAsyncThunk(
  "user/getTokenBalanceByUser",
  async ({ account }: { account: string }) => {
    const token = await getTokenBalance(ContractConfig.TokenAddress, account);
    const ufc = await getTokenBalance(ContractConfig.UFCAddress, account);
    return { token, ufc };
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setTokenBalance: (state, { payload }) => {
      state.myTokenBalance = payload;
      state.myUFCTokenBalance = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTokenBalanceByUser.pending, (state) => {
      state.loadingMyTokenBalance = true;
    });
    builder.addCase(getTokenBalanceByUser.fulfilled, (state, { payload }) => {
      state.loadingMyTokenBalance = false;
      state.myTokenBalance = payload.token;
      state.myUFCTokenBalance = payload.ufc;
    });
    builder.addCase(getTokenBalanceByUser.rejected, (state) => {
      state.loadingMyTokenBalance = false;
    });
  },
});

export const { setTokenBalance } = userSlice.actions;
export default userSlice.reducer;
