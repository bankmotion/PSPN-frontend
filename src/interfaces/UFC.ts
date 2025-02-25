export interface UFCGameType {
  matchId: number;
  id: number;
  weight: string;
  time: number;
  eventType?: string;
  player1: UFCPlayerType;
  player2: UFCPlayerType;
}

export interface UFCPlayerType {
  name: string;
  img: string;
  stat: string;
}
