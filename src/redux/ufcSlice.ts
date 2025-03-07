import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUFCRound,
  enterUFCRound,
  finishUFCRound,
  getUFCRound,
  getUFCRounds,
  isAdmin,
} from "../helper/contract/ufcBet";
import { UFCRound } from "../interfaces/UFCBetType";
import { approveToken } from "../helper/contract";
import { ContractConfig } from "../config/config";

interface UFCState {
  isAdmin: boolean;
  ufcRounds: UFCRound[];
  currentRound: UFCRound | null;

  loadingAdmin: string;
  loadingGetRounds: string;
  loadingCreate: string;
  loadingApprove: string;
}

const initialState: UFCState = {
  isAdmin: false,
  ufcRounds: [],
  currentRound: null,

  loadingAdmin: "",
  loadingGetRounds: "",
  loadingCreate: "",
  loadingApprove: "",
};

export const getIsAdmin = createAsyncThunk(
  "ufc/getIsAdmin",
  async ({ account }: { account: string }) => {
    const admin = await isAdmin(account);
    return admin;
  }
);

export const createRound = createAsyncThunk(
  "ufc/createRound",
  async ({
    player1,
    player2,
    closeAt,
    account,
  }: {
    player1: string;
    player2: string;
    closeAt: number;
    account: string;
  }) => {
    await createUFCRound(player1, player2, closeAt, account);
  }
);

export const approveAction = createAsyncThunk(
  "ufc/approveAction",
  async ({ amount, account }: { amount: number; account: string }) => {
    await approveToken(
      ContractConfig.UFCAddress,
      amount,
      ContractConfig.UFCBetAddress,
      account
    );
  }
);

export const enterRound = createAsyncThunk(
  "ufc/enterRound",
  async ({
    roundId,
    amount,
    expectation,
    account,
  }: {
    roundId: number;
    amount: number;
    expectation: number;
    account: string;
  }) => {
    await enterUFCRound(roundId, amount, expectation, account);
  }
);

export const finishRound = createAsyncThunk(
  "ufc/finishRound",
  async ({
    roundId,
    result,
    account,
  }: {
    roundId: number;
    result: number;
    account: string;
  }) => {
    await finishUFCRound(roundId, result, account);
  }
);

export const getRounds = createAsyncThunk("ufc/getRounds", async () => {
  const rounds = await getUFCRounds();
  return rounds;
});

export const getCurrentRound = createAsyncThunk(
  "ufc/getCurrentRound",
  async ({ roundId }: { roundId: number }) => {
    const round = await getUFCRound(roundId);
    return round;
  }
);

export const ufcSlice = createSlice({
  name: "ufc",
  initialState,
  reducers: {
    setIsAdmin: (state) => {
      state.isAdmin = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getIsAdmin.pending, (state) => {
      state.loadingAdmin = "Loading...";
    });
    builder.addCase(getIsAdmin.fulfilled, (state, { payload }) => {
      state.loadingAdmin = "";
      state.isAdmin = payload;
    });
    builder.addCase(getIsAdmin.rejected, (state) => {
      state.loadingAdmin = "";
    });

    builder.addCase(createRound.pending, (state) => {
      state.loadingCreate = "Creating round...";
    });
    builder.addCase(createRound.fulfilled, (state, { payload }) => {
      state.loadingCreate = "";
    });
    builder.addCase(createRound.rejected, (state) => {
      state.loadingCreate = "";
    });

    builder.addCase(getRounds.pending, (state) => {
      state.loadingGetRounds = "Loading...";
    });
    builder.addCase(getRounds.fulfilled, (state, { payload }) => {
      state.loadingGetRounds = "";
      state.ufcRounds = payload;
    });
    builder.addCase(getRounds.rejected, (state) => {
      state.loadingGetRounds = "";
    });

    builder.addCase(getCurrentRound.pending, (state) => {
      state.loadingGetRounds = "Loading...";
    });
    builder.addCase(getCurrentRound.fulfilled, (state, { payload }) => {
      state.loadingGetRounds = "";
      state.currentRound = payload;
    });
    builder.addCase(getCurrentRound.rejected, (state) => {
      state.loadingGetRounds = "";
    });

    builder.addCase(enterRound.pending, (state) => {
      state.loadingCreate = "Depositing...";
    });
    builder.addCase(enterRound.fulfilled, (state, { payload }) => {
      state.loadingCreate = "";
    });
    builder.addCase(enterRound.rejected, (state) => {
      state.loadingCreate = "";
    });

    builder.addCase(finishRound.pending, (state) => {
      state.loadingCreate = "Finishing...";
    });
    builder.addCase(finishRound.fulfilled, (state, { payload }) => {
      state.loadingCreate = "";
    });
    builder.addCase(finishRound.rejected, (state) => {
      state.loadingCreate = "";
    });

    builder.addCase(approveAction.pending, (state) => {
      state.loadingApprove = "Approving...";
    });
    builder.addCase(approveAction.fulfilled, (state, { payload }) => {
      state.loadingApprove = "";
    });
    builder.addCase(approveAction.rejected, (state) => {
      state.loadingApprove = "";
    });
  },
});

export const { setIsAdmin } = ufcSlice.actions;

export default ufcSlice.reducer;
