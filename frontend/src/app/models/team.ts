export interface TeamResponse {
  id?: number;
  name?: string;
  city?: string;
  country?: string;
  budget?: number;
  commission?: number;
}

export interface TeamRequest {
  name?: string;
  city?: string;
  country?: string;
  budget?: number;
  commission?: number;
}
