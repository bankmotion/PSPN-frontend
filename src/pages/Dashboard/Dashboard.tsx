import React from "react";
import { Typography, Box, Button } from "@mui/material";
import SavingsIcon from "@mui/icons-material/Savings";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

import useStyles from "./index.styles";
import clsx from "clsx";

const Dashboard: React.FC = () => {
  const { classes } = useStyles();

  return (
    <Box className={classes.body}>
      <Typography variant="h3" className={classes.title}>
        Track your holdings, monitor your earnings, and watch your yield grow in
        real-time.
      </Typography>

      <Box className={classes.panelBox}>
        <Box className={clsx(classes.panel)}>
          <Box className={classes.titlePart}>
            <SavingsIcon sx={{ color: "#9b51e0" }} />
            Total Holdings
          </Box>
          <Box className={classes.valuePart}>
            2,312 <Box component={"span"}>PSPN</Box>
          </Box>
        </Box>

        <Box className={clsx(classes.panel)}>
          <Box className={classes.titlePart}>
            <TrendingUpIcon sx={{ color: "#56ccf2" }} />
            Expected Yield
          </Box>
          <Box className={classes.valuePart}>
            <Box component={"span"}>$</Box> 56,312
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
