import { useConnectWallet } from "@web3-onboard/react";
import { useCallback } from "react";
import Web3 from "web3";

const useWallet = () => {
  const [{ wallet }, connect, disconnect] = useConnectWallet();

  const connectWallet = useCallback(async () => {
    const wallets = await connect();
    if (wallets[0] != null) {
      const web3 = new Web3(wallets[0].provider);
      (window as any).provider = web3;
    }
  }, [connect]);

  const disconnectWallet = useCallback(async () => {
    if (wallet) {
      disconnect({ label: wallet.label });
    }
  }, [wallet, disconnect]);

  return {
    wallet,
    connectWallet,
    disconnectWallet,
    account: wallet ? wallet.accounts[0].address : "",
    isConnected: wallet ? true : false,
  };
};

export default useWallet;
