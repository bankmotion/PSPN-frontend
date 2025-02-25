import { makeStyles } from "tss-react/mui";

const styles = makeStyles()((theme: any) => ({
  body: {
    background: "url(/assets/main/background.png) no-repeat",
    backgroundSize: "cover",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    boxSizing: "border-box",
    color: "white",
    fontFamily: "Poppins",

    "& *": {
      fontFamily: "Poppins",
    },

    [theme.breakpoints.down("sm")]: {
      padding: "0",
    },
  },

  layout: {
    width: "100%",
    padding: "16px",
    overflowY: "auto",
    marginTop: 100,
    maxWidth: 1920,
    // margin: "16px 0",

    [theme.breakpoints.down("xl")]: {
      marginTop: 80,
    },

    [theme.breakpoints.down("lg")]: {
      marginTop: 60,
    },

    [theme.breakpoints.down("sm")]: {
      padding: "8px",
    },
  },
}));

export default styles;
