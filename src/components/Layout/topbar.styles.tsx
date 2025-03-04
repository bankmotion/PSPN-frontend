import { makeStyles } from "tss-react/mui";

const styles = makeStyles()((theme: any) => ({
  body: {
    position: "fixed",
    height: 100,
    top: 0,
    backgroundColor: "#05051d",
    width: "100%",
    backdropFilter: "blur(20px)",
    display: "flex",
    justifyContent: "center",
    borderBottom: "3px solid rgb(33, 35, 46)",
    fontFamily: "Poppins",

    [theme.breakpoints.down("xl")]: {
      height: 80,
    },

    [theme.breakpoints.down("lg")]: {
      height: 60,
    },
  },

  container: {
    maxWidth: "95%",
    display: "flex",
    width: "100%",
    gap: 32,

    [theme.breakpoints.down("md")]: {
      gap: 8,
    },

    [theme.breakpoints.down("sm")]: {
      display: "grid",
      justifyContent: "center",
      position: "relative",
      gridTemplateColumns: "1fr 1fr 1fr",
    },
  },

  menuIcon: {
    display: "none",

    [theme.breakpoints.down("sm")]: {
      display: "flex",
      justifyContent: "left",
      alignItems: "center",
    },
  },

  logoPart: {
    maxWidth: 200,

    [theme.breakpoints.down("md")]: {
      marginLeft: -16,
    },

    "& img": {
      height: 100,

      [theme.breakpoints.down("xl")]: {
        height: 80,
      },

      [theme.breakpoints.down("lg")]: {
        height: 60,
      },
    },
  },

  walletConnection: {
    display: "none",

    [theme.breakpoints.down("sm")]: {
      display: "flex",
      justifyContent: "right",
      alignItems: "center",
    },
  },

  menuBar: {
    display: "flex",
    alignItems: "center",
    width: "100%",

    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },

  mainMenuBar: {
    display: "flex",
    justifyContent: "left",
    width: "100%",
    gap: 24,
    textTransform: "none",

    [theme.breakpoints.down("md")]: {
      gap: 12,
      marginLeft: -16,
    },

    "& a": {
      textDecoration: "none",
      color: "#bdbcbc",
      fontSize: 20,
      fontWeight: "bold",
      transition: ".3s",
      display: "flex",
      alignItems: "center",
      gap: 4,

      [theme.breakpoints.down("xl")]: {
        fontSize: 17,
      },

      [theme.breakpoints.down("lg")]: {
        fontSize: 14,
      },

      [theme.breakpoints.down("md")]: {
        fontSize: 12,
      },

      "&:hover": {
        transition: ".3s",
        color: "white",
      },

      "& img": {
        width: 28,

        [theme.breakpoints.down("xl")]: {
          width: 22,
        },

        [theme.breakpoints.down("lg")]: {
          width: 16,
        },

        [theme.breakpoints.down("md")]: {
          width: 12,
        },
      },
    },
  },

  menuRightPart: {
    display: "flex",
    gap: 18,

    [theme.breakpoints.down("md")]: {
      gap: 8,
    },

    [theme.breakpoints.down("sm")]: {
      display: "none",
    },

    "& button": {
      textTransform: "none",
      fontSize: 18,
      backgroundColor: "#494979",
      borderRadius: 16,
      fontFamily: "Poppins",
      minWidth: 200,

      [theme.breakpoints.down("xl")]: {
        fontSize: 13,
        minWidth: 160,
      },

      [theme.breakpoints.down("lg")]: {
        fontSize: 12,
        minWidth: 120,
      },

      [theme.breakpoints.down("md")]: {
        fontSize: 10,
        minWidth: 70,
      },
    },
  },

  focused: {
    color: "white!important",
  },

  tokenBalance: {
    display: "flex",
    gap: 4,
    alignItems: "center",

    [theme.breakpoints.down("xl")]: {
      fontSize: 14,
    },

    [theme.breakpoints.down("lg")]: {
      fontSize: 12,
    },

    [theme.breakpoints.down("md")]: {
      fontSize: 10,
    },

    "& img": {
      width: 36,

      [theme.breakpoints.down("xl")]: {
        width: 28,
      },

      [theme.breakpoints.down("lg")]: {
        width: 24,
      },
    },
  },
}));

export default styles;
