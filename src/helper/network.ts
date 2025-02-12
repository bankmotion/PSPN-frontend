import Web3, { EIP1193Provider, Web3APISpec } from "web3";
import { ChainConfig } from "../config/config";

export const switchNetwork = async (provider: EIP1193Provider<Web3APISpec>) => {
  // const currentChainId = await getNetworkId();
  const chainId = ChainConfig.chainId;
  try {
    await provider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: Web3.utils.toHex(chainId) }],
    });

    return true;
  } catch (switchError: any) {
    // This error code indicates that the chain has not been added to MetaMask.
    if (switchError.code === 4902 || switchError.code === -32603) {
      try {
        await addNetwork(provider);
        return true;
      } catch (error) {
        alert(error);
        return false;
      }
    }
    return false;
  }
};

export const addNetwork = async (provider: EIP1193Provider<Web3APISpec>) => {
  await provider.request({
    method: "wallet_addEthereumChain",
    params: [
      {
        chainId: Web3.utils.toHex(ChainConfig.chainId),
        chainName: ChainConfig.chainName,
        nativeCurrency: {
          name: "PulseChain",
          symbol: ChainConfig.chainSymbol,
          decimals: 18,
        },
        rpcUrls: [ChainConfig.providerList[0]],
        blockExplorerUrls: [ChainConfig.explorerUrl],
      },
    ],
  });
};
