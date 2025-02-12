import { Box } from "@mui/material";
import React, { ReactNode } from "react";

import useStyles from "./index.styles";
import LeftSideBar from "./LeftSideBar";
import TopBar from "./TopBar";

interface LayoutProps {
  children: ReactNode;
}

const LayoutIndex: React.FC<LayoutProps> = ({ children }) => {
  const { classes } = useStyles();

  return (
    <Box className={classes.body}>
      <Box className={classes.container}>
        <Box className={classes.innerContainer}>
          <LeftSideBar />
          <Box className={classes.rightPanel}>
            <TopBar />
            <main className={classes.layout}>{children}</main>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LayoutIndex;
