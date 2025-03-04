import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((theme: any) => ({
  sidebarHeader: {
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    height: 64,
    gap: 15,
    padding: "16px",

    "& a": {
      color: "white",
      fontSize: "18px",
      textDecoration: "none",
      fontFamily: "Philosopher",
      fontWeight: 900,
    },
  },

  sidebarLogo: {
    width: 40,
  },

  sidebarNavLink: {
    textDecoration: "none",
    fontFamily: "Philosopher",
    fontWeight: 900,
    color: theme.palette.text.secondary,
    display: "flex",
    alignItems: "center",
    gap: "8px",

    "& span": {
      fontFamily: "Philosopher",
      fontWeight: 900,
    },

    "&.active": {
      color: theme.palette.text.primary,
    },
  },

  sideBarConnectWalletBtn: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: theme.palette.background.lightGray,
    borderRadius: "12px",
    color: theme.palette.text.primary,

    "& span": {
      fontFamily: "Philosopher",
      fontWeight: 900,
    },
  },

  sidebarPaper: {
    backgroundColor: "rgb(23, 25, 26)",
    width: 240,
    minWidth: 240,
  },

  sideBar: {
    height: "100vh",
    width: 240,
    minWidth: 240,
    backgroundColor: "rgb(23, 25, 26)",
    display: "flex",
    flexDirection: "column",
    paddingTop: "120px",
    zIndex: 100,
    boxSizing: "border-box",
    overflowY: "auto",
    borderRight: "1px solid black",
  },

  navLinkIcon: {
    width: 20,
    height: 20,
  },

  navLinkText: {
    fontSize: 16,
    color: "grey",
    fontFamily: "Philosopher",
    fontWeight: 900,
    userSelect: "none",
  },

  menuGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    padding: "0 24px",
  },

  activedMenu: {
    "& svg": {
      color: "#bdc0c9",
      transition: ".5s ease-in-out",
      filter: "brightness(1.5) drop-shadow(0px 0px 6px #ffffff)",
    },
  },

  iconPart: {
    display: "flex",
    justifyContent: "center",
    minWidth: "auto",

    "& svg": {
      color: "grey",
    },
  },

  menuDetail: {
    display: "flex",
    gap: 16,
    color: "white",

    "& img": {
      width: 24,
    },
  },

  divider: {
    width: "calc(100%-48px)",
    backgroundColor: "#292a34",
    margin: "12px 24px",
  },
}));
