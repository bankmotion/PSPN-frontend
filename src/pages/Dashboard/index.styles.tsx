import { makeStyles } from "tss-react/mui";

const styles = makeStyles()((theme: any) => ({
  body: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    gap: 64,
    paddingBottom: 32,

    [theme.breakpoints.down("lg")]: {
      gap: 32,
    },
  },

  title: {
    maxWidth: 1100,
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
      marginTop: 24,
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
    border: "3px solid rgb(24,24,24)",
    borderRadius: 16,
    padding: "24px 16px",
    display: "flex",
    flexDirection: "column",
    gap: 12,
    position: "relative",
    background: "#00000066",
    cursor: "pointer",
    transition: "0.3s",

    "&:hover": {
      transition: "0.3s",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      // border: "3px solid gray",
    },

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

    [theme.breakpoints.down("sm")]: {
      maxWidth: "auto",
      width: "100%",
      padding: "18px 24px",
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
    fontSize: 17,
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
    fontSize: 28,
    fontWeight: "bold",
    marginLeft: 16,
    display: "flex",
    gap: 8,
    alignItems: "end",

    "& span": {
      color: "#666873",
      fontSize: 22,
    },

    [theme.breakpoints.down("xl")]: {
      fontSize: 25,
    },

    [theme.breakpoints.down("lg")]: {
      fontSize: 20,
    },
  },

  buttonBox: {
    display: "flex",
    justifyContent: "right",
    alignItems: "end",
  },

  yieldClaimBtn: {
    background: "linear-gradient(90deg, #9b51e0, #56ccf2)",
    color: "white",
    border: "none",
    borderRadius: 12,
    fontSize: 14,
    fontWeight: 500,
    cursor: "pointer",
    minWidth: 120,
    height: 32,
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    transition: "transform 0.2s, box-shadow 0.2s",
    textTransform: "none",
    display: "flex",
    gap: 8,
    width: 140,

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
      minWidth: 100,
      height: 36,
    },

    [theme.breakpoints.down("lg")]: {
      fontSize: 15,
      minWidth: 100,
      height: 32,
    },
  },

  loadingIcon: {
    width: "32px!important",
    height: "32px!important",
  },

  dailyYield: {
    display: "flex",
    fontSize: 28,

    [theme.breakpoints.down("sm")]: {
      fontSize: 22,
    },
  },

  tokenPanel: {
    display: "flex",
    gap: 48,

    [theme.breakpoints.down("sm")]: {
      gap: 24,
    },

    "&>div": {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: 16,
      fontSize: 24,
      color: "#fff",
      fontWeight: 600,
      textShadow:
        "0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.3)",

      [theme.breakpoints.down("sm")]: {
        gap: 4,
      },

      "&>img": {
        width: 120,
        background:
          "linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1))",
        borderRadius: "50%",
        padding: 12,
        border: "4px solid rgba(255, 255, 255, 0.8)",
        boxShadow:
          "0 0 8px rgba(255, 255, 255, 0.3), 0 0 15px rgba(255, 255, 255, 0.2), 0 0 25px rgba(255, 255, 255, 0.1)",
        transition: "all 0.5s ease-in-out",

        [theme.breakpoints.down("sm")]: {
          width: 60,
        },

        "&:hover": {
          boxShadow:
            "0 0 15px rgba(255, 255, 255, 0.9), 0 0 25px rgba(255, 255, 255, 0.7), 0 0 45px rgba(255, 255, 255, 0.5)",
          transform: "scale(1.15) rotate(3deg)",
          filter: "brightness(1.3)",
        },
      },
    },
  },
}));

export default styles;
