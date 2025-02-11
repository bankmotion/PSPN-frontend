import { makeStyles } from "tss-react/mui";

const styles = makeStyles()((theme: any) => ({
  body: {
    fontFamily: "philosopher",
    display: "flex",
    justifyContent: "center",
    padding: "32px 0",

    "& *": {
      fontFamily: "philosopher",
    },
  },

  swapPanel: {
    minWidth: 400,
    backgroundColor: "#151823",
    border: "3px solid #292a34",
    borderRadius: 16,
    padding: "32px 16px",
  },
}));

export default styles;
