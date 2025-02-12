import { makeStyles } from "tss-react/mui";

const styles = makeStyles()((theme: any) => ({
  body: {
    display: "flex",
    justifyContent: "center",
    padding: "32px 0",

    [theme.breakpoints.down("lg")]: {
      padding: "0",
    },
  },

  swapPanel: {
    minWidth: 400,
    backgroundColor: "#151823",
    border: "3px solid #292a34",
    borderRadius: 16,
    padding: "32px 16px",

    [theme.breakpoints.down("lg")]: {
      minWidth: 360,
      borderRadius: 12,
      padding: "16px",
    },

    [theme.breakpoints.down("sm")]: {
      minWidth: "auto",
    },
  },
}));

export default styles;
