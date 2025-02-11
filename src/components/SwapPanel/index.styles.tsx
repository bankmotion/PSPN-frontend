import { makeStyles } from "tss-react/mui";

const styles = makeStyles()((theme: any) => ({
  body: {
    fontSize: 24,
  },

  titlePart: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    "& svg": {
      color: "#a6a9b3",
      cursor: "pointer",
      transition: "0.3s",

      "&:hover": {
        color: "white",
        transition: "0.3s",
      },
    },
  },

  exchangeInfo: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 32,
    alignItems: "center",

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
    borderRadius: 12,
    padding: "8px 16px",
    fontSize: "22px",
    fontWeight: 500,
    cursor: "pointer",
    minWidth: 240,
    height: 60,
    fontFamily: "philosopher",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    transition: "transform 0.2s, box-shadow 0.2s",
    textTransform: "none",
    width: "100%",

    "&:hover": {
      boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)",
    },

    "&:active": {
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
    },
  },
}));

export default styles;
