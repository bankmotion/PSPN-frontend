import { Box, Button } from "@mui/material";
import isMobile from "is-mobile";

import useStyles from "./topbar.styles";
import useWallet from "../../hook/useWallet";
import {
  formatNumber,
  formatNumberWithCommas,
  getShortAddress,
} from "../../utils";

import Blockies from "../Blockies/Blockies";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import clsx from "clsx";
import { Link, useLocation } from "react-router-dom";
import { MenuItems } from "../../constants/layout";

const TopBar = () => {
  const { classes } = useStyles();

  const { connectWallet, disconnectWallet, account, isConnected } = useWallet();
  const { myTokenBalance, myUFCTokenBalance } = useSelector(
    (state: RootState) => state.user
  );
  const currentRoute = useLocation();

  return (
    <Box className={classes.body}>
      <Box className={classes.container}>
        <Box className={classes.logoPart}>
          <Box component="img" src="/assets/main/logo.png" />
        </Box>
        <Box className={classes.menuBar}>
          <Box className={classes.mainMenuBar}>
            {MenuItems.map((menu) => (
              <Link
                to={menu.href[0]}
                className={clsx(
                  menu.href.some((href) => href === currentRoute.pathname)
                    ? classes.focused
                    : null
                )}
              >
                <Box component="img" src={`/assets/icons/${menu.icon}.png`} />
                {menu.label}
              </Link>
            ))}
          </Box>

          <Box className={classes.menuRightPart}>
            <Box className={classes.tokenBalance}>
              <Box component={"img"} src="/assets/tokens/pspn.png" />
              <Box component={"span"}>
                {formatNumberWithCommas(myTokenBalance, 0)}
              </Box>{" "}
              PSPN
            </Box>
            <Box className={classes.tokenBalance}>
              <Box component={"img"} src="/assets/tokens/ufc.png" />
              <Box component={"span"}>
                {formatNumberWithCommas(myUFCTokenBalance, 0)}
              </Box>{" "}
              UFC
            </Box>
            <Button
              variant="contained"
              onClick={
                isConnected ? () => disconnectWallet() : () => connectWallet()
              }
            >
              {isConnected ? getShortAddress(account) : "Connect Wallet"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TopBar;
