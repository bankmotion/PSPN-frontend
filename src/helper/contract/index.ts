import { ethers } from "ethers";
import Web3 from "web3";
import { ChainConfig } from "../../config/config";

import ERC20Abi from "../../abis/ERC20.json";

export const getWeb3 = () =>
  new Web3(
    ChainConfig.providerList[
      Math.floor(Math.random() * ChainConfig.providerList.length)
    ]
  );

export const getProvider = () => new Web3((window as any).provider);

export const getTokenBalance = async (tokenAddr: string, userAddr: string) => {
  const web3 = getWeb3();
  const tokenContract = new web3.eth.Contract(ERC20Abi, tokenAddr);
  let balance: any, decimal: string;

  if (tokenAddr === ethers.ZeroAddress) {
    balance = await web3.eth.getBalance(userAddr);
    return Number(ethers.formatEther(balance));
  } else {
    balance = await tokenContract.methods.balanceOf(userAddr).call();
    decimal = await tokenContract.methods.decimals().call();
    return Number(ethers.formatUnits(balance, decimal));
  }
};

export const approveToken = async (
  tokenAddress: string,
  amount: number,
  to: string,
  account: string
) => {
  const web3 = getProvider();
  const tokenContract = new web3.eth.Contract(ERC20Abi, tokenAddress);
  const allowanceBN = (await tokenContract.methods
    .allowance(account, to)
    .call()) as string;
  const decimals = Number(await tokenContract.methods.decimals().call());
  const allowance = Number(ethers.formatUnits(allowanceBN, decimals));

  if (allowance < amount) {
    const data = await tokenContract.methods
      .approve(
        to,
        ethers.parseUnits(amount.toFixed(decimals), decimals).toString()
      )
      .send({ from: account });

    await waitForConfirmation(data.transactionHash);
  }
};

export const waitForConfirmation = async (txHash: string) => {
  let receipt = null;
  const web3 = getProvider();

  while (receipt === null) {
    try {
      receipt = await web3.eth.getTransactionReceipt(txHash);
      if (receipt === null) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    } catch (err) {
      console.error(`Error fetching transaction receipt: ${err}`);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
};
