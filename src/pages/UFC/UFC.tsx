import { Box, Button } from "@mui/material";
import isMobile from "is-mobile";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CircleBox from "../../components/CircleStatusBox/CircleBox";
import UFCCreatePopup from "../../components/UFCBet/UFCCreatePopup";
import UFCFinishPopup from "../../components/UFCBet/UFCFinishPopup";
import { UFCMatches } from "../../constants/ufc";
import { UFCBetResult, UFCRoundStatus } from "../../enums/UFCBet";
import useWallet from "../../hook/useWallet";
import { UFCRound } from "../../interfaces/UFCBetType";
import { AppDispatch, RootState } from "../../redux/store";
import { getIsAdmin, getRounds, setIsAdmin } from "../../redux/ufcSlice";
import {
  formatNumberWithCommas,
  getLocalTimeFromTimestamp,
  remainTime,
} from "../../utils";
import { getOdds } from "../../utils/ufcBet";
import useStyles from "./ufc.styles";
import { toast } from "react-toastify";

const BettingStatus = ({
  match,
  curTime,
  setOpenFinishModal,
}: {
  match: UFCRound;
  curTime: number;
  setOpenFinishModal: (open: boolean, roundId: number) => void;
}) => {
  const { classes } = useStyles();
  const { isAdmin } = useSelector((state: RootState) => state.ufc);

  const handleFinishRound = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenFinishModal(true, match.roundID);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
      }}
    >
      {match.status === UFCRoundStatus.Started && match.closeAt > curTime ? (
        <>
          <CircleBox width={10} color={"#4fe34f"} />
          <Box sx={{ color: "#4fe34f" }}>Live</Box>-{" "}
          {remainTime(match.closeAt - curTime)}
        </>
      ) : match.status === UFCRoundStatus.Finishing ||
        match.status === UFCRoundStatus.Closed ||
        (match.status === UFCRoundStatus.Started &&
          match.closeAt <= curTime) ? (
        <>
          <CircleBox width={10} color={"yellow"} shadow={false} />
          <Box sx={{ color: "yellow" }}>Waiting Result</Box>
          {isAdmin && (
            <Button
              variant="contained"
              className={classes.adminBtn}
              onClick={handleFinishRound}
            >
              Finish
            </Button>
          )}
        </>
      ) : match.status === UFCRoundStatus.Finished ? (
        <Box sx={{ color: "white" }}>
          Completed
          {match.status === UFCRoundStatus.Finished &&
          match.result === UFCBetResult.Draw ? (
            <>
              {" "}
              -{" "}
              <Box
                component="span"
                sx={{ color: "yellow", fontWeight: "bold" }}
              >
                Draw
              </Box>
            </>
          ) : (
            ""
          )}
        </Box>
      ) : (
        <></>
      )}
    </Box>
  );
};

const PanelOnDesktop = React.memo(
  ({
    match,
    handleClickPanel,
    curTime,
    setOpenFinishModal,
  }: {
    match: UFCRound;
    handleClickPanel: (roundId: number) => void;
    curTime: number;
    setOpenFinishModal: (open: boolean, roundId: number) => void;
  }) => {
    const { classes } = useStyles();
    const info = UFCMatches.find((item) => item.id === match.roundID);
    if (!info) return <></>;

    return (
      <Box
        className={classes.panel}
        onClick={() => handleClickPanel(match.roundID)}
      >
        <Box className={classes.leftImgBox}>
          <Box
            component={"img"}
            className={classes.playerImg}
            src={`/assets/ufc/${info.matchId}/${info.player1.img}.png`}
          />
        </Box>
        <Box className={classes.centerPart}>
          <Box>
            <BettingStatus
              match={match}
              curTime={curTime}
              setOpenFinishModal={setOpenFinishModal}
            />
            <Box className={classes.oddPart}>
              <Box component="span" className={classes.highBet}>
                {getOdds(match.player1TotalAmount, match.player2TotalAmount)}
              </Box>{" "}
              :{" "}
              <Box component="span" className={classes.lowBet}>
                {getOdds(match.player2TotalAmount, match.player1TotalAmount)}
              </Box>
            </Box>
            <Box className={classes.poolsBox}>
              Total Pools:{" "}
              <Box
                component={"img"}
                className={classes.ufcTokenLogo}
                src="/assets/tokens/ufc.png"
              />
              {formatNumberWithCommas(
                match.player1TotalAmount + match.player2TotalAmount
              )}{" "}
              <Box component="span" className={classes.grayColor}>
                UFC
              </Box>
            </Box>
          </Box>
          <Box>
            <Box className={classes.playerName}>
              <Box>{match.player1Name}</Box>
              <Box>({info.player1.stat})</Box>
            </Box>
            <Box className={classes.vsBox}>
              {match.status === UFCRoundStatus.Finished &&
                match.result !== UFCBetResult.Draw && (
                  <Box
                    component={"img"}
                    src="/assets/icons/medal.png"
                    className={classes.medalIcon}
                    sx={{
                      left:
                        match.result === UFCBetResult.Player1 ? -12 : "auto",
                      right:
                        match.result === UFCBetResult.Player2 ? -12 : "auto",
                    }}
                  />
                )}
              <Box>
                {info.weight}
                {info.eventType ? ` - ` : null}
                {info.eventType}
              </Box>
              <Box className={classes.vsMainBox}>
                <Box component={"img"} src="/assets/icons/vs.png" />
                <Box>VS</Box>
                <Box component={"img"} src="/assets/icons/vs.png" />
              </Box>
              <Box>{getLocalTimeFromTimestamp(match.closeAt)}</Box>
            </Box>
            <Box className={classes.playerName}>
              <Box>{match.player2Name}</Box>
              <Box>({info.player2.stat})</Box>
            </Box>
          </Box>
        </Box>
        <Box className={classes.rightImgBox}>
          <Box
            component={"img"}
            className={classes.playerImg}
            src={`/assets/ufc/${info.matchId}/${info.player2.img}.png`}
          />
        </Box>
      </Box>
    );
  }
);

const PanelOnMobile = React.memo(
  ({
    match,
    handleClickPanel,
    curTime,
    setOpenFinishModal,
  }: {
    match: UFCRound;
    handleClickPanel: (roundId: number) => void;
    curTime: number;
    setOpenFinishModal: (open: boolean, roundId: number) => void;
  }) => {
    const { classes } = useStyles();
    const info = UFCMatches.find((item) => item.id === match.roundID);
    if (!info) return <></>;

    return (
      <Box
        className={classes.mobilePanel}
        onClick={() => handleClickPanel(match.roundID)}
      >
        <Box className={classes.moPanelTop}>
          <BettingStatus
            match={match}
            curTime={curTime}
            setOpenFinishModal={setOpenFinishModal}
          />
          <Box className={classes.poolsBox}>
            Pool:{" "}
            <Box
              component={"img"}
              className={classes.ufcTokenLogo}
              src="/assets/tokens/ufc.png"
            />
            {formatNumberWithCommas(
              match.player1TotalAmount + match.player2TotalAmount
            )}{" "}
            <Box component="span" className={classes.grayColor}>
              UFC
            </Box>
          </Box>
        </Box>
        <Box className={classes.moPanelImg}>
          <Box className={classes.moPlayer1ImgBox}>
            <Box
              component="img"
              src={`assets/ufc/${info.matchId}/${info.player1.img}.png`}
            />
          </Box>
          <Box className={classes.panelCenterBox}>
            {match.status === UFCRoundStatus.Finished &&
              match.result !== UFCBetResult.Draw && (
                <Box
                  component={"img"}
                  src="/assets/icons/medal.png"
                  className={classes.medalIcon}
                  sx={{
                    left: match.result === UFCBetResult.Player1 ? -12 : "auto",
                    right: match.result === UFCBetResult.Player2 ? -12 : "auto",
                  }}
                />
              )}
            <Box className={classes.oddPart}>
              <Box component="span" className={classes.highBet}>
                {getOdds(match.player1TotalAmount, match.player2TotalAmount)}
              </Box>{" "}
              :{" "}
              <Box component="span" className={classes.lowBet}>
                {getOdds(match.player2TotalAmount, match.player1TotalAmount)}
              </Box>
            </Box>
            <Box>
              {info.weight}
              {info.eventType ? ` - ` : null}
              {info.eventType}
            </Box>
            <Box className={classes.vsMainBox}>
              <Box component={"img"} src="/assets/icons/vs.png" />
              <Box>VS</Box>
              <Box component={"img"} src="/assets/icons/vs.png" />
            </Box>
            <Box>{getLocalTimeFromTimestamp(match.closeAt)}</Box>
          </Box>
          <Box className={classes.moPlayer2ImgBox}>
            <Box
              component="img"
              src={`assets/ufc/${info.matchId}/${info.player2.img}.png`}
            />
          </Box>
        </Box>
        <Box className={classes.moPlayerNameBox}>
          <Box>
            <Box>{match.player1Name}</Box>
            <Box>({info.player1.stat})</Box>
          </Box>
          <Box>
            <Box>{match.player2Name}</Box>
            <Box>({info.player2.stat})</Box>
          </Box>
        </Box>
      </Box>
    );
  }
);

const UFC = () => {
  const { classes } = useStyles();
  const navigation = useNavigate();
  const { account } = useWallet();
  const [curTime, setCurTime] = useState(new Date().getTime() / 1000);
  const dispatch: AppDispatch = useDispatch();

  const { isAdmin, ufcRounds } = useSelector((state: RootState) => state.ufc);

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openFinishModal, setOpenFinishModal] = useState(false);
  const [targetId, setTargetId] = useState(-1);

  const handleOpenFinishModal = (openStatus: boolean, roundId: number) => {
    setOpenFinishModal(openStatus);
    setTargetId(roundId);
  };

  const handleOpenCreateModal = () => {
    if (ufcRounds[ufcRounds.length - 1].status !== UFCRoundStatus.Finished) {
      toast.error("Please finish the current round to create a new round.");
      return;
    }

    setOpenCreateModal(true);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurTime(new Date().getTime() / 1000);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!account) {
      dispatch(setIsAdmin());
      return;
    }
    dispatch(getIsAdmin({ account }));
  }, [account, dispatch]);

  useEffect(() => {
    dispatch(getRounds());
  }, [dispatch]);

  const handleClickPanel = (id: number) => {
    navigation(`/ufc/${id}`);
  };

  return (
    <Box className={classes.body}>
      {isAdmin && (
        <Box className={classes.buttonGroup}>
          <Button
            variant="contained"
            className={classes.adminBtn}
            onClick={handleOpenCreateModal}
          >
            Create
          </Button>
        </Box>
      )}

      <Box className={classes.panelBox}>
        {ufcRounds
          .slice()
          .reverse()
          .map((match, index) =>
            isMobile() ? (
              <PanelOnMobile
                match={match}
                key={index}
                handleClickPanel={handleClickPanel}
                curTime={curTime}
                setOpenFinishModal={handleOpenFinishModal}
              />
            ) : (
              <PanelOnDesktop
                match={match}
                key={index}
                handleClickPanel={handleClickPanel}
                curTime={curTime}
                setOpenFinishModal={handleOpenFinishModal}
              />
            )
          )}
      </Box>

      <UFCCreatePopup
        openModal={openCreateModal}
        setOpenModal={setOpenCreateModal}
      />

      <UFCFinishPopup
        openModal={openFinishModal}
        setOpenModal={setOpenFinishModal}
        targetRound={ufcRounds.find((round) => round.roundID === targetId)}
      />
    </Box>
  );
};

export default UFC;
