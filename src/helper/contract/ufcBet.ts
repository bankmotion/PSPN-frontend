import { ethers } from "ethers";
import { getProvider, getWeb3, waitForConfirmation } from ".";
import UFCBetABI from "../../abis/UFCBet.json";
import { ContractConfig } from "../../config/config";
import { UFCRound } from "../../interfaces/UFCBetType";
import { convertUFCRoundData } from "../../utils/ufcBet";

export const getUFCBetContract = (provider = false) => {
  const web3 = provider ? getProvider() : getWeb3();
  const ufcBetContract = new web3.eth.Contract(
    UFCBetABI,
    ContractConfig.UFCBetAddress
  );
  return ufcBetContract;
};

export const isAdmin = async (account: string) => {
  const ufcBetContract = getUFCBetContract();

  const isAdmin: any = await ufcBetContract.methods.isAdmin(account).call();
  return Boolean(isAdmin);
};

export const createUFCRound = async (
  player1Name: string,
  player2Name: string,
  closeAt: number,
  account: string
) => {
  const ufcBetContract = getUFCBetContract(true);

  const data = await ufcBetContract.methods
    .createRound(player1Name, player2Name, closeAt)
    .send({ from: account });
  await waitForConfirmation(data.transactionHash);
  return data;
};

export const enterUFCRound = async (
  roundId: number,
  amount: number,
  expectation: number,
  account: string
) => {
  const ufcBetContract = getUFCBetContract(true);

  const data = await ufcBetContract.methods
    .enterRound(roundId, ethers.parseEther(amount.toString()), expectation)
    .send({ from: account });

  await waitForConfirmation(data.transactionHash);
  return data;
};

export const finishUFCRound = async (
  roundId: number,
  result: number,
  account: string
) => {
  const ufcBetContract = getUFCBetContract(true);

  const data = await ufcBetContract.methods
    .finishRound(roundId, result)
    .send({ from: account });

  await waitForConfirmation(data.transactionHash);
  return data;
};

export const getUFCRounds = async () => {
  const ufcBetContract = getUFCBetContract();
  const data: any = await ufcBetContract.methods.getRounds().call();
  const rounds = data.map((item: any) => convertUFCRoundData(item));
  return rounds;
};

export const getUFCRound = async (roundId: number) => {
  const ufcBetContract = getUFCBetContract();
  const data: any = await ufcBetContract.methods.getRound(roundId).call();
  return convertUFCRoundData(data);
};
