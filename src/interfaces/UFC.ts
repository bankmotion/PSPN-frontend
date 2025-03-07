export interface UFCGameType {
  matchId: number;
  id: number;
  weight: string;
  eventType?: string;
  player1: UFCPlayerType;
  player2: UFCPlayerType;
}

export interface UFCPlayerType {
  img: string;
  stat: string;
}
