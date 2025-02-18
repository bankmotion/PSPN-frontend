import {
  Box,
  InputAdornment,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useId } from "react";

import useStyles from "./index.styles";
import { SwapTokens } from "../../config/config";

interface InputSelectCoinProps {
  handleChange: (e: SelectChangeEvent<number>) => void;
  selectedToken: number;
  handleChangeAmount: (e: React.ChangeEvent<HTMLInputElement>) => void;
  amount: string;
  inputEnabled: boolean;
}

const InputSelectCoin = ({
  handleChange,
  selectedToken,
  handleChangeAmount,
  amount,
  inputEnabled
}: InputSelectCoinProps) => {
  const { classes } = useStyles();
  const inputId = useId();

  return (
    <Box className={classes.inputField}>
      <TextField
        placeholder="0.0000"
        variant="standard"
        InputProps={{
          disableUnderline: true,
          endAdornment: <InputAdornment position="start"></InputAdornment>,
        }}
        sx={{
          flex: 1,
          "& .MuiInputBase-input": {
            padding: 0,
            color: "white",
            fontSize: 18,
          },
        }}
        onChange={handleChangeAmount}
        value={amount}
        key={inputId}
        disabled={!inputEnabled}
      />
      <Select
        value={selectedToken}
        onChange={handleChange}
        variant="standard"
        disableUnderline
        className={classes.select}
      >
        {SwapTokens.map((swapToken, index) => (
          <MenuItem value={index} className={classes.selectMenuItem}>
            <Box
              component={"img"}
              src={`/assets/tokens/${swapToken.logo}`}
              className={classes.logo}
            ></Box>
            {swapToken.name}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default InputSelectCoin;
