import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((theme: any) => ({
  body: {
    position: "fixed",
    left: 0,
    right: 0,
    width: "100vw",
    height: "100vh",
    background: "#000000bb",
    zIndex: 10000,
    flexDirection: "column",
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  visible: {
    display: "flex",
  },

  unvisible: {
    display: "none",
  },

  loadingIcon: {
    fontSize: 30,
    color: "white",
  },

  loadingText: {
    fontSize: 14,
  },
}));
