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
  },

  container: {
    backgroundColor: "#292a34",
    maxWidth: 1920,
    minWidth: 1400,
    borderRadius: 40,
    padding: 20,
  },

  innerContainer: {
    backgroundColor: "#181a25",
    borderRadius: 24,
    display: "flex",
    height: "100%",
  },

  leftPanel: {
    width: 56,
    backgroundColor: "#12131c",
    borderTopLeftRadius: 32,
    borderBottomLeftRadius: 32,
    display: "flex",
    flexDirection: "column",
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
  },

  topBar: {
    height: 100,
    width: "100%",
    display: "flex",
    justifyContent: "right",
    alignItems: "center",
  },

  topBarRightPanel: {},

  connectButton: {
    backgroundColor: "#171822",
    border: "3px solid #292a34",
    color: "#666873",
    borderRadius: 10,
    height: 48,
    minWidth: 200,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textTransform: "none",
    fontSize: "17px",
    fontFamily: "philosopher",
  },

  layout: {
    height: "100%",
    padding: "8px 16px",
    overflowY: "auto",
    margin: "16px 0",
  },
}));

export default styles;
