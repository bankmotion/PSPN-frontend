import { Box, Button } from "@mui/material";
import isMobile from "is-mobile";

import useStyles from "./index.styles";
import useWallet from "../../hook/useWallet";
import { getShortAddress } from "../../utils";

import Blockies from "../Blockies/Blockies";

const TopBar = () => {
  const { classes } = useStyles();

  const { connectWallet, disconnectWallet, account, isConnected } = useWallet();

  console.log({ account });

  return (
    <Box className={classes.topBar}>
      <Box className={classes.topBarRightPanel}>
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
