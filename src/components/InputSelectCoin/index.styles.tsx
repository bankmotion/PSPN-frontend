import { makeStyles } from "tss-react/mui";

const styles = makeStyles()((theme: any) => ({
  select: {
    color: "#fff",
    fontSize: "1.2rem",
    background: "none",

    "& .MuiSelect-select": {
      display: "flex",
      gap: 8,
      alignItems: "center",
    },

    "& .MuiSelect-icon": {
      color: "#fff",
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
  },

  selectMenuItem: {
    display: "flex",
    gap: 8,
  },
}));

export default styles;
