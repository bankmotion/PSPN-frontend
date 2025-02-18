import { makeStyles } from "tss-react/mui";

const styles = makeStyles()((theme: any) => ({
  body: {
    background: "url(/assets/background.png) no-repeat",
    backgroundSize: "cover",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    padding: "40px 32px",
    boxSizing: "border-box",
    color: "white",
    fontFamily: "philosopher",

    "& *": {
      fontFamily: "philosopher",
    },

    [theme.breakpoints.down("sm")]: {
      padding: "16px 8px",
    },
  },

  container: {
    backgroundColor: "#292a34",
    maxWidth: 1920,
    minWidth: 1400,
    borderRadius: 40,
    padding: 20,

    [theme.breakpoints.down("xl")]: {
      maxWidth: 1600,
      minWidth: 900,
    },

    [theme.breakpoints.down("lg")]: {
      maxWidth: 900,
      minWidth: 850,
      width: "100%",
    },

    [theme.breakpoints.down("md")]: {
      minWidth: "auto",
    },

    [theme.breakpoints.down("sm")]: {
      maxWidth: "none",
      borderRadius: 16,
      margin: "0 8px",
      padding: 8,
    },
  },

  innerContainer: {
    backgroundColor: "#181a25",
    borderRadius: 24,
    display: "flex",
    height: "100%",

    [theme.breakpoints.down("sm")]: {
      borderRadius: 12,
    },
  },

  leftPanel: {
    width: 56,
    backgroundColor: "#12131c",
    borderTopLeftRadius: 32,
    borderBottomLeftRadius: 32,
    display: "flex",
    flexDirection: "column",

    [theme.breakpoints.down("sm")]: {
      width: 40,
      borderTopLeftRadius: 12,
      borderBottomLeftRadius: 12,
      display: "none",
    },
  },

  logoPart: {
    height: 64,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 20,
  },

  menuItems: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 64,
  },

  hoverBorder: {
    position: "absolute",
    left: 0,
    width: "4px",
    height: "48px",
    backgroundColor: "#00f6ff",
    borderRadius: "4px",
    zIndex: 1,
    transition: "all 0.3s ease-in-out",
  },

  menuItem: {
    position: "relative",
    width: "100%",
    height: "48px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",

    "& svg": {
      color: "#2c2e3d",
    },
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
  },

  rightPanel: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    padding: "0px 24px",

    [theme.breakpoints.down("sm")]: {
      padding: 0,
    },
  },

  topBar: {
    height: 100,
    width: "100%",
    display: "flex",
    justifyContent: "right",
    alignItems: "center",

    [theme.breakpoints.down("lg")]: {
      height: 80,
    },
  },

  topBarRightPanel: {
    display: "flex",
    gap: 4,
  },

  connectButton: {
    backgroundColor: "#171822",
    border: "3px solid #292a34",
    color: "#666873",
    borderRadius: 10,
    height: 60,
    minWidth: 220,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textTransform: "none",
    fontSize: "17px",
    gap: 8,

    [theme.breakpoints.down("xl")]: {
      height: 48,
      fontSize: 15,
      minWidth: 180,
    },

    [theme.breakpoints.down("lg")]: {
      height: 40,
      minWidth: 140,
      fontSize: 12,
    },

    [theme.breakpoints.down("sm")]: {
      marginRight: 4,
    },
  },

  layout: {
    height: "100%",
    // padding: "8px 16px",
    overflowY: "auto",
    // margin: "16px 0",

    [theme.breakpoints.down("sm")]: {
      margin: 0,
      // padding: "8px",
    },
  },

  balanceBut: {
    minWidth: 120,

    [theme.breakpoints.down("sm")]: {
      minWidth: 80,
      fontSize: 10,
      padding: 0,
      display: "none",
    },
  },

  menuIcon: {
    display: "none",

    [theme.breakpoints.down("sm")]: {
      display: "flex",
      position: "fixed",
      left: 24,
      top: 40,
      color: "white",
      fontSize: 24,
      minWidth: "auto",
      borderRadius: "50%",
      minHeight: "auto",
      width: 40,
      height: 40,
      justifyContent: "center",
      alignItems: "center",
    },
  },
}));

export default styles;
