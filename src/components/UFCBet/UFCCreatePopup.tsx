import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Dialog, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import useWallet from "../../hook/useWallet";
import { AppDispatch } from "../../redux/store";
import { createRound, getRounds } from "../../redux/ufcSlice";
import useStyles from "./UFCCreatePopup.styles";

const UFCCreatePopup = ({
  openModal,
  setOpenModal,
}: {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
}) => {
  const { classes } = useStyles();
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [closeAt, setCloseAt] = useState<dayjs.Dayjs | null>(dayjs());

  const { account } = useWallet();
  const dispatch: AppDispatch = useDispatch();

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleDateTimeChange = (newDateTime: dayjs.Dayjs | null) => {
    setCloseAt(newDateTime);
  };

  useEffect(() => {
    setPlayer1("");
    setPlayer2("");
    setCloseAt(dayjs());
  }, [openModal]);

  const handleCreateRound = () => {
    if (!player1 || !player2 || !closeAt || isNaN(Number(closeAt))) {
      toast.error("Fill in all fields.");
      return;
    }
    dispatch(
      createRound({
        player1,
        player2,
        closeAt: Math.floor(closeAt.valueOf() / 1000),
        account,
      })
    )
      .unwrap()
      .then(() => {
        setOpenModal(false);
        dispatch(getRounds());
        toast.success("Successfully created.");
      });
  };

  return (
    <Dialog open={openModal} onClose={handleClose} className={classes.body}>
      <Box className={classes.modalContent}>
        <Box className={classes.closeIconBody}>
          <Button onClick={handleClose}>
            <CloseIcon htmlColor="gray" />
          </Button>
        </Box>

        <Box className={classes.contentBody}>
          <Box className={classes.header}>Create Round</Box>
          <TextField
            value={player1}
            placeholder="Player1"
            onChange={(e) => setPlayer1(e.target.value)}
          />
          <TextField
            value={player2}
            placeholder="Player2"
            onChange={(e) => setPlayer2(e.target.value)}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileDateTimePicker
              sx={{
                "& .MuiInputBase-root": {
                  paddingRight: 0,
                },
              }}
              value={closeAt}
              onChange={handleDateTimeChange}
            />
          </LocalizationProvider>
          <Button
            variant="contained"
            className={classes.confirmBut}
            onClick={handleCreateRound}
          >
            Confirm
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default UFCCreatePopup;
