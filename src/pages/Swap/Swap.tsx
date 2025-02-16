import { Box } from "@mui/material";

import useStyles from "./index.styles";
import SwapPanel from "../../components/SwapPanel/Index";
import { ContractConfig } from "../../config/config";

const Swap = () => {
  const { classes } = useStyles();
  // const url =
  //   "https://pulsex.mypinata.cloud/ipfs/bafybeiesh56oijasgr7creubue6xt5anivxifrwd5a5argiz4orbed57qi/#/?inputCurrency=PLS&outputCurrency=0xa27aDe5806Ded801b93499C6fA23cc8dC9AC55EA";

  const url = `https://widget.piteas.io/#/swap?inputCurrency=PLS&outputCurrency=${ContractConfig.TokenAddress}`;
  return (
    <Box>
      <Box className={classes.body}>
        <Box className={classes.swapPanel}>
          <Box
            component={"iframe"}
            src={url}
            title="piteas"
            className={classes.swapIframe}
          />
          {/* <SwapPanel /> */}
        </Box>
      </Box>
    </Box>
  );
};

export default Swap;
