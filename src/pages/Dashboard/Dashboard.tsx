import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
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
  initYieldInfo,
  setTokenBalance,
} from "../../redux/userSlice";
import { formatNumberWithCommas } from "../../utils";
import useStyles from "./index.styles";

const Dashboard: React.FC = () => {
  const { classes } = useStyles();
  const dispatch: AppDispatch = useDispatch();

  const [expectedYeildAmount, setExpectedYieldAmount] = useState(0);

  const { account, connectWallet } = useWallet();
  const { myTokenBalance, myUFCTokenBalance, yieldInfo, dailyYieldRate } =
    useSelector((state: RootState) => state.user);

  const handleClaimYields = () => {
    if (!account) {
      connectWallet();
      return;
    }

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
      dispatch(initYieldInfo());
    }
  }, [account, dispatch]);

  return (
    <Box className={classes.body}>
      <Box className={classes.title}>
        Track your holdings, monitor your earnings, and watch your yield grow in
        real-time.
      </Box>

      <Box className={classes.panelBox}>
        <Box className={clsx(classes.panel)}>
          <Box className={classes.titlePart}>
            <MonetizationOnIcon sx={{ color: "#34c759" }} />
            Daily Yield
          </Box>
          <Box className={classes.valuePart}>
            {formatNumberWithCommas(
              (myUFCTokenBalance * dailyYieldRate) / 10000,
              0
            )}{" "}
            <Box component={"span"}>PSPN</Box>
            <Box component={"span"}>
              ({Number((dailyYieldRate / 100).toFixed(2))}%)
            </Box>
          </Box>
        </Box>

        <Box className={clsx(classes.panel)}>
          <Box className={classes.titlePart}>
            <TrendingUpIcon sx={{ color: "#56ccf2" }} />
            Expected Yield
          </Box>
          <Box className={classes.valuePart}>
            {formatNumberWithCommas(Math.max(expectedYeildAmount, 0))}{" "}
            <Box component={"span"}>PSPN</Box>
          </Box>
          <Box className={classes.buttonBox}>
            <Button
              className={classes.yieldClaimBtn}
              onClick={handleClaimYields}
            >
              Claim Yield
            </Button>
          </Box>
        </Box>

        <Box className={clsx(classes.panel)}>
          <Box className={classes.titlePart}>
            <MonetizationOnIcon sx={{ color: "#34c759" }} />
            Total Yield Earned
          </Box>
          <Box className={classes.valuePart}>
            {formatNumberWithCommas(yieldInfo.totalClaimed, 0)}
            <Box component={"span"}>PSPN</Box>
          </Box>
        </Box>
      </Box>

      <Box className={classes.tokenPanel}>
        <Box>
          <Box component={"img"} src="/assets/tokens/pspn.png" />
          {formatNumberWithCommas(myTokenBalance, 0)} PSPN
        </Box>
        <Box>
          <Box component={"img"} src="/assets/tokens/ufc.png" />
          {formatNumberWithCommas(myUFCTokenBalance, 0)} UFC
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
