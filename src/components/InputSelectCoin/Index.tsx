import {
  Box,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import useStyles from "./index.styles";

interface InputSelectCoinProps {
  handleChange: () => void;
}

const InputSelectCoin = ({ handleChange }: InputSelectCoinProps) => {
  const { classes } = useStyles();

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
      />
      <Select
        value={0}
        onChange={handleChange}
        variant="standard"
        disableUnderline
        className={classes.select}
      >
        <MenuItem value="0" className={classes.selectMenuItem}>
          <Box
            component={"img"}
            src="/assets/tokens/pls.png"
            className={classes.logo}
          ></Box>
          PLS
        </MenuItem>
      </Select>
    </Box>
  );
};

export default InputSelectCoin;
