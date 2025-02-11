import { Box } from "@mui/material";

import useStyles from "./index.styles";
import SwapPanel from "../../components/SwapPanel/Index";

const Swap = () => {
  const { classes } = useStyles();

  return (
    <Box>
      <Box className={classes.body}>
        <Box className={classes.swapPanel}>
          <SwapPanel />
        </Box>
      </Box>
    </Box>
  );
};

export default Swap;
