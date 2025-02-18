import { Box, Button } from "@mui/material";
import React, { ReactNode, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";

import useStyles from "./index.styles";
import LeftSideBar from "./LeftSideBar";
import TopBar from "./TopBar";
import useWallet from "../../hook/useWallet";
import Web3 from "web3";
import { ChainConfig } from "../../config/config";
import { switchNetwork } from "../../helper/network";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { getTokenBalanceByUser, setTokenBalance } from "../../redux/userSlice";

interface LayoutProps {
  children: ReactNode;
}

const LayoutIndex: React.FC<LayoutProps> = ({ children }) => {
  const { classes } = useStyles();
  const { wallet, disconnectWallet, connectWallet, account } = useWallet();
  const dispatch: AppDispatch = useDispatch();

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

  useEffect(() => {
    if (account) {
      dispatch(getTokenBalanceByUser({ account }));
    } else {
      dispatch(setTokenBalance(0));
    }
  }, [account, dispatch]);

  return (
    <Box className={classes.body}>
      <Box className={classes.container}>
        <Box className={classes.innerContainer}>
          <Button className={classes.menuIcon}>
            <MenuIcon />
          </Button>
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
