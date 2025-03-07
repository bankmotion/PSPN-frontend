import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ContractConfig } from "../config/config";
import { approveToken } from "../helper/contract";
import { estimateSwap, internalSwap } from "../helper/contract/internalSwap";

interface SwapState {
  loadingInternalSwap: string;

  loadingEstimateSwapAmount: boolean;
  fromTokenIndex: number;
  toTokenIndex: number;
  fromAmount: string;
  toAmount: string;
}

const initialState: SwapState = {
  loadingInternalSwap: "",

  loadingEstimateSwapAmount: false,
  fromTokenIndex: 0,
  toTokenIndex: 1,
  fromAmount: "",
  toAmount: "",
};

export const getEstimatedSwapAmount = createAsyncThunk(
  "swap/getEstimatedSwapAmount",
  async ({
    from,
    to,
    amount,
    direction,
  }: {
    from: string;
    to: string;
    amount: number;
    direction: boolean;
  }) => {
    const estimatedAmount = direction
      ? await estimateSwap(from, to, amount)
      : await estimateSwap(to, from, amount);
    return { estimatedAmount, direction };
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
  reducers: {
    setFromTokenIndex: (state, action) => {
      state.fromTokenIndex = action.payload;
    },
    setToTokenIndex: (state, action) => {
      state.toTokenIndex = action.payload;
    },
    setFromAmount: (state, action) => {
      state.fromAmount = action.payload;
    },
    setToAmount: (state, action) => {
      state.toAmount = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getEstimatedSwapAmount.pending, (state, { payload }) => {
      state.loadingEstimateSwapAmount = true;
    });
    builder.addCase(getEstimatedSwapAmount.fulfilled, (state, { payload }) => {
      state.loadingEstimateSwapAmount = false;
      if (payload.direction) {
        state.toAmount = payload.estimatedAmount.toString();
      } else {
        state.fromAmount = payload.estimatedAmount.toString();
      }
    });
    builder.addCase(getEstimatedSwapAmount.rejected, (state) => {
      state.loadingEstimateSwapAmount = false;
    });

    builder.addCase(handleInternalSwap.pending, (state) => {
      state.loadingInternalSwap = "Swapping";
    });
    builder.addCase(handleInternalSwap.fulfilled, (state) => {
      state.loadingInternalSwap = "";
    });
    builder.addCase(handleInternalSwap.rejected, (state) => {
      state.loadingInternalSwap = "";
    });
  },
});

export const {
  setFromAmount,
  setFromTokenIndex,
  setToAmount,
  setToTokenIndex,
} = swapSlice.actions;
export default swapSlice.reducer;
