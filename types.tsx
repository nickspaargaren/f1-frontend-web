export type Circuit = {
  _id: string,
  name: string,
  description: string,
  location: string,
  creationDate: string,
  times: Time[]
}

export type Time = {
  _id: string,
  time: string,
  gamertag: string,
  circuitId: string,
  creationDate: string
}
