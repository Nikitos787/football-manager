import {TeamResponse} from "./team";

export interface PlayerResponse {
  id: number;
  firstName: string;
  secondName: string
  city: string;
  country: string;
  dateOfBeginningCareer: Date;
  birthDate: Date
  teamResponseDto: TeamResponse;
  status: string;
  position: string;
}

export interface PlayerRequest {
  firstName: string;
  secondName: string
  city: string;
  country: string;
  birthDate: Date
  position: string;
}
