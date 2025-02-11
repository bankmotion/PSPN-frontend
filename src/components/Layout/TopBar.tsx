import { Box, Button } from "@mui/material";

import useStyles from "./index.styles";

const TopBar = () => {
  const { classes } = useStyles();

  return (
    <Box className={classes.topBar}>
      <Box className={classes.topBarRightPanel}>
        <Button className={classes.connectButton}>Connect Wallet</Button>
      </Box>
    </Box>
  );
};

export default TopBar;
