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
    marginBottom: 12,

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
      padding: "0 8px",
      gap: 32,
    },
  },

  iframeBox: {
    width: 500,
    height: 800,

    [theme.breakpoints.down("sm")]: {
      width: "100%",
      height: 380,
      overflowY: "auto",
      paddingRight: 4,
    },
  },

  swapIframe: {
    border: 0,
    margin: "0 auto",
    marginBottom: "0.5rem",
    display: "block",
    width: 500,
    height: 800,

    [theme.breakpoints.down("sm")]: {
      width: "100%",
      height: 600,
    },
  },
}));

export default styles;
