import { ethers } from "ethers";
import { UFCRoundStatus } from "../enums/UFCBet";
import { UFCBet, UFCRound } from "../interfaces/UFCBetType";

export const convertUFCRoundData = (item: any) =>
  ({
    roundID: Number(item.roundID),
    player1Name: item.player1Name,
    player2Name: item.player2Name,
    feeAmount: Number(ethers.formatEther(item.feeAmount)),
    player1TotalAmount: Number(ethers.formatEther(item.player1TotalAmount)),
    player2TotalAmount: Number(ethers.formatEther(item.player2TotalAmount)),
    player1Bets: item.player1Bets
      ? item.player1Bets.map((bet: any) => convertUFCBetData(bet))
      : [],
    player2Bets: item.player2Bets
      ? item.player2Bets.map((bet: any) => convertUFCBetData(bet))
      : [],
    closeAt: Number(item.closeAt),
    player1LastIndex: Number(item.player1LastIndex),
    player2LastIndex: Number(item.player2LastIndex),
    result: Number(item.result),
    status: Number(item.status) as UFCRoundStatus,
  } as UFCRound);

export const convertUFCBetData = (bet: any) =>
  ({
    player: bet.player,
    entryId: Number(bet.entryId),
    amount: Number(ethers.formatEther(bet.amount)),
    timestamp: Number(bet.timestamp),
  } as UFCBet);

export const getOdds = (mainPlayer: number, otherPlayer: number) => {
  return !mainPlayer
    ? "0.00"
    : ((mainPlayer + otherPlayer) / mainPlayer).toFixed(2);
};
