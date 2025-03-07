import { Box, Button } from "@mui/material";
import React, { ReactNode, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import useStyles from "./index.styles";
import TopBar from "./TopBar";
import useWallet from "../../hook/useWallet";
import Web3 from "web3";
import { ChainConfig } from "../../config/config";
import { switchNetwork } from "../../helper/network";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { getTokenBalanceByUser, setTokenBalance } from "../../redux/userSlice";
import MobileSideBar from "./SideBar";
import LoadingBar from "./LoadingBar";

interface LayoutProps {
  children: ReactNode;
}

const LayoutIndex: React.FC<LayoutProps> = ({ children }) => {
  const { classes } = useStyles();
  const { wallet, disconnectWallet, connectWallet, account } = useWallet();
  const dispatch: AppDispatch = useDispatch();

  const [showMobileSideBar, setShowMobileSideBar] = useState(false);

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
      <LoadingBar></LoadingBar>
      <TopBar showMobileSideBar={() => setShowMobileSideBar(true)} />
      <ToastContainer />
      <main className={classes.layout}>{children}</main>

      <MobileSideBar
        showMobileSideBar={showMobileSideBar}
        toggleMobileSideBar={setShowMobileSideBar}
        onConnectWallet={connectWallet}
      />
      <ToastContainer />
    </Box>
  );
};

export default LayoutIndex;
