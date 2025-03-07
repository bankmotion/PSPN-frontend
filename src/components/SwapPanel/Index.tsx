import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  SelectChangeEvent,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { SwapTokens } from "../../config/config";
import useWallet from "../../hook/useWallet";
import { AppDispatch, RootState } from "../../redux/store";
import {
  getEstimatedSwapAmount,
  handleInternalSwap,
  setFromAmount,
  setFromTokenIndex,
  setToAmount,
  setToTokenIndex,
} from "../../redux/swapSlice";
import { getTokenBalanceByUser } from "../../redux/userSlice";
import { formatNumberWithCommas } from "../../utils";
import InputSelectCoin from "../InputSelectCoin/Index";
import useStyles from "./index.styles";

export const SwapPanel = () => {
  const { classes } = useStyles();
  const { account, connectWallet } = useWallet();
  const dispatch: AppDispatch = useDispatch();
  const { fromTokenIndex, toTokenIndex, fromAmount, toAmount } = useSelector(
    (state: RootState) => state.swap
  );

  const handleChangeAmount = (
    e: React.ChangeEvent<HTMLInputElement>,
    fromStatus: boolean
  ) => {
    const value = e.target.value;
    fromStatus ? dispatch(setFromAmount(value)) : dispatch(setToAmount(value));

    if (!isNaN(Number(value))) {
      dispatch(
        getEstimatedSwapAmount({
          from: SwapTokens[fromTokenIndex].address,
          to: SwapTokens[toTokenIndex].address,
          amount: Number(value),
          direction: fromStatus,
        })
      );
    }
  };

  const handleChangeToken = (
    e: SelectChangeEvent<number>,
    isFromToken: boolean
  ) => {
    isFromToken
      ? dispatch(setFromTokenIndex(Number(e.target.value)))
      : dispatch(setToTokenIndex(Number(e.target.value)));
    dispatch(setToAmount(""));
    dispatch(setFromAmount(""));
  };

  const handleClickExcIcon = () => {
    const tempIndex = fromTokenIndex;
    const tempAmount = fromAmount;
    dispatch(setFromTokenIndex(toTokenIndex));
    dispatch(setToTokenIndex(tempIndex));
    dispatch(setFromAmount(toAmount));
    dispatch(setToAmount(tempAmount));
  };

  const handleClickExchange = () => {
    if (fromTokenIndex === -1 || toTokenIndex === -1) {
      toast.error("Please select token to swap");
      return;
    }
    if (
      fromAmount === "" ||
      Number(fromAmount) === 0 ||
      toAmount === "" ||
      Number(toAmount) === 0
    ) {
      toast.error("Please input amount to swap");
      return;
    }

    if (!account) {
      connectWallet();
      return;
    }
    dispatch(
      handleInternalSwap({
        from: SwapTokens[fromTokenIndex].address,
        to: SwapTokens[toTokenIndex].address,
        amount: Number(fromAmount),
        account,
      })
    )
      .unwrap()
      .then(() => {
        dispatch(getTokenBalanceByUser({ account }));
        dispatch(setFromAmount(""));
        dispatch(setToAmount(""));
        toast.success("Swapped successfully!");
      });
  };

  const inputEnabled = fromTokenIndex !== -1 && toTokenIndex !== -1;

  useEffect(() => {
    if (fromTokenIndex === -1) return;
    if (fromTokenIndex === toTokenIndex) {
      dispatch(setToTokenIndex(1 - fromTokenIndex));
    }
  }, [fromTokenIndex]);

  useEffect(() => {
    if (toTokenIndex === -1) return;
    if (fromTokenIndex === toTokenIndex) {
      dispatch(setFromTokenIndex(1 - fromTokenIndex));
    }
  }, [toTokenIndex]);

  return (
    <Box className={classes.body}>
      <Box className={classes.titlePart}>
        <Box className={classes.title}>Internal Swap</Box>
        <CurrencyExchangeIcon onClick={handleClickExcIcon} />
      </Box>

      <Divider color="#292a34" sx={{ mt: 2 }}></Divider>

      <Box className={classes.exchangeInfo}>
        <Box>
          {formatNumberWithCommas(Number(fromAmount), 1)}{" "}
          <Box component={"span"}>
            {fromTokenIndex !== -1 && SwapTokens[fromTokenIndex].name}
          </Box>
        </Box>
        <Box>
          <ArrowRightAltIcon />
        </Box>
        <Box>
          {formatNumberWithCommas(Number(toAmount), 1)}{" "}
          <Box component={"span"}>
            {toTokenIndex !== -1 && SwapTokens[toTokenIndex].name}
          </Box>
        </Box>
      </Box>

      <Box className={classes.inputBox} sx={{ mt: 4 }}>
        <Box className={classes.inputTitle}>Pay</Box>
        <InputSelectCoin
          handleChange={(e) => handleChangeToken(e, true)}
          selectedToken={fromTokenIndex}
          amount={fromAmount}
          handleChangeAmount={(e) => handleChangeAmount(e, true)}
          inputEnabled={inputEnabled}
        />
      </Box>

      <Box className={classes.inputBox} sx={{ mt: 2 }}>
        <Box className={classes.inputTitle}>Get</Box>
        <InputSelectCoin
          handleChange={(e) => handleChangeToken(e, false)}
          selectedToken={toTokenIndex}
          amount={toAmount}
          handleChangeAmount={(e) => handleChangeAmount(e, false)}
          inputEnabled={inputEnabled}
        />
      </Box>

      <Divider color="#292a34" sx={{ mt: 4 }}></Divider>

      <Button className={classes.exchangeBtn} onClick={handleClickExchange}>
        Exchange
      </Button>
    </Box>
  );
};

export default SwapPanel;
