import { makeStyles } from "tss-react/mui";

const styles = makeStyles()((theme: any) => ({
  select: {
    color: "#fff",
    fontSize: "18px",
    background: "none",

    "& .MuiSelect-select": {
      display: "flex",
      gap: 8,
      alignItems: "center",
    },

    "& .MuiSelect-icon": {
      color: "#fff",
    },

    [theme.breakpoints.down("sm")]: {
      fontSize: 14,
    },
  },

  inputField: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#1a1a2e",
    border: "1px solid #333",
    borderRadius: "8px",
    padding: "8px 12px",
    gap: "8px",
    color: "white",
  },

  logo: {
    width: 36,
    height: 36,
    borderRadius: 36,

    [theme.breakpoints.down("sm")]: {
      width: 24,
      height: 24,
      borderRadius: 24,
    },
  },

  selectMenuItem: {
    display: "flex",
    gap: 8,
  },
}));

export default styles;
