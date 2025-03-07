import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { UFCMatches } from "../../constants/ufc";
import { UFCBetResult, UFCRoundStatus } from "../../enums/UFCBet";
import useWallet from "../../hook/useWallet";
import { UFCBet } from "../../interfaces/UFCBetType";
import { AppDispatch, RootState } from "../../redux/store";
import {
  approveAction,
  enterRound,
  getCurrentRound,
} from "../../redux/ufcSlice";
import {
  formatNumberWithCommas,
  formatTimestamp,
  getLocalTimeFromTimestamp,
  getShortAddress,
  remainTime,
} from "../../utils";
import { getOdds } from "../../utils/ufcBet";
import useStyles from "./UFCBetting.styles";
import clsx from "clsx";

const BettingList = ({ items }: { items: UFCBet[] }) => {
  const { classes } = useStyles();
  const totalAmount = items.reduce((sum, item) => item.amount + sum, 0);

  return (
    <Box className={classes.listPanelBody}>
      <Box className={classes.listPanelHeader}>
        <Box>{items.length} Players</Box>
        <Box>
          <Box component={"span"}>Total:</Box>{" "}
          {formatNumberWithCommas(totalAmount)}{" "}
          <Box component={"img"} src={`/assets/tokens/ufc.png`} />
        </Box>
      </Box>
      <Box className={classes.listPanelTable}>
        {items.map((item, index) => (
          <Box className={classes.listDetail} key={index}>
            <Box>{index + 1}</Box>
            <Box>{getShortAddress(item.player)}</Box>
            <Box>
              {formatNumberWithCommas(item.amount)}{" "}
              <Box component={"img"} src={`/assets/tokens/ufc.png`} />
            </Box>
            <Box>{formatTimestamp(item.timestamp)}</Box>
            <Link to={`https://scan.pulsechain.com`} target={"blank"}>
              <Box
                component={"img"}
                src="/assets/tokens/pls.png"
                className={classes.linkIcon}
              />
            </Link>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

const UFCBetting = () => {
  const { classes } = useStyles();
  const { id } = useParams();
  const navigation = useNavigate();
  const { account, connectWallet } = useWallet();
  const { myUFCTokenBalance } = useSelector((state: RootState) => state.user);
  const dispatch: AppDispatch = useDispatch();

  const { currentRound } = useSelector((state: RootState) => state.ufc);

  const [matchInfo, setMatchInfo] = useState(
    UFCMatches.find((info) => info.id === Number(id))
  );
  const [betAmount, setBetAmount] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState<UFCBetResult>(
    UFCBetResult.Draw
  );
  const [curTime, setCurTime] = useState(new Date().getTime() / 1000);

  const handleClickPlayer = (selected: number) => {
    if (selected === selectedPlayer) {
      setSelectedPlayer(UFCBetResult.Draw);
      return;
    }
    setSelectedPlayer(selected);
  };

  const handleClickCreateBet = () => {
    if (!account) {
      connectWallet();
      return;
    }
    if (
      selectedPlayer !== UFCBetResult.Player1 &&
      selectedPlayer !== UFCBetResult.Player2
    ) {
      toast.info("Please select the player for creating bet");
      return;
    }
    if (isNaN(Number(betAmount)) || Number(betAmount) <= 0) {
      toast.error("Please input bet amount correctly.");
      return;
    }
    if (myUFCTokenBalance < Number(betAmount)) {
      toast.info("UFC balance is not enough");
      return;
    }

    dispatch(approveAction({ amount: Number(betAmount), account }))
      .unwrap()
      .then(() => {
        dispatch(
          enterRound({
            roundId: Number(id),
            amount: Number(betAmount),
            expectation: selectedPlayer,
            account,
          })
        )
          .unwrap()
          .then(() => {
            toast.success("Successfully entered.");
            dispatch(getCurrentRound({ roundId: Number(id) }));
            setBetAmount("");
          });
      });
  };

  useEffect(() => {
    if (!matchInfo) {
      navigation("/");
    }
  }, [matchInfo, navigation]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurTime(new Date().getTime() / 1000);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    dispatch(getCurrentRound({ roundId: Number(id) }));
  }, [dispatch, id]);

  if (!currentRound || !matchInfo) return <></>;

  return (
    <Box className={classes.body}>
      <Box className={classes.background}>
        <Box
          component="img"
          src={`/assets/main/detailbg${Number(id) % 8}.png`}
          className={classes.bgImage}
        />
      </Box>

      <Box className={classes.playerPanel}>
        <Box className={classes.player1Img}>
          <Box
            component={"img"}
            src={`/assets/ufc/${matchInfo.matchId}/${matchInfo.player1.img}.png`}
            onClick={() => handleClickPlayer(UFCBetResult.Player1)}
          />
          <Box className={classes.player1PoolInfo}>
            <Box component="img" src={`/assets/tokens/ufc.png`} />
            {formatNumberWithCommas(currentRound.player1TotalAmount || 0)}{" "}
            <Box className={classes.ufcText}>UFC</Box>
          </Box>
        </Box>

        <Box className={classes.bettingInfo}>
          {/* <Box
            className={classes.youtube}
            component={"img"}
            src="/assets/icons/youtube.png"
          /> */}

          {currentRound.status === UFCRoundStatus.Finished &&
            currentRound.result !== UFCBetResult.Draw && (
              <Box
                className={clsx(
                  classes.medal,
                  currentRound.result === UFCBetResult.Player1
                    ? classes.player1Medal
                    : currentRound.result === UFCBetResult.Player2
                    ? classes.player2Medal
                    : null
                )}
                component={"img"}
                src="/assets/icons/medal.png"
              />
            )}

          <Box className={classes.cooldown}>
            {currentRound.status === UFCRoundStatus.Started &&
            currentRound.closeAt > curTime ? (
              <>
                <Box sx={{ color: "#4fe34f" }}>Live</Box>-{" "}
                {remainTime((currentRound.closeAt || curTime) - curTime)}
              </>
            ) : currentRound.status === UFCRoundStatus.Closed ||
              currentRound.status === UFCRoundStatus.Finishing ||
              (currentRound.status === UFCRoundStatus.Started &&
                currentRound.closeAt <= curTime) ? (
              <Box sx={{ color: "yellow" }}>Waiting Result</Box>
            ) : currentRound.status === UFCRoundStatus.Finished ? (
              <Box sx={{ color: "white" }}>
                {currentRound.result === UFCBetResult.Draw ? (
                  <>
                    Completed -{" "}
                    <Box
                      component={"span"}
                      sx={{ color: "yellow", fontWeight: "bold" }}
                    >
                      Draw
                    </Box>
                  </>
                ) : (
                  "Completed"
                )}
              </Box>
            ) : (
              <></>
            )}
          </Box>
          <Box className={classes.playTime}>
            {getLocalTimeFromTimestamp(currentRound.closeAt || curTime)}
          </Box>
          <Box
            component={"img"}
            src="/assets/icons/vsicon.png"
            className={classes.vsIcon}
          />
          <Box className={classes.weight}>
            {matchInfo.weight}
            {matchInfo.eventType ? ` - ` : null}
            {matchInfo.eventType}
          </Box>
          <Box className={classes.oddsInfo}>
            <Box component="span" className={classes.highBet}>
              {getOdds(
                currentRound.player1TotalAmount,
                currentRound.player2TotalAmount
              )}
            </Box>{" "}
            :{" "}
            <Box component="span" className={classes.lowBet}>
              {getOdds(
                currentRound.player2TotalAmount,
                currentRound.player1TotalAmount
              )}
            </Box>
          </Box>
        </Box>

        <Box className={classes.player2Img}>
          <Box
            component={"img"}
            src={`/assets/ufc/${matchInfo.matchId}/${matchInfo.player2.img}.png`}
            onClick={() => handleClickPlayer(UFCBetResult.Player2)}
          />
          <Box className={classes.player2PoolInfo}>
            <Box component="img" src={`/assets/tokens/ufc.png`} />
            {formatNumberWithCommas(currentRound.player2TotalAmount)}{" "}
            <Box className={classes.ufcText}>UFC</Box>
          </Box>
        </Box>
      </Box>

      <Box className={classes.playerInfoPanel}>
        <Box
          className={classes.playerInfo}
          onClick={() => handleClickPlayer(UFCBetResult.Player1)}
        >
          <Box className={classes.playerName}>{currentRound.player1Name}</Box>
          <Box className={classes.playerStat}>({matchInfo.player1.stat})</Box>
          {selectedPlayer === UFCBetResult.Player1 && (
            <Box
              className={classes.player1CheckIcon}
              component={"img"}
              src={`/assets/icons/check.png`}
            />
          )}
        </Box>
        <Box className={classes.betArea}>
          <Box component={"img"} src={`/assets/tokens/ufc.png`} />
          <TextField
            value={betAmount}
            placeholder="Input the amounts"
            onChange={(e) => setBetAmount(e.target.value)}
          />
          <Button
            onClick={handleClickCreateBet}
            disabled={currentRound.status !== UFCRoundStatus.Started}
          >
            Create a bet
          </Button>
        </Box>
        <Box
          className={classes.playerInfo}
          onClick={() => handleClickPlayer(UFCBetResult.Player2)}
        >
          <Box className={classes.playerName}>{currentRound.player2Name}</Box>
          <Box className={classes.playerStat}>({matchInfo.player2.stat})</Box>
          {selectedPlayer === UFCBetResult.Player2 && (
            <Box
              className={classes.player2CheckIcon}
              component={"img"}
              src={`/assets/icons/check.png`}
            />
          )}
        </Box>
      </Box>

      <Box className={classes.bettingListPanel}>
        <BettingList items={currentRound.player1Bets} />
        <BettingList items={currentRound.player2Bets} />
      </Box>
    </Box>
  );
};

export default UFCBetting;
