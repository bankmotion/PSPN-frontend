import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import SavingsIcon from "@mui/icons-material/Savings";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { Box, Button, CircularProgress } from "@mui/material";
import clsx from "clsx";
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import useWallet from "../../hook/useWallet";
import { AppDispatch, RootState } from "../../redux/store";
import {
  getTokenBalanceByUser,
  getYieldInfo,
  getYieldRate,
  handleClaimYield,
  setTokenBalance,
} from "../../redux/userSlice";
import { formatNumberWithCommas } from "../../utils";
import useStyles from "./index.styles";

const Dashboard: React.FC = () => {
  const { classes } = useStyles();
  const dispatch: AppDispatch = useDispatch();

  const [expectedYeildAmount, setExpectedYieldAmount] = useState(0);

  const { account } = useWallet();
  const {
    myTokenBalance,
    myUFCTokenBalance,
    yieldInfo,
    dailyYieldRate,
    loadingClaimYield,
  } = useSelector((state: RootState) => state.user);

  const handleClaimYields = () => {
    dispatch(handleClaimYield({ account }))
      .unwrap()
      .then(() => {
        dispatch(getTokenBalanceByUser({ account }));
        dispatch(getYieldInfo({ account }));

        toast.success("Claimed yield successfully!");
      });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const timeElapsed =
        new Date().getTime() / 1000 - yieldInfo.lastClaimTimestamp;

      const pendingYield =
        yieldInfo.lastClaimTimestamp === 0
          ? 0
          : (myUFCTokenBalance * dailyYieldRate * timeElapsed) /
            (3600 * 24) /
            10000;

      setExpectedYieldAmount(pendingYield + yieldInfo.yieldToClaim);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [dailyYieldRate, myUFCTokenBalance, yieldInfo]);

  useEffect(() => {
    if (account) {
      dispatch(getTokenBalanceByUser({ account }));
      dispatch(getYieldInfo({ account }));
      dispatch(getYieldRate());
    } else {
      dispatch(setTokenBalance(0));
    }
  }, [account, dispatch]);

  const claimButtonEnabled =
    !loadingClaimYield && account && expectedYeildAmount;

  return (
    <Box className={classes.body}>
      <Box className={classes.title}>
        Track your holdings, monitor your earnings, and watch your yield grow in
        real-time.
      </Box>

      <Box className={classes.panelBox}>
        <Box className={clsx(classes.panel)}>
          <Box className={classes.titlePart}>
            <SavingsIcon sx={{ color: "#9b51e0" }} />
            Total Holdings
          </Box>
          <Box className={classes.valuePart}>
            {formatNumberWithCommas(myTokenBalance, 0)}{" "}
            <Box component={"span"}>PSPN</Box>
          </Box>
          <Box className={classes.valuePart}>
            {formatNumberWithCommas(myUFCTokenBalance, 0)}{" "}
            <Box component={"span"}>UFC</Box>
          </Box>
        </Box>

        <Box className={clsx(classes.panel)}>
          <Box className={classes.titlePart}>
            <TrendingUpIcon sx={{ color: "#56ccf2" }} />
            Expected Yield
          </Box>
          <Box className={classes.valuePart}>
            {formatNumberWithCommas(expectedYeildAmount)}{" "}
            <Box component={"span"}>PSPN</Box>
          </Box>
        </Box>

        <Box className={clsx(classes.panel)}>
          <Box className={classes.titlePart}>
            <MonetizationOnIcon sx={{ color: "#34c759" }} />
            Total Yield Earned
          </Box>
          <Box className={classes.valuePart}>
            {formatNumberWithCommas(yieldInfo.totalClaimed)}
            <Box component={"span"}>PSPN</Box>
          </Box>
        </Box>
      </Box>

      <Box className={classes.buttonBox} onClick={handleClaimYields}>
        <Button
          className={classes.yieldClaimBtn}
          disabled={!claimButtonEnabled}
        >
          Claim Yield{" "}
          {loadingClaimYield && (
            <CircularProgress className={classes.loadingIcon} />
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default Dashboard;
