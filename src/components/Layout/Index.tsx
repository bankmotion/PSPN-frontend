import { Box } from "@mui/material";
import React, { ReactNode, useEffect } from "react";

import useStyles from "./index.styles";
import LeftSideBar from "./LeftSideBar";
import TopBar from "./TopBar";
import useWallet from "../../hook/useWallet";
import Web3 from "web3";
import { ChainConfig } from "../../config/config";
import { switchNetwork } from "../../helper/network";

interface LayoutProps {
  children: ReactNode;
}

const LayoutIndex: React.FC<LayoutProps> = ({ children }) => {
  const { classes } = useStyles();
  const { wallet, disconnectWallet, connectWallet } = useWallet();

  useEffect(() => {
    if (wallet) {
      const checkNetwork = () => {
        const web3 = new Web3(wallet.provider);
        (window as any).provider = web3;

        if (
          wallet.chains[0].id !== `0x${ChainConfig.chainIdHex.toString(16)}`
        ) {
          disconnectWallet();
          switchNetwork(wallet.provider)
            .then(() => connectWallet())
            .catch((err) => disconnectWallet());
        }
      };

      checkNetwork();
    }
  }, [wallet, disconnectWallet, connectWallet]);

  return (
    <Box className={classes.body}>
      <Box className={classes.container}>
        <Box className={classes.innerContainer}>
          <LeftSideBar />
          <Box className={classes.rightPanel}>
            <TopBar />
            <main className={classes.layout}>{children}</main>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LayoutIndex;
