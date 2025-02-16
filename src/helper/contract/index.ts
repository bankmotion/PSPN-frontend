import Web3 from "web3";
import { ethers } from "ethers";
import { AppConfig, ChainConfig } from "../../config/config";

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
