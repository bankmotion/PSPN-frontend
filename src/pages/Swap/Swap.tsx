import { Box, Typography } from "@mui/material";

import useStyles from "./index.styles";

const Swap = () => {
  const { classes } = useStyles();

  return (
    <Box>
      <Box className={classes.body}>
        <Typography variant="h5">Exchange</Typography>
      </Box>
    </Box>
  );
};

export default Swap;
