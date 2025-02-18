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
import { SwapTokens } from "../../config/config";
import useWallet from "../../hook/useWallet";
import { AppDispatch, RootState } from "../../redux/store";
import { getAllTokensPrice, handleInternalSwap } from "../../redux/swapSlice";
import { getTokenBalanceByUser } from "../../redux/userSlice";
import { formatNumberWithCommas } from "../../utils";
import InputSelectCoin from "../InputSelectCoin/Index";
import useStyles from "./index.styles";
import { toast } from "react-toastify";

export const SwapPanel = () => {
  const { classes } = useStyles();
  const { account } = useWallet();
  const dispatch: AppDispatch = useDispatch();
  const { fromRatio, toRatio, loadingInternalSwap } = useSelector(
    (state: RootState) => state.swap
  );

  const [fromTokenIndex, setFromTokenIndex] = useState(0);
  const [toTokenIndex, setToTokenIndex] = useState(1);
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const handleChangeFromAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFromAmount(value);
    if (!isUpdating) {
      setIsUpdating(true);
      const toAmount = (Number(value) / toRatio) * fromRatio;
      setToAmount(
        !isNaN(toAmount) ? Number(toAmount.toFixed(3)).toString() : ""
      );
      setIsUpdating(false);
    }
  };

  const handleChangeToAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setToAmount(value);
    if (!isUpdating) {
      setIsUpdating(true);
      const fromAmount = (Number(value) / fromRatio) * toRatio;
      setFromAmount(
        !isNaN(fromAmount) ? Number(fromAmount.toFixed(3)).toString() : ""
      );
      setIsUpdating(false);
    }
  };

  const changeFromToken = (e: SelectChangeEvent<number>) => {
    setFromTokenIndex(Number(e.target.value));
    setFromAmount("0");
    setToAmount("0");
  };

  const changeToToken = (e: SelectChangeEvent<number>) => {
    setToTokenIndex(Number(e.target.value));
    setFromAmount("0");
    setToAmount("0");
  };

  const handleClickExcIcon = () => {
    const tempIndex = fromTokenIndex;
    const tempAmount = fromAmount;
    setFromTokenIndex(toTokenIndex);
    setToTokenIndex(tempIndex);
    setFromAmount(toAmount);
    setToAmount(tempAmount);
  };

  const handleClickExchange = () => {
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
        setFromAmount("");
        setToAmount("");
        toast.success("Swapped successfully!");
      });
  };

  const isEnableExchangeButton =
    fromAmount &&
    toAmount &&
    !isNaN(Number(fromAmount)) &&
    !isNaN(Number(toAmount)) &&
    Number(fromAmount) &&
    Number(toAmount) &&
    !loadingInternalSwap;

  const inputEnabled = fromTokenIndex !== -1 && toTokenIndex !== -1;

  useEffect(() => {
    if (fromTokenIndex === -1) return;
    if (fromTokenIndex === toTokenIndex) {
      setToTokenIndex(1 - fromTokenIndex);
    }
  }, [fromTokenIndex]);

  useEffect(() => {
    if (toTokenIndex === -1) return;
    if (fromTokenIndex === toTokenIndex) {
      setFromTokenIndex(1 - fromTokenIndex);
    }
  }, [toTokenIndex]);

  useEffect(() => {
    if (fromTokenIndex === -1) return;
    dispatch(getAllTokensPrice({ from: SwapTokens[fromTokenIndex].address }));
  }, [dispatch, fromTokenIndex]);

  useEffect(() => {
    if (toTokenIndex === -1) return;
    dispatch(getAllTokensPrice({ to: SwapTokens[toTokenIndex].address }));
  }, [dispatch, toTokenIndex]);

  return (
    <Box className={classes.body}>
      <Box className={classes.titlePart}>
        <Box className={classes.title}>Internal Swap</Box>
        <CurrencyExchangeIcon onClick={handleClickExcIcon} />
      </Box>

      <Divider color="#292a34" sx={{ mt: 2 }}></Divider>

      <Box className={classes.exchangeInfo}>
        <Box>
          {formatNumberWithCommas(Number(fromAmount))}{" "}
          <Box component={"span"}>
            {fromTokenIndex !== -1 && SwapTokens[fromTokenIndex].name}
          </Box>
        </Box>
        <Box>
          <ArrowRightAltIcon />
        </Box>
        <Box>
          {formatNumberWithCommas(Number(toAmount))}{" "}
          <Box component={"span"}>
            {toTokenIndex !== -1 && SwapTokens[toTokenIndex].name}
          </Box>
        </Box>
      </Box>

      <Box className={classes.inputBox} sx={{ mt: 4 }}>
        <Box className={classes.inputTitle}>Pay</Box>
        <InputSelectCoin
          handleChange={changeFromToken}
          selectedToken={fromTokenIndex}
          amount={fromAmount}
          handleChangeAmount={handleChangeFromAmount}
          inputEnabled={inputEnabled}
        />
      </Box>

      <Box className={classes.inputBox} sx={{ mt: 2 }}>
        <Box className={classes.inputTitle}>Get</Box>
        <InputSelectCoin
          handleChange={changeToToken}
          selectedToken={toTokenIndex}
          amount={toAmount}
          handleChangeAmount={handleChangeToAmount}
          inputEnabled={inputEnabled}
        />
      </Box>

      <Divider color="#292a34" sx={{ mt: 4 }}></Divider>

      <Button
        className={classes.exchangeBtn}
        disabled={!isEnableExchangeButton}
        onClick={handleClickExchange}
      >
        Exchange{" "}
        {loadingInternalSwap && (
          <CircularProgress className={classes.loadingIcon} />
        )}
      </Button>
    </Box>
  );
};

export default SwapPanel;
