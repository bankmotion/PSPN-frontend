import { makeStyles } from "tss-react/mui";

const styles = makeStyles()((theme: any) => ({
  body: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    height: "100%",
    gap: 64,

    [theme.breakpoints.down("lg")]: {
      gap: 32,
    },
  },

  title: {
    maxWidth: 1000,
    textAlign: "center",
    fontWeight: "bold",
    filter: "brightness(1.5) drop-shadow(0px 0px 6px #b5b5b5)",
    marginTop: 56,
    fontSize: 48,

    [theme.breakpoints.down("xl")]: {
      fontSize: 32,
      marginTop: 0,
      maxWidth: 800,
    },

    [theme.breakpoints.down("lg")]: {
      fontSize: 24,
      maxWidth: 600,
    },

    [theme.breakpoints.down("sm")]: {
      fontSize: 20,
    },
  },

  panelBox: {
    display: "flex",
    gap: 24,
    width: "100%",
    justifyContent: "center",

    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },

    [theme.breakpoints.down("sm")]: {
      gap: 12,
    },
  },

  panel: {
    maxWidth: 360,
    minWidth: 300,
    height: 120,
    border: "3px solid #292a34",
    borderRadius: 16,
    padding: "24px 16px",
    display: "flex",
    flexDirection: "column",
    gap: 12,
    position: "relative",

    [theme.breakpoints.down("xl")]: {
      maxWidth: 300,
      minWidth: 260,
      height: 100,
    },

    [theme.breakpoints.down("lg")]: {
      maxWidth: 250,
      minWidth: 200,
      height: 100,
      padding: "8px 8px",
    },

    [theme.breakpoints.down("md")]: {
      gap: 12,
      height: "auto",
    },
  },

  panelCircle: {
    position: "absolute",
    borderRadius: "50%",
    backgroundColor: "rgba(0,0,0,0.2)",
    pointerEvents: "none",
  },

  panelBg1: {
    background:
      "linear-gradient(45deg, rgba(173, 216, 230, 0.5), rgba(216, 191, 216, 0.5))",
  },

  panelBg2: {
    background:
      "linear-gradient(45deg, rgba(144, 238, 144, 0.4), rgba(255, 255, 204, 0.4))",
  },

  panelBg3: {
    background:
      "linear-gradient(45deg, rgba(255, 182, 193, 0.5), rgba(255, 228, 181, 0.5))",
  },

  titlePart: {
    fontSize: 20,
    display: "flex",
    gap: 8,
    alignItems: "center",

    "& svg": {
      fontSize: 28,
    },

    [theme.breakpoints.down("xl")]: {
      fontSize: 17,
    },

    [theme.breakpoints.down("lg")]: {
      fontSize: 15,
    },
  },

  valuePart: {
    fontSize: 32,
    fontWeight: "bold",
    marginLeft: 16,
    display: "flex",
    gap: 8,

    "& span": {
      color: "#666873",
    },

    [theme.breakpoints.down("xl")]: {
      fontSize: 25,
    },

    [theme.breakpoints.down("lg")]: {
      fontSize: 20,
    },
  },

  buttonBox: {},

  yieldClaimBtn: {
    background: "linear-gradient(90deg, #9b51e0, #56ccf2)",
    color: "white",
    border: "none",
    borderRadius: 12,
    padding: "8px 16px",
    fontSize: "22px",
    fontWeight: 500,
    cursor: "pointer",
    minWidth: 240,
    height: 60,
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    transition: "transform 0.2s, box-shadow 0.2s",
    textTransform: "none",

    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)",
    },

    "&:active": {
      transform: "translateY(1px)",
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
    },

    [theme.breakpoints.down("xl")]: {
      fontSize: 18,
      minWidth: 220,
      height: 48,
    },

    [theme.breakpoints.down("lg")]: {
      fontSize: 15,
      minWidth: 200,
      height: 40,
    },
  },
}));

export default styles;
