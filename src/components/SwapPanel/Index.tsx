import {
  Box,
  Button,
  Divider,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

import useStyles from "./index.styles";
import InputSelectCoin from "../InputSelectCoin/Index";

export const SwapPanel = () => {
  const { classes } = useStyles();

  const handleChange = () => {};

  return (
    <Box className={classes.body}>
      <Box className={classes.titlePart}>
        <Typography variant="h5">Exchange</Typography>
        <CurrencyExchangeIcon />
      </Box>

      <Divider color="#292a34" sx={{ mt: 2 }}></Divider>

      <Box className={classes.exchangeInfo}>
        <Box>
          1 <Box component={"span"}>BTC</Box>
        </Box>
        <Box>
          <ArrowRightAltIcon />
        </Box>
        <Box>
          45,234 <Box component={"span"}>USDT</Box>
        </Box>
      </Box>

      <Box className={classes.inputBox} sx={{ mt: 4 }}>
        <Box className={classes.inputTitle}>Pay</Box>
        <InputSelectCoin handleChange={handleChange} />
      </Box>

      <Box className={classes.inputBox} sx={{ mt: 2 }}>
        <Box className={classes.inputTitle}>Get</Box>
        <InputSelectCoin handleChange={handleChange} />
      </Box>

      <Divider color="#292a34" sx={{ mt: 4 }}></Divider>

      <Button className={classes.exchangeBtn}>Exchange</Button>
    </Box>
  );
};

export default SwapPanel;
