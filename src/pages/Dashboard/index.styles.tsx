import { makeStyles } from "tss-react/mui";

const styles = makeStyles()((theme: any) => ({
  body: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    fontFamily: "philosopher",
    justifyContent: "center",
    height: "100%",
    gap: 64,
  },

  title: {
    maxWidth: 1000,
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "philosopher",
    filter: "brightness(1.5) drop-shadow(0px 0px 6px #b5b5b5)",
    marginTop: -56,
  },

  panelBox: {
    display: "flex",
    gap: 24,
    width: "100%",
    justifyContent: "center",
  },

  panel: {
    maxWidth: 360,
    minWidth: 300,
    height: 120,
    border: "3px solid #292a34",
    borderRadius: 16,
    padding: "24px 16px",
    display: "flex",
    flexDirection: "column",
    gap: 24,
    position: "relative",
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
    fontSize: 20,
    display: "flex",
    gap: 8,
    alignItems: "center",

    "& svg": {
      fontSize: 28,
    },
  },

  valuePart: {
    fontSize: 32,
    fontWeight: "bold",
    marginLeft: 16,

    "& span": {
      color: "#666873",
    },
  },

  buttonBox: {},

  yieldClaimBtn: {
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

    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)",
    },

    "&:active": {
      transform: "translateY(1px)",
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
    },
  },
}));

export default styles;
