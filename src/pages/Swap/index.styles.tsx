import { makeStyles } from "tss-react/mui";

const styles = makeStyles()((theme: any) => ({
  body: {
    display: "flex",
    justifyContent: "center",

    [theme.breakpoints.down("lg")]: {
      padding: "0",
    },
  },

  swapPanel: {
    minWidth: 400,
    display: "flex",
    gap: 40,

    [theme.breakpoints.down("lg")]: {
      minWidth: 360,
      borderRadius: 12,
      padding: "16px",
    },

    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      gap: 0,
    },

    [theme.breakpoints.down("sm")]: {
      minWidth: "auto",
      // overflowX: "auto",
      maxWidth: 220,
    },
  },

  swapIframe: {
    border: 0,
    margin: "0 auto",
    marginBottom: "0.5rem",
    display: "block",
    width: 500,
    height: 600,

    [theme.breakpoints.down("sm")]: {
      width: 400,
    },
  },
}));

export default styles;
