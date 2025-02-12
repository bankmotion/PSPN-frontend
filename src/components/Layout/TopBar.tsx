import { Box, Button } from "@mui/material";

import useStyles from "./index.styles";
import useWallet from "../../hook/useWallet";
import { getShortAddress } from "../../utils";

const TopBar = () => {
  const { classes } = useStyles();

  const { connectWallet, disconnectWallet, account, isConnected } = useWallet();

  console.log({ account });

  return (
    <Box className={classes.topBar}>
      <Box className={classes.topBarRightPanel}>
        <Button
          className={classes.connectButton}
          // onClick={
          //   isConnected ? () => disconnectWallet() : () => connectWallet()
          // }
        >
          {isConnected ? getShortAddress(account) : "Connect Wallet"}
        </Button>
      </Box>
    </Box>
  );
};

export default TopBar;
