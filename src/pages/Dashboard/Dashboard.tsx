import React, { useEffect, useState } from "react";
import { Typography, Box, Button, duration } from "@mui/material";
import SavingsIcon from "@mui/icons-material/Savings";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

import useStyles from "./index.styles";
import clsx from "clsx";
import { formatNumberWithCommas } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { getTokenBalanceByUser, setTokenBalance } from "../../redux/userSlice";
import { AppDispatch, RootState } from "../../redux/store";
import useWallet from "../../hook/useWallet";
import { useSpring, animated } from "react-spring";

const Dashboard: React.FC = () => {
  const { classes } = useStyles();
  const dispatch: AppDispatch = useDispatch();

  const [expectedYeildAmount, setExpectedYieldAmount] = useState(56312);
  const [growRate, setGrowRate] = useState(3);

  const { account } = useWallet();
  const { myTokenBalance } = useSelector((state: RootState) => state.user);

  const balanceProps = useSpring({
    number: myTokenBalance,
    from: { number: 0 },
    config: { duration: 2000 },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setExpectedYieldAmount((amount) => amount + growRate);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [growRate]);

  useEffect(() => {
    if (account) {
      dispatch(getTokenBalanceByUser({ account }));
    } else {
      dispatch(setTokenBalance(0));
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
            <SavingsIcon sx={{ color: "#9b51e0" }} />
            Total Holdings
          </Box>
          <Box className={classes.valuePart}>
            <animated.div>
              {balanceProps.number.interpolate((n) =>
                formatNumberWithCommas(Math.floor(n))
              )}
            </animated.div>
            {/* {formatNumberWithCommas(myTokenBalance)}{" "} */}
            <Box component={"span"}>PSPN</Box>
          </Box>
        </Box>

        <Box className={clsx(classes.panel)}>
          <Box className={classes.titlePart}>
            <TrendingUpIcon sx={{ color: "#56ccf2" }} />
            Expected Yield
          </Box>
          <Box className={classes.valuePart}>
            <Box component={"span"}>$</Box>{" "}
            {formatNumberWithCommas(expectedYeildAmount)}
          </Box>
        </Box>

        <Box className={clsx(classes.panel)}>
          <Box className={classes.titlePart}>
            <MonetizationOnIcon sx={{ color: "#34c759" }} />
            Total Yield Earned
          </Box>
          <Box className={classes.valuePart}>
            <Box component={"span"}>$</Box> 2,312
          </Box>
        </Box>
      </Box>

      <Box className={classes.buttonBox}>
        <Button className={classes.yieldClaimBtn}>Claim Yield</Button>
      </Box>
    </Box>
  );
};

export default Dashboard;
