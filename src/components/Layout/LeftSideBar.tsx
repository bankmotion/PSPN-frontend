import { Box, ListItemIcon, Popover } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

import useStyles from "./index.styles";
import { MenuItems } from "../../constants/layout";
import clsx from "clsx";
import { useLocation, useNavigate } from "react-router-dom";

const LeftSideBar = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const location = useLocation();

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const hoverRef = useRef<HTMLDivElement>(null);
  const menuRefs = useRef<(HTMLIFrameElement | null)[]>([]);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  const handleHover = (index: number, event: React.MouseEvent<HTMLElement>) => {
    setHoverIndex(index);
    if (hoverRef.current) {
      gsap.to(hoverRef.current, {
        top: menuRefs.current[index]?.offsetTop ?? 0,
        duration: 0.1,
        ease: "power3.out",
      });
    }
  };

  const handleLeave = () => {
    if (activeIndex === null) return;

    setHoverIndex(null);
    if (hoverRef.current) {
      gsap.to(hoverRef.current, {
        top: menuRefs.current[activeIndex]?.offsetTop ?? 0,
        duration: 0.1,
        ease: "power3.out",
      });
    }
  };

  return (
    <Box className={classes.leftPanel}>
      <Box className={classes.logoPart}>PSPN</Box>
      <Box className={classes.menuItems}>
        <Box className={classes.hoverBorder} ref={hoverRef}></Box>
        {MenuItems.map((item, index) => (
          <Box
            key={index}
            ref={(el: HTMLIFrameElement) => (menuRefs.current[index] = el)}
            className={classes.menuItem}
            onClick={() => setActiveIndex(index)}
            onMouseEnter={(event) => handleHover(index, event)}
            onMouseLeave={handleLeave}
          >
            <ListItemIcon
              className={clsx(
                classes.iconPart,
                (activeIndex === index || hoverIndex === index) &&
                  classes.activedMenu
              )}
            >
              {item.icon}
            </ListItemIcon>
          </Box>
        ))}
      </Box>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleLeave}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        123
      </Popover>
    </Box>
  );
};

export default LeftSideBar;
