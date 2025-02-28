import { Box, Button, TextField } from "@mui/material";
import useStyles from "./UFCBetting.styles";
import { useNavigate, useParams } from "react-router-dom";
import { UFCMatches } from "../../constants/ufc";
import { useEffect, useState } from "react";
import {
  formatNumberWithCommas,
  getPSTTimeFromTimestamp,
  getShortAddress,
} from "../../utils";
import { toast } from "react-toastify";
import useWallet from "../../hook/useWallet";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const BettingList = () => {
  const { classes } = useStyles();
  const { account } = useWallet();

  return (
    <Box className={classes.listPanelBody}>
      <Box className={classes.listPanelHeader}>
        <Box>14 Players</Box>
        <Box>
          <Box component={"span"}>Total:</Box> {formatNumberWithCommas(3425323)}{" "}
          <Box component={"span"}>UFC</Box>
        </Box>
      </Box>
      <Box className={classes.listPanelTable}>
        {new Array(20).fill(1).map((_, index) => (
          <Box className={classes.listDetail}>
            <Box>{index + 1}</Box>
            <Box>{getShortAddress(account)}</Box>
            <Box>
              {formatNumberWithCommas(3425323)}{" "}
              <Box component={"span"}>UFC</Box>
            </Box>
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

  const [matchInfo, setMatchInfo] = useState(
    UFCMatches.find((info) => info.id === Number(id))
  );
  const [betAmount, setBetAmount] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState(0);

  const handleClickPlayer = (selected: number) => {
    if (selected === selectedPlayer) {
      setSelectedPlayer(0);
      return;
    }
    setSelectedPlayer(selected);
  };

  const handleClickCreateBet = () => {
    if (!account) {
      connectWallet();
      return;
    }
    if (selectedPlayer === 0) {
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
  };

  useEffect(() => {
    if (!matchInfo) {
      navigation("/");
    }
  }, [matchInfo, navigation]);

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
            src={`/assets/ufc/${matchInfo?.matchId}/${matchInfo?.player1.img}.png`}
            onClick={() => handleClickPlayer(1)}
          />
          <Box className={classes.player1PoolInfo}>
            <Box component="img" src={`/assets/tokens/ufc.png`} />
            {formatNumberWithCommas(123532)}{" "}
            <Box className={classes.ufcText}>UFC</Box>
          </Box>
        </Box>

        <Box className={classes.bettingInfo}>
          <Box className={classes.cooldown}>4 days, 12:23:12</Box>
          <Box className={classes.playTime}>
            {getPSTTimeFromTimestamp(matchInfo?.time || 0)}
          </Box>
          <Box
            component={"img"}
            src="/assets/icons/vsicon.png"
            className={classes.vsIcon}
          />
          <Box className={classes.weight}>
            {matchInfo?.weight}
            {matchInfo?.eventType ? ` - ` : null}
            {matchInfo?.eventType}
          </Box>
          <Box className={classes.oddsInfo}>
            <Box component="span" className={classes.highBet}>
              1.54
            </Box>{" "}
            :{" "}
            <Box component="span" className={classes.lowBet}>
              3.12
            </Box>
          </Box>
        </Box>

        <Box className={classes.player2Img}>
          <Box
            component={"img"}
            src={`/assets/ufc/${matchInfo?.matchId}/${matchInfo?.player2.img}.png`}
            onClick={() => handleClickPlayer(2)}
          />
          <Box className={classes.player2PoolInfo}>
            <Box component="img" src={`/assets/tokens/ufc.png`} />
            {formatNumberWithCommas(123532)}{" "}
            <Box className={classes.ufcText}>UFC</Box>
          </Box>
        </Box>
      </Box>

      <Box className={classes.playerInfoPanel}>
        <Box
          className={classes.playerInfo}
          onClick={() => handleClickPlayer(1)}
        >
          <Box className={classes.playerName}>{matchInfo?.player1.name}</Box>
          <Box className={classes.playerStat}>({matchInfo?.player1.stat})</Box>
          {selectedPlayer === 1 && (
            <Box
              className={classes.player1CheckIcon}
              component={"img"}
              src={`/assets/icons/check.png`}
            />
          )}
        </Box>
        <Box className={classes.betArea}>
          <TextField
            value={betAmount}
            placeholder="Input the bet amount"
            onChange={(e) => setBetAmount(e.target.value)}
          />
          <Box component={"img"} src={`/assets/tokens/ufc.png`} />
          <Button onClick={handleClickCreateBet}>Create bet</Button>
        </Box>
        <Box
          className={classes.playerInfo}
          onClick={() => handleClickPlayer(2)}
        >
          <Box className={classes.playerName}>{matchInfo?.player2.name}</Box>
          <Box className={classes.playerStat}>({matchInfo?.player2.stat})</Box>
          {selectedPlayer === 2 && (
            <Box
              className={classes.player2CheckIcon}
              component={"img"}
              src={`/assets/icons/check.png`}
            />
          )}
        </Box>
      </Box>

      <Box className={classes.bettingListPanel}>
        <BettingList />
        <BettingList />
      </Box>
    </Box>
  );
};

export default UFCBetting;
