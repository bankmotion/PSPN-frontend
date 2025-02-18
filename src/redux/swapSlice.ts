import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ContractConfig } from "../config/config";
import {
  estimateSwap,
  getTokenRatio,
  internalSwap,
} from "../helper/contract/internalSwap";
import { approveToken } from "../helper/contract";

interface SwapState {
  fromRatio: number;
  toRatio: number;
  loadingTokenPrice: boolean;

  estimateSwapAmount: number;
  loadingEstimateSwapAmount: boolean;

  loadingInternalSwap: boolean;
}

const initialState: SwapState = {
  fromRatio: 0,
  toRatio: 0,
  loadingTokenPrice: false,

  estimateSwapAmount: 0,
  loadingEstimateSwapAmount: false,

  loadingInternalSwap: false,
};

export const getAllTokensPrice = createAsyncThunk(
  "swap/getAllTokensPrice",
  async ({ from, to }: { from?: string; to?: string }) => {
    const fromRatio = from ? await getTokenRatio(from) : -1;
    const toRatio = to ? await getTokenRatio(to) : -1;
    // console.log({fromRatio, toRatio})

    return { fromRatio, toRatio };
  }
);

export const getEstimatedSwapAmount = createAsyncThunk(
  "swap/getEstimatedSwapAmount",
  async ({
    from,
    to,
    amount,
  }: {
    from: string;
    to: string;
    amount: number;
  }) => {
    const estimatedAmount = await estimateSwap(from, to, amount);
    return estimatedAmount;
  }
);

export const handleInternalSwap = createAsyncThunk(
  "swap/handleInternalSwap",
  async ({
    from,
    to,
    amount,
    account,
  }: {
    from: string;
    to: string;
    amount: number;
    account: string;
  }) => {
    console.log({ from, to, amount, account });
    await approveToken(
      from,
      amount,
      ContractConfig.InternalSwapAddress,
      account
    );
    const swapData = await internalSwap(from, to, amount, account);
    return swapData;
  }
);

export const swapSlice = createSlice({
  name: "swap",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllTokensPrice.pending, (state) => {
      state.loadingTokenPrice = true;
    });
    builder.addCase(getAllTokensPrice.fulfilled, (state, { payload }) => {
      state.loadingTokenPrice = false;
      if (payload.fromRatio !== -1) {
        state.fromRatio = payload.fromRatio;
      }
      if (payload.toRatio !== -1) {
        state.toRatio = payload.toRatio;
      }
    });
    builder.addCase(getAllTokensPrice.rejected, (state) => {
      state.loadingTokenPrice = false;
    });

    builder.addCase(getEstimatedSwapAmount.pending, (state) => {
      state.loadingEstimateSwapAmount = true;
    });
    builder.addCase(getEstimatedSwapAmount.fulfilled, (state, { payload }) => {
      state.loadingEstimateSwapAmount = false;
      state.estimateSwapAmount = payload;
    });
    builder.addCase(getEstimatedSwapAmount.rejected, (state) => {
      state.loadingEstimateSwapAmount = false;
    });

    builder.addCase(handleInternalSwap.pending, (state) => {
      state.loadingInternalSwap = true;
    });
    builder.addCase(handleInternalSwap.fulfilled, (state) => {
      state.loadingInternalSwap = false;
    });
    builder.addCase(handleInternalSwap.rejected, (state) => {
      state.loadingInternalSwap = false;
    });
  },
});

export const {} = swapSlice.actions;
export default swapSlice.reducer;
