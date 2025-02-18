import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Typography,
} from "@mui/material";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import useWallet from "../../hook/useWallet";

import { useStyles } from "./SideBar.styles";
import { MenuItems } from "../../constants/layout";
import { formatNumberWithCommas, getShortAddress } from "../../utils";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const MobileSideBar = ({
  showMobileSideBar,
  toggleMobileSideBar,
  onConnectWallet,
}: {
  showMobileSideBar: boolean;
  toggleMobileSideBar: React.Dispatch<React.SetStateAction<boolean>>;
  onConnectWallet: () => void;
}) => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const hoverRef = useRef<HTMLDivElement>(null);
  const menuRefs = useRef<(HTMLIFrameElement | null)[]>([]);

  const { myTokenBalance, myUFCTokenBalance } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    if (activeIndex === null) return;

    if (hoverRef.current) {
      gsap.set(hoverRef.current, {
        top: menuRefs.current[activeIndex]?.offsetTop ?? 0,
      });
    }
    navigate(MenuItems[activeIndex].href);
  }, [activeIndex, navigate]);

  useEffect(() => {
    const index = MenuItems.findIndex(
      (item) => item.href === location.pathname
    );
    setActiveIndex(index !== -1 ? index : 0);
  }, [location.pathname]);

  return (
    <Drawer
      PaperProps={{ className: classes.sidebarPaper }}
      open={showMobileSideBar}
      onClose={() => toggleMobileSideBar(false)}
    >
      <Box className={classes.sidebarHeader}>
        {/* <Logo classNames={classes.sidebarLogo} /> */}
        <NavLink to="/"> PSPN</NavLink>
      </Box>

      <Box className={classes.menuGroup}>
        {MenuItems.map((navLinks, index) => {
          return (
            <Box
              className={classes.menuDetail}
              onClick={() => {
                navigate(`${navLinks.href}`);
                toggleMobileSideBar(false);
              }}
            >
              <ListItemIcon
                className={clsx(
                  classes.iconPart,
                  activeIndex === index && classes.activedMenu
                )}
              >
                {navLinks.icon}
              </ListItemIcon>
              {navLinks.label}
            </Box>
          );
        })}
      </Box>

      <Divider className={classes.divider}></Divider>

      <Box className={classes.menuGroup}>
        <Box className={classes.menuDetail}>
          {formatNumberWithCommas(myTokenBalance, 0)} PSPN
        </Box>
        <Box className={classes.menuDetail}>
          {formatNumberWithCommas(myUFCTokenBalance, 0)} UFC
        </Box>
      </Box>
    </Drawer>
  );
};

export default MobileSideBar;
