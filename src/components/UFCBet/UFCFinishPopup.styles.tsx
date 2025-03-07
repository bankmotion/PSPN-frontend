import { makeStyles } from "tss-react/mui";

const styles = makeStyles()((theme: any) => ({
  body: {
    "& .MuiPaper-root": {
      backgroundColor: "#1d1d1d",
      color: theme.palette.text.primary,
      display: "flex",
      flexDirection: "column",
      borderRadius: "16px",
      fontFamily: "Philosopher",
      fontWeight: 900,
      gap: 8,

      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
    },
  },

  modalContent: {
    position: "relative",
  },

  contentBody: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    padding: "32px 96px",
    alignItems: "center",

    "& input": {
      padding: "8px 8px",
      color: "white",
    },

    [theme.breakpoints.down("sm")]: {
      padding: "32px 22px",
    },
  },

  header: {
    fontSize: 24,
    color: "white",
    marginBottom: 24,
  },

  closeIconBody: {
    display: "flex",
    justifyContent: "flex-end",
    position: "absolute",
    right: 25,
    top: 25,
    "&>button": {
      padding: 0,
      minWidth: "auto",
      "&>svg": {
        color: "white",
        cursor: "pointer",
        transition: ".3s",
        fontSize: "1.5rem",
        "&:hover": {
          color: "gray",
          transition: ".3s",
        },
      },
    },
  },

  confirmBut: {
    minWidth: 160,
    borderRadius: 8,
    background: "linear-gradient(317deg, rgb(51 135 55), rgb(98 231 149))",
    textDecoration: "none",
    fontFamily: "Philosopher",
    fontWeight: 900,
    marginTop: 16,
    textTransform: "none",
  },

  playerImg: {
    width: 50,
    cursor: "pointer",
    transition: "0.3s",

    "&:hover": {
      transform: "scale(1.1)",
      transition: "0.3s",
    },
  },

  drawBut: {
    textTransform: "none",
  },

  playerBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "end",
    gap: 16,

    "&>div": {
      display: "flex",
      flexDirection: "column",
      gap: 8,
      alignItems: "center",
    },
  },

  checkIcon: {
    width: 24,
    opacity: 0,
  },

  visible: {
    opacity: 1,
  },
}));

export default styles;
