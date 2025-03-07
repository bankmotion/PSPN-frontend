import { ethers } from "ethers";
import { getProvider, getWeb3, waitForConfirmation } from ".";
import InternalSwapABI from "../../abis/InternalSwap.json";
import { ContractConfig } from "../../config/config";

export const getInternalSwapContract = (provider = false) => {
  const web3 = provider ? getProvider() : getWeb3();
  const internalSwapContract = new web3.eth.Contract(
    InternalSwapABI,
    ContractConfig.InternalSwapAddress
  );
  return internalSwapContract;
};

export const estimateSwap = async (
  from: string,
  to: string,
  amount: number
) => {
  const internalSwapContract = getInternalSwapContract();

  const estimateAmount: any = await internalSwapContract.methods
    .estimateSwap(from, to, ethers.parseEther(amount.toString()))
    .call();
  return Number(ethers.formatEther(estimateAmount));
};

export const internalSwap = async (
  from: string,
  to: string,
  amount: number,
  account: string
) => {
  const internalSwapContract = getInternalSwapContract(true);

  const data = await internalSwapContract.methods
    .swap(from, to, ethers.parseEther(amount.toString()))
    .send({ from: account });

  await waitForConfirmation(data.transactionHash);
  return data;
};
