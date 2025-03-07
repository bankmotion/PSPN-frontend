import { UFCRoundStatus } from "../enums/UFCBet";

export interface UFCRound {
  roundID: number;
  player1Name: string;
  player2Name: string;
  feeAmount: number;
  player1TotalAmount: number;
  player2TotalAmount: number;
  player1Bets: UFCBet[];
  player2Bets: UFCBet[];
  closeAt: number;
  player1LastIndex: number;
  player2LastIndex: number;
  result: number;
  status: UFCRoundStatus;
}

export interface UFCBet {
  player: string;
  entryId: number;
  amount: number;
  timestamp: number;
}
