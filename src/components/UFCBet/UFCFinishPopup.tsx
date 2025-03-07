import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Dialog, MenuItem, TextField } from "@mui/material";
import { useState } from "react";

import { useDispatch } from "react-redux";
import { UFCBetResult } from "../../enums/UFCBet";
import useWallet from "../../hook/useWallet";
import { UFCRound } from "../../interfaces/UFCBetType";
import { AppDispatch } from "../../redux/store";
import { finishRound, getRounds } from "../../redux/ufcSlice";
import useStyles from "./UFCFinishPopup.styles";
import { UFCMatches } from "../../constants/ufc";
import clsx from "clsx";
import { toast } from "react-toastify";

const UFCFinishPopup = ({
  openModal,
  setOpenModal,
  targetRound,
}: {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
  targetRound: UFCRound | undefined;
}) => {
  const { classes } = useStyles();

  const { account } = useWallet();
  const dispatch: AppDispatch = useDispatch();

  const [result, setResult] = useState<UFCBetResult | -1>(-1);

  const handleClickPlayer = (newResult: UFCBetResult) => {
    if (result === newResult) {
      setResult(-1);
      return;
    }
    setResult(newResult);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleFinishRound = () => {
    if (!targetRound || result === -1) {
      toast.error("Please select the result.");
      return;
    }

    dispatch(
      finishRound({
        roundId: targetRound.roundID,
        result: Number(result),
        account,
      })
    )
      .unwrap()
      .then(() => {
        dispatch(getRounds());
        setOpenModal(false);
      });
  };

  const matchInfo = UFCMatches.find(
    (match) => match.id === targetRound?.roundID
  );

  if (!targetRound || !matchInfo) return <></>;

  return (
    <Dialog open={openModal} onClose={handleClose} className={classes.body}>
      <Box className={classes.modalContent}>
        <Box className={classes.closeIconBody}>
          <Button onClick={handleClose}>
            <CloseIcon htmlColor="gray" />
          </Button>
        </Box>

        <Box className={classes.contentBody}>
          <Box className={classes.header}>Finish Round</Box>

          <Box className={classes.playerBox}>
            <Box>
              <Box
                className={classes.playerImg}
                component={"img"}
                src={`/assets/ufc/${matchInfo.matchId}/${matchInfo.player1.img}.png`}
                onClick={() => handleClickPlayer(UFCBetResult.Player1)}
              />
              <Box
                className={clsx(
                  classes.checkIcon,
                  result === UFCBetResult.Player1 ? classes.visible : null
                )}
                src="/assets/icons/check.png"
                component={"img"}
              />
            </Box>
            <Box>
              <Button
                variant="contained"
                className={classes.drawBut}
                onClick={() => handleClickPlayer(UFCBetResult.Draw)}
              >
                Draw
              </Button>
              <Box
                className={clsx(
                  classes.checkIcon,
                  result === UFCBetResult.Draw ? classes.visible : null
                )}
                src="/assets/icons/check.png"
                component={"img"}
              />
            </Box>
            <Box>
              <Box
                className={classes.playerImg}
                component={"img"}
                src={`/assets/ufc/${matchInfo.matchId}/${matchInfo.player2.img}.png`}
                onClick={() => handleClickPlayer(UFCBetResult.Player2)}
              />
              <Box
                className={clsx(
                  classes.checkIcon,
                  result === UFCBetResult.Player2 ? classes.visible : null
                )}
                src="/assets/icons/check.png"
                component={"img"}
              />
            </Box>
          </Box>

          <Button
            variant="contained"
            className={classes.confirmBut}
            onClick={handleFinishRound}
          >
            Confirm
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default UFCFinishPopup;
