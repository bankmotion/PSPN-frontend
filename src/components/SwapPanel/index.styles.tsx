import { makeStyles } from "tss-react/mui";

const styles = makeStyles()((theme: any) => ({
  body: {
    fontSize: 24,
    backgroundColor: "#0d111c",
    padding: "16px",
    borderRadius: 16,
    maxHeight: 500,
    marginTop: 72,

    [theme.breakpoints.down("lg")]: {
      fontSize: 17,
    },

    [theme.breakpoints.down("md")]: {
      marginTop: 0,
    },
  },

  titlePart: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    "& h5": {
      fontFamily: "philosopher",
    },

    "& svg": {
      color: "#a6a9b3",
      cursor: "pointer",
      transition: "0.3s",
      fontSize: 20,

      "&:hover": {
        color: "white",
        transition: "0.3s",
      },
    },
  },

  title: {
    fontSize: "17px",

    [theme.breakpoints.down("sm")]: {
      fontSize: 12,
    },
  },

  exchangeInfo: {
    display: "grid",
    gridTemplateColumns: "3fr 1fr 3fr",
    justifyContent: "space-between",
    marginTop: 32,
    alignItems: "center",

    "&>div": {
      textAlign: "center",
    },

    "& span": {
      color: "#43465c",
    },

    "& svg": {
      color: "#a6a9b3",
      fontSize: 30,
    },
  },

  inputBox: {
    display: "flex",
    gap: 8,
    flexDirection: "column",

    [theme.breakpoints.down("sm")]: {
      marginTop: 20,
    },
  },

  inputTitle: {
    fontSize: 20,
    color: "#43465c",
  },

  exchangeBtn: {
    marginTop: 40,
    background: "linear-gradient(90deg, #9b51e0, #56ccf2)",
    color: "white",
    border: "none",
    borderRadius: 10,
    padding: "8px 16px",
    fontSize: "22px",
    fontWeight: 500,
    cursor: "pointer",
    minWidth: 240,
    height: 50,
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    transition: "transform 0.2s, box-shadow 0.2s",
    textTransform: "none",
    width: "100%",
    display: "flex",
    gap: 8,

    "&:hover": {
      boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)",
    },

    "&:active": {
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
    },

    [theme.breakpoints.down("sm")]: {
      fontSize: 17,
      marginTop: 24,
      minWidth: 200,
      height: 40,
    },
  },

  loadingIcon: {
    width: "32px!important",
    height: "32px!important",
  },
}));

export default styles;
