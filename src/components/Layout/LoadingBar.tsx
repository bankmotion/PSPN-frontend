import { Box, CircularProgress } from "@mui/material";
import { useStyles } from "./LoadingBar.styles";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import clsx from "clsx";

const LoadingBar = () => {
  const { classes } = useStyles();

  const { loadingClaimYield } = useSelector((state: RootState) => state.user);

  const { loadingInternalSwap } = useSelector((state: RootState) => state.swap);

  const { loadingCreate, loadingAdmin, loadingGetRounds, loadingApprove } =
    useSelector((state: RootState) => state.ufc);

  const isLoading =
    loadingClaimYield ||
    loadingInternalSwap ||
    loadingCreate ||
    loadingAdmin ||
    loadingGetRounds ||
    loadingApprove;

  return (
    <Box
      className={clsx(
        classes.body,
        isLoading ? classes.visible : classes.unvisible
      )}
    >
      <CircularProgress className={classes.loadingIcon} />
      <Box className={classes.loadingText}>{isLoading}</Box>
    </Box>
  );
};

export default LoadingBar;
