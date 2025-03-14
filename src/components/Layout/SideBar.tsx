import { Box, Divider, Drawer } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { MenuItems } from "../../constants/layout";
import useWallet from "../../hook/useWallet";
import { RootState } from "../../redux/store";
import { formatNumberWithCommas, getShortAddress } from "../../utils";
import { useStyles } from "./SideBar.styles";

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
  const { account } = useWallet();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const { myTokenBalance, myUFCTokenBalance } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    const index = MenuItems.findIndex((item) =>
      item.href.some((href) => href === location.pathname)
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
        <Box
          component={"img"}
          className={classes.sidebarLogo}
          src={`/assets/tokens/pspn.png`}
        />
        <NavLink to="/"> PSPN</NavLink>
      </Box>

      <Box className={classes.menuGroup}>
        <Box
          className={classes.menuDetail}
          sx={{
            color: "gray",
            marginBottom: 2,
          }}
        >
          {getShortAddress(account)}
        </Box>
        {MenuItems.map((navLinks, index) => {
          return (
            <Box
              className={classes.menuDetail}
              key={index}
              onClick={() => {
                navigate(`${navLinks.href[0]}`);
                toggleMobileSideBar(false);
              }}
            >
              <Box
                component={"img"}
                src={`/assets/icons/${navLinks.icon}.png`}
              />
              {navLinks.label}
            </Box>
          );
        })}
      </Box>

      <Divider className={classes.divider}></Divider>

      <Box className={classes.menuGroup}>
        <Box className={classes.menuDetail}>
          <Box component={"img"} src={`/assets/tokens/pspn.png`} />
          {formatNumberWithCommas(myTokenBalance, 0)} PSPN
        </Box>
        <Box className={classes.menuDetail}>
          <Box component={"img"} src={`/assets/tokens/ufc.png`} />
          {formatNumberWithCommas(myUFCTokenBalance, 0)} UFC
        </Box>
      </Box>
    </Drawer>
  );
};

export default MobileSideBar;
