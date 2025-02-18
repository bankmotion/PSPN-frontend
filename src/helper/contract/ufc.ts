import { ethers } from "ethers";
import { getProvider, getWeb3, waitForConfirmation } from ".";
import { ContractConfig } from "../../config/config";
import ufcAbi from "../../abis/UFC.json";

export const getUfcContract = (provider = false) => {
  const web3 = provider ? getProvider() : getWeb3();
  const ufcContract = new web3.eth.Contract(ufcAbi, ContractConfig.UFCAddress);
  return ufcContract;
};

export const getUserYieldInfo = async (account: string) => {
  const ufcContract = getUfcContract();

  const yieldInfo: any = await ufcContract.methods
    .userYieldInfo(account)
    .call();

  return {
    yieldToClaim: Number(ethers.formatEther(yieldInfo.yieldToClaim.toString())),
    totalClaimed: Number(ethers.formatEther(yieldInfo.totalClaimed.toString())),
    lastClaimTimestamp: Number(yieldInfo.lastClaimTimestamp),
  };
};

export const getDailyYieldRate = async () => {
  const ufcContract = getUfcContract();

  const rate: any = await ufcContract.methods.dailyYieldRate().call();

  return Number(rate);
};

export const claimYield = async (account: string) => {
  const ufcContract = getUfcContract(true);

  const data = await ufcContract.methods.claimYield().send({ from: account });

  await waitForConfirmation(data.transactionHash);
  return data;
};
