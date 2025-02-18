import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ContractConfig } from "../config/config";
import { getTokenBalance } from "../helper/contract";
import { UserYieldInfoType } from "../interfaces/UserYieldInfoType";
import {
  claimYield,
  getDailyYieldRate,
  getUserYieldInfo,
} from "../helper/contract/ufc";

interface UserState {
  user: string;
  loading: boolean;

  loadingMyTokenBalance: boolean;
  myTokenBalance: number;
  myUFCTokenBalance: number;

  yieldInfo: UserYieldInfoType;
  dailyYieldRate: number;

  loadingClaimYield: boolean;
}

const initialState: UserState = {
  user: "",
  loading: false,

  loadingMyTokenBalance: false,
  myTokenBalance: 0,
  myUFCTokenBalance: 0,

  yieldInfo: {
    yieldToClaim: 0,
    lastClaimTimestamp: 0,
    totalClaimed: 0,
  },
  dailyYieldRate: 0,

  loadingClaimYield: false,
};

export const getTokenBalanceByUser = createAsyncThunk(
  "user/getTokenBalanceByUser",
  async ({ account }: { account: string }) => {
    const token = await getTokenBalance(ContractConfig.TokenAddress, account);
    const ufc = await getTokenBalance(ContractConfig.UFCAddress, account);
    return { token, ufc };
  }
);

export const getYieldInfo = createAsyncThunk(
  "user/getDailyYieldInfo",
  async ({ account }: { account: string }) => {
    const info = await getUserYieldInfo(account);
    console.log({info})
    return info;
  }
);

export const getYieldRate = createAsyncThunk("user/getYieldRate", async () => {
  const rate = await getDailyYieldRate();
  return rate;
});

export const handleClaimYield = createAsyncThunk(
  "user/handleClaimYield",
  async ({ account }: { account: string }) => {
    await claimYield(account);
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

    builder.addCase(getYieldRate.pending, (state) => {});
    builder.addCase(getYieldRate.fulfilled, (state, { payload }) => {
      state.dailyYieldRate = payload;
    });
    builder.addCase(getYieldRate.rejected, (state) => {});

    builder.addCase(getYieldInfo.pending, (state) => {});
    builder.addCase(getYieldInfo.fulfilled, (state, { payload }) => {
      state.yieldInfo = payload as UserYieldInfoType;
    });
    builder.addCase(getYieldInfo.rejected, (state) => {});

    builder.addCase(handleClaimYield.pending, (state) => {
      state.loadingClaimYield = true;
    });
    builder.addCase(handleClaimYield.fulfilled, (state, { payload }) => {
      state.loadingClaimYield = false;
    });
    builder.addCase(handleClaimYield.rejected, (state) => {
      state.loadingClaimYield = false;
    });
  },
});

export const { setTokenBalance } = userSlice.actions;
export default userSlice.reducer;
