import { Box, Button } from "@mui/material";
import useStyles from "./ufc.styles";
import { UFCMatches } from "../../constants/ufc";
import { useEffect, useRef, useState } from "react";
import {
  formatNumberWithCommas,
  getPSTTimeFromTimestamp,
  remainTime,
} from "../../utils";
import { UFCGameType } from "../../interfaces/UFC";
import isMobile from "is-mobile";

const UFC = () => {
  const { classes } = useStyles();
  const [curTime, setCurTime] = useState(new Date().getTime() / 1000);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurTime(new Date().getTime() / 1000);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const PanelOnDesktop = ({ match }: { match: UFCGameType }) => {
    return (
      <Box className={classes.panel}>
        <Box className={classes.leftImgBox}>
          <Box
            component={"img"}
            className={classes.playerImg}
            src={`/assets/ufc/${match.matchId}/${match.player1.img}.png`}
          />
        </Box>
        <Box className={classes.centerPart}>
          <Box>
            <Box>{remainTime(match.time - curTime)}</Box>
            <Box className={classes.oddPart}>
              <Box component="span" className={classes.highBet}>
                1.54
              </Box>{" "}
              :{" "}
              <Box component="span" className={classes.lowBet}>
                3.12
              </Box>
            </Box>
            <Box className={classes.poolsBox}>
              Pool:{" "}
              <Box
                component={"img"}
                className={classes.ufcTokenLogo}
                src="/assets/tokens/ufc.png"
              />
              {formatNumberWithCommas(23440000)}{" "}
              <Box component="span" className={classes.grayColor}>
                UFC
              </Box>
            </Box>
          </Box>
          <Box>
            <Box className={classes.playerName}>
              <Box>{match.player1.name}</Box>
              <Box>({match.player1.stat})</Box>
            </Box>
            <Box className={classes.vsBox}>
              <Box>
                {match.weight}
                {match.eventType ? ` - ` : null}
                {match.eventType}
              </Box>
              <Box className={classes.vsMainBox}>
                <Box component={"img"} src="/assets/icons/vs.png" />
                <Box>VS</Box>
                <Box component={"img"} src="/assets/icons/vs.png" />
              </Box>
              <Box>{getPSTTimeFromTimestamp(match.time)}</Box>
            </Box>
            <Box className={classes.playerName}>
              <Box>{match.player2.name}</Box>
              <Box>({match.player2.stat})</Box>
            </Box>
          </Box>
        </Box>
        <Box className={classes.rightImgBox}>
          <Box
            component={"img"}
            className={classes.playerImg}
            src={`/assets/ufc/${match.matchId}/${match.player2.img}.png`}
          />
        </Box>
      </Box>
    );
  };

  const PanelOnMobile = ({ match }: { match: UFCGameType }) => {
    return (
      <Box className={classes.mobilePanel}>
        <Box className={classes.moPanelTop}>
          <Box>{remainTime(match.time - curTime)}</Box>
          <Box className={classes.poolsBox}>
            Pool:{" "}
            <Box
              component={"img"}
              className={classes.ufcTokenLogo}
              src="/assets/tokens/ufc.png"
            />
            {formatNumberWithCommas(23440000)}{" "}
            <Box component="span" className={classes.grayColor}>
              UFC
            </Box>
          </Box>
        </Box>
        <Box className={classes.moPanelImg}>
          <Box className={classes.moPlayer1ImgBox}>
            <Box
              component="img"
              src={`assets/ufc/${match.matchId}/${match.player1.img}.png`}
            />
          </Box>
          <Box className={classes.panelCenterBox}>
            <Box className={classes.oddPart}>
              <Box component="span" className={classes.highBet}>
                1.54
              </Box>{" "}
              :{" "}
              <Box component="span" className={classes.lowBet}>
                3.12
              </Box>
            </Box>
            <Box>
              {match.weight}
              {match.eventType ? ` - ` : null}
              {match.eventType}
            </Box>
            <Box className={classes.vsMainBox}>
              <Box component={"img"} src="/assets/icons/vs.png" />
              <Box>VS</Box>
              <Box component={"img"} src="/assets/icons/vs.png" />
            </Box>
            <Box>{getPSTTimeFromTimestamp(match.time)}</Box>
          </Box>
          <Box className={classes.moPlayer2ImgBox}>
            <Box
              component="img"
              src={`assets/ufc/${match.matchId}/${match.player2.img}.png`}
            />
          </Box>
        </Box>
        <Box className={classes.moPlayerNameBox}>
          <Box>
            <Box>{match.player1.name}</Box>
            <Box>({match.player1.stat})</Box>
          </Box>
          <Box>
            <Box>{match.player2.name}</Box>
            <Box>({match.player2.stat})</Box>
          </Box>
        </Box>
      </Box>
    );
  };

  return (
    <Box className={classes.body}>
      <Box className={classes.panelBox}>
        {UFCMatches.map((match) =>
          isMobile() ? (
            <PanelOnMobile match={match} />
          ) : (
            <PanelOnDesktop match={match} />
          )
        )}
      </Box>
    </Box>
  );
};

export default UFC;
