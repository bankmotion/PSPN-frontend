import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getTokenBalance } from "../helper/contract";
import { ContractConfig } from "../config/config";

interface UserState {
  user: string;
  loading: boolean;

  loadingMyTokenBalance: boolean;
  myTokenBalance: number;
}

const initialState: UserState = {
  user: "",
  loading: false,

  loadingMyTokenBalance: false,
  myTokenBalance: 0,
};

export const getTokenBalanceByUser = createAsyncThunk(
  "user/getTokenBalanceByUser",
  async ({ account }: { account: string }) => {
    const data = await getTokenBalance(ContractConfig.TokenAddress, account);
    console.log(data);
    return data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setTokenBalance: (state, { payload }) => {
      state.myTokenBalance = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTokenBalanceByUser.pending, (state) => {
      state.loadingMyTokenBalance = true;
    });
    builder.addCase(getTokenBalanceByUser.fulfilled, (state, { payload }) => {
      state.loadingMyTokenBalance = false;
      state.myTokenBalance = payload;
    });
    builder.addCase(getTokenBalanceByUser.rejected, (state) => {
      state.loadingMyTokenBalance = false;
    });
  },
});

export const { setTokenBalance } = userSlice.actions;
export default userSlice.reducer;
