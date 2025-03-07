import { makeStyles } from "tss-react/mui";

const styles = makeStyles()((theme: any) => ({
  body: {
    display: "flex",
    flexDirection: "column",
  },

  buttonGroup: {
    display: "flex",
    justifyContent: "end",
  },

  panelBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 16,

    [theme.breakpoints.down("xl")]: {
      gap: 8,
    },
  },

  panel: {
    display: "grid",
    height: 150,
    backgroundColor: "#00000077",
    borderRadius: 12,
    minWidth: 1180,
    gridTemplateColumns: "1fr 6fr 1fr",
    padding: "8px 32px",
    border: "3px solid rgb(24, 24, 24)",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
    cursor: "pointer",
    userSelect: "none",
    transition: "0.3s",
    position: "relative",

    [theme.breakpoints.down("xl")]: {
      height: 120,
      minWidth: 800,
    },

    [theme.breakpoints.down("md")]: {
      height: 90,
      minWidth: 500,
      padding: "8px 12px",
    },

    "&:hover": {
      backgroundColor: "#000000aa",
      transition: "0.3s",
      boxShadow: "0px 6px 10px rgba(0, 0, 0, 1)",
      border: "3px solid rgb(44, 44, 44)",
    },
  },

  playerImg: {
    height: 150,

    [theme.breakpoints.down("xl")]: {
      height: 120,
    },

    [theme.breakpoints.down("md")]: {
      height: 90,
    },
  },

  rightImgBox: {
    display: "flex",
    justifyContent: "right",
  },

  leftImgBox: {
    display: "flex",
    justifyContent: "left",
  },

  centerPart: {
    display: "flex",
    flexDirection: "column",
    padding: "0 16px",

    [theme.breakpoints.down("md")]: {
      // padding: "0 4px",
    },

    "&>div:nth-of-type(1)": {
      height: 50,
      borderBottom: "1px solid #343232",
      display: "grid",
      alignItems: "center",
      gridTemplateColumns: "1fr 0.7fr 1fr",
      gap: 80,

      [theme.breakpoints.down("xl")]: {
        height: 40,
      },

      [theme.breakpoints.down("lg")]: {
        gap: 30,
      },

      [theme.breakpoints.down("md")]: {
        height: 30,
        gap: 12,
      },

      "&>div": {
        display: "flex",
        justifyContent: "center",

        [theme.breakpoints.down("xl")]: {
          fontSize: 13,
        },

        [theme.breakpoints.down("lg")]: {
          fontSize: 12,
        },

        [theme.breakpoints.down("md")]: {
          fontSize: 10,
        },
      },

      "&>div:nth-of-type(2)": {
        fontSize: 28,
        fontWeight: "bold",

        [theme.breakpoints.down("xl")]: {
          fontSize: 24,
        },

        [theme.breakpoints.down("lg")]: {
          fontSize: 20,
        },

        [theme.breakpoints.down("md")]: {
          fontSize: 16,
        },
      },
    },

    "&>div:nth-of-type(2)": {
      height: 100,
      display: "grid",
      alignItems: "center",
      gridTemplateColumns: "1fr 0.7fr 1fr",
      gap: 80,

      [theme.breakpoints.down("xl")]: {
        height: 80,
      },

      [theme.breakpoints.down("lg")]: {
        gap: 30,
      },

      [theme.breakpoints.down("md")]: {
        height: 60,
        gap: 12,
      },

      "&>div": {
        display: "flex",
        justifyContent: "center",
      },

      "& button": {
        textTransform: "none",
        backgroundColor: "#ffffff12",
      },
    },
  },

  medalIcon: {
    position: "absolute",
    width: 32,

    [theme.breakpoints.down("sm")]: {
      width: "32px!important",
    },
  },

  playerName: {
    fontSize: 24,
    fontWeight: "bold",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    [theme.breakpoints.down("xl")]: {
      fontSize: 20,
    },

    [theme.breakpoints.down("lg")]: {
      fontSize: 18,
    },

    [theme.breakpoints.down("md")]: {
      fontSize: 14,
    },

    "&>div:nth-of-type(2)": {
      fontSize: 17,
      color: "gray",

      [theme.breakpoints.down("xl")]: {
        fontSize: 15,
      },

      [theme.breakpoints.down("lg")]: {
        fontSize: 13,
      },

      [theme.breakpoints.down("md")]: {
        fontSize: 11,
      },
    },
  },

  ufcTokenLogo: {
    width: 32,

    [theme.breakpoints.down("xl")]: {
      width: 28,
    },

    [theme.breakpoints.down("md")]: {
      width: 20,
    },
  },

  poolsBox: {
    display: "flex",
    gap: 4,
    alignItems: "center",
  },

  highBet: {
    color: "rgb(184, 160, 223)",
  },

  lowBet: {
    color: "rgb(31, 167, 246)",
  },

  oddPart: {
    display: "flex",
    justifyContent: "center",
    gap: 8,
  },

  grayColor: {
    color: "gray",
    fontWeight: "bold",
  },

  vsBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
    position: "relative",

    "&>div:nth-of-type(1)": {
      fontSize: 12,
      color: "rgb(151, 160, 216)",

      [theme.breakpoints.down("xl")]: {
        fontSize: 10,
      },

      [theme.breakpoints.down("md")]: {
        fontSize: 8,
      },
    },

    "&>div:nth-of-type(3)": {
      fontSize: 12,
      color: "gray",

      [theme.breakpoints.down("xl")]: {
        fontSize: 10,
      },

      [theme.breakpoints.down("md")]: {
        fontSize: 8,
      },
    },
  },

  vsMainBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontSize: 20,
    fontWeight: "bold",
    textShadow:
      "rgb(250, 5, 161) 0px 0px 20px, rgb(250, 5, 161) 0px 0px 40px, rgb(250, 5, 161) 0px 0px 60px, rgb(250, 5, 161) 0px 0px 80px, rgb(250, 5, 161) 0px 0px 100px",
    filter: "drop-shadow(rgb(250, 5, 161) 0px 0px 100px)",
    position: "relative",

    [theme.breakpoints.down("xl")]: {
      fontSize: 16,
    },

    "& img": {
      width: 200,
      height: 2,

      [theme.breakpoints.down("md")]: {
        width: 100,
      },
    },
  },

  mobilePanel: {
    boxSizing: "border-box",
    backgroundColor: "#00000077",
    borderRadius: 12,
    padding: "8px 16px",
    border: "3px solid rgb(24, 24, 24)",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
    cursor: "pointer",
    userSelect: "none",
    transition: "0.3s",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 8,
    position: "relative",

    "&:hover": {
      backgroundColor: "#000000aa",
      transition: "0.3s",
      boxShadow: "0px 6px 10px rgba(0, 0, 0, 1)",
      border: "3px solid rgb(44, 44, 44)",
    },
  },

  leftWinnerBelt: {
    position: "absolute",
    width: 180,
    top: 0,
    left: -40,
    transform: "rotate(90deg)",
  },

  moPanelTop: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 12,
    borderBottom: "1px solid rgb(24, 24, 24)",
    paddingBottom: 8,
  },

  moPanelImg: {
    paddingTop: 8,
    display: "flex",
    gap: 8,

    "& img": {
      width: 70,
    },
  },

  panelCenterBox: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    fontSize: 12,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    position: "relative",

    "&>div:nth-of-type(1)": {
      fontSize: 17,
      fontWeight: "bold",
    },

    "&>div:nth-of-type(2)": {
      color: "rgb(151, 160, 216)",
      fontSize: 10,
    },

    "&>div:nth-of-type(4)": {
      color: "gray",
    },
  },

  moPlayer1ImgBox: {
    display: "flex",
    flexDirection: "column",
  },

  moPlayer2ImgBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "end",
  },

  moPlayerNameBox: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",

    "&>div>div:nth-of-type(1)": {
      fontWeight: "bold",
    },

    "&>div>div:nth-of-type(2)": {
      fontSize: 12,
      color: "gray",
    },

    "&>div": {
      display: "flex",
      flexDirection: "column",
    },

    "&>div:nth-of-type(2)": {
      alignItems: "end",
    },
  },

  adminBtn: {
    fontSize: 14,
    textTransform: "none",
    padding: "4px",
  },
}));

export default styles;
