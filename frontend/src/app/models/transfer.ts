import {PlayerResponse} from "./player";
import {TeamResponse} from "./team";

export interface TransferResponse {
  id: number;
  playerResponseDto: PlayerResponse;
  sellTeamResponseDto: TeamResponse;
  buyTeamResponseDto: TeamResponse;
  transferFee: number;
}

export interface TransferRequest {
  playerId: number;
  buyingTeamId: number;
}
