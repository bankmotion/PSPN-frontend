import { Box, Button } from "@mui/material";
import isMobile from "is-mobile";

import useStyles from "./index.styles";
import useWallet from "../../hook/useWallet";
import { formatNumber, getShortAddress } from "../../utils";

import Blockies from "../Blockies/Blockies";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import clsx from "clsx";

const TopBar = () => {
  const { classes } = useStyles();

  const { connectWallet, disconnectWallet, account, isConnected } = useWallet();
  const { myTokenBalance, myUFCTokenBalance } = useSelector(
    (state: RootState) => state.user
  );

  return (
    <Box className={classes.topBar}>
      <Box className={classes.topBarRightPanel}>
        {isConnected && (
          <>
            <Button className={clsx(classes.connectButton, classes.balanceBut)}>
              {formatNumber(myTokenBalance)} PSPN
            </Button>
            <Button className={clsx(classes.connectButton, classes.balanceBut)}>
              {formatNumber(myUFCTokenBalance)} UFC
            </Button>
          </>
        )}
        <Button
          className={classes.connectButton}
          onClick={
            isConnected ? () => disconnectWallet() : () => connectWallet()
          }
        >
          {isConnected ? getShortAddress(account) : "Connect Wallet"}
          {isConnected && (
            <Blockies address={account} width={isMobile() ? 32 : 42} />
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default TopBar;
