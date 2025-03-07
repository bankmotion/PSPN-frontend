import { makeStyles } from "tss-react/mui";

const styles = makeStyles()((theme: any) => ({
  body: {
    position: "relative",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    userSelect: "none",
  },

  playerPanel: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    position: "relative",

    [theme.breakpoints.down("sm")]: {
      display: "flex",
    },
  },

  playerInfoPanel: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    zIndex: 10,

    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "1fr 1fr",
      gridTemplateRows: "auto auto",
      gap: 4,
    },
  },

  background: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 0,
  },

  bgImage: {
    filter: "blur(3px)",
    borderRadius: 30,
    width: "100%",
    height: "auto",
    // opacity: 0.5,
  },

  player1Img: {
    zIndex: 3,
    display: "flex",
    flexDirection: "column",
    justifyContent: "left",
    alignItems: "end",
    marginTop: 24,
    position: "relative",

    [theme.breakpoints.down("sm")]: {
      position: "absolute",
      left: 0,
      top: 0,
    },

    "&>img": {
      width: 300,
      transition: "0.3s",
      cursor: "pointer",

      [theme.breakpoints.down("sm")]: {
        width: 150,
        marginTop: 48,
      },

      "&:hover": {
        scale: 1.05,
        transition: "0.3s",
      },
    },
  },

  player2Img: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "left",
    alignItems: "start",
    zIndex: 3,
    marginTop: 24,
    position: "relative",

    [theme.breakpoints.down("sm")]: {
      position: "absolute",
      right: 0,
      top: 0,
    },

    "&>img": {
      width: 300,
      transition: "0.3s",
      cursor: "pointer",

      [theme.breakpoints.down("sm")]: {
        width: 150,
        marginTop: 48,
      },

      "&:hover": {
        scale: 1.05,
        transition: "0.3s",
      },
    },
  },

  player1PoolInfo: {
    position: "absolute",
    top: 0,
    left: 16,
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 36,
    fontWeight: "bold",

    [theme.breakpoints.down("sm")]: {
      fontSize: 20,
    },

    "& img": {
      width: 54,

      [theme.breakpoints.down("sm")]: {
        width: 32,
      },
    },
  },

  player2PoolInfo: {
    position: "absolute",
    top: 0,
    right: 16,
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 36,
    fontWeight: "bold",

    [theme.breakpoints.down("sm")]: {
      fontSize: 20,
    },

    "& img": {
      width: 54,

      [theme.breakpoints.down("sm")]: {
        width: 32,
      },
    },
  },

  bettingInfo: {
    zIndex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",

    [theme.breakpoints.down("sm")]: {
      zIndex: "auto",
      minHeight: 300,
    },
  },

  youtube: {
    display: "flex",
    position: "absolute",
    top: "65%",
    left: "calc(50% - 25px)",
    width: 50,
    opacity: 0.8,
    zIndex: 5,
    cursor: "pointer",
    scale: 1,
    transition: "0.3s",

    "&:hover": {
      scale: 1.1,
      transition: "0.3s",
    },
  },

  medal: {
    position: "absolute",
    width: 40,
    top: "50%",
    zIndex: 11,
  },

  player1Medal: {
    left: "calc(50% - 120px)",
  },

  player2Medal: {
    left: "calc(50% + 120px)",
  },

  cooldown: {
    fontSize: 40,
    marginTop: 40,
    display: "flex",
    alignItems: "center",
    gap: 4,
    textShadow:
      "1px 1px 0px #444, -1px -1px 0px #444, 1px -1px 0px #444, -1px 1px 0px #444",

    [theme.breakpoints.down("sm")]: {
      // marginTop: 0,
      fontSize: 20,
      zIndex: 10,
    },
  },

  playerInfo: {
    backgroundColor: "#16171cbb",
    padding: "16px 8px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 8,
    position: "relative",
    cursor: "pointer",

    [theme.breakpoints.down("sm")]: {
      "&:nth-of-type(1)": {
        gridColumn: "1 / 2",
      },
      "&:nth-of-type(2)": {
        gridColumn: "2 / 3",
      },
      gridRow: "1 / 2",
      padding: "16px 4px",
    },
  },

  playerName: {
    fontSize: 27,
    fontWeight: "bold",

    [theme.breakpoints.down("sm")]: {
      fontSize: 20,
      fontWeight: "normal",
    },
  },

  playerStat: {
    fontSize: 17,
    color: "gray",
  },

  vsIcon: {
    width: "130%",
    height: "auto",
    zIndex: 2,
    marginTop: -48,

    [theme.breakpoints.down("sm")]: {
      width: "70%",
      marginTop: -16,
    },
  },

  playTime: {
    fontSize: 15,
    color: "gray",
    textShadow:
      "1px 1px 0px #222, -1px -1px 0px #222, 1px -1px 0px #222, -1px 1px 0px #222",

    [theme.breakpoints.down("sm")]: {
      fontSize: 12,
    },
  },

  weight: {
    fontWeight: "bold",
    fontSize: 24,
    marginTop: -72,
    zIndex: 5,
    color: "rgb(151, 160, 216)",
    textShadow:
      "1px 1px 0px #000, -1px -1px 0px #000, 1px -1px 0px #000, -1px 1px 0px #000",

    [theme.breakpoints.down("sm")]: {
      fontSize: 17,
      zIndex: 10,
      marginTop: -24,
    },
  },

  ufcText: {
    color: "gray",
    fontSize: 24,
  },

  highBet: {
    color: "rgb(184, 160, 223)",
    textShadow:
      "1px 1px 0px #333, -1px -1px 0px #333, 1px -1px 0px #333, -1px 1px 0px #333",
  },

  lowBet: {
    color: "rgb(31, 167, 246)",
    textShadow:
      "1px 1px 0px #333, -1px -1px 0px #333, 1px -1px 0px #333, -1px 1px 0px #333",
  },

  oddsInfo: {
    display: "flex",
    justifyContent: "center",
    fontSize: 40,
    gap: 8,
    fontWeight: "bold",
    alignItems: "center",

    [theme.breakpoints.down("sm")]: {
      fontSize: 24,
      zIndex: 10,
    },
  },

  betArea: {
    backgroundColor: "#16171cbb",
    padding: "16px 8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    width: "80%",
    marginLeft: "10%",

    [theme.breakpoints.down("sm")]: {
      gridColumn: "1 / 3",
      gridRow: "2 / 3",
      marginLeft: 0,
      width: "auto",
    },

    "& input": {
      maxWidth: "90px",
      padding: 8,
      color: "white",
      border: "none",
      outline: "none",
      fontSize: 12,
    },

    "& fieldset": {
      border: "none",
    },

    "& button": {
      textTransform: "none",
      fontSize: 12,
      backgroundColor: "#494979",
      borderRadius: 16,
      fontFamily: "Poppins",
      minWidth: 150,
      color: "white",
      marginLeft: 12,
    },

    "& img": {
      width: 32,
    },
  },

  player1CheckIcon: {
    width: 48,
    position: "absolute",
    right: 12,
    bottom: 12,

    [theme.breakpoints.down("sm")]: {
      width: 32,
    },
  },

  player2CheckIcon: {
    width: 48,
    position: "absolute",
    left: 12,
    bottom: 12,

    [theme.breakpoints.down("sm")]: {
      width: 32,
    },
  },

  bettingListPanel: {
    zIndex: 10,
    display: "flex",
    marginTop: 8,
    justifyContent: "space-around",
    paddingBottom: 24,

    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      gap: 24,
    },
  },

  listPanelBody: {
    minWidth: 560,
    backgroundColor: "#16171cbb",
    padding: "18px 24px",
    borderRadius: 4,

    [theme.breakpoints.down("sm")]: {
      minWidth: "auto",
    },
  },

  listPanelHeader: {
    padding: "8px 8px",
    display: "flex",
    justifyContent: "space-between",

    "&>div": {
      display: "flex",
      alignItems: "center",
      gap: 4,
    },

    "& img": {
      width: 20,
    },
  },

  listPanelTable: {
    height: 320,
    overflowY: "auto",
  },

  listDetail: {
    borderBottom: "1px solid #292929",
    padding: "4px 0",
    display: "grid",
    gridTemplateColumns: "0.5fr 1.5fr 1fr 1.5fr 0.5fr",
    fontSize: 14,
    alignItems: "center",

    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "0.5fr 1.5fr 1fr 0.5fr",
    },

    "&>div:nth-of-type(4)": {
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },

    "&>div": {
      display: "flex",
      alignItems: "center",
      gap: 4,
    },

    "& img": {
      width: 20,
    },

    "& a": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },

  linkIcon: {
    borderRadius: "50%",
  },
}));

export default styles;
