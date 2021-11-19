export type ResponseType = {
  data: {
    circuits: CircuitType[];
    times: TimeType[];
  };
  loading: boolean;
  error: string | null
}

export type CircuitType = {
  _id: string,
  name: string,
  description: string,
  location: string,
  flag: string,
  creationDate: string
}

export type TimeType = {
  _id: string,
  time: string,
  gamertag: string,
  circuitId: string,
  creationDate: string
}
