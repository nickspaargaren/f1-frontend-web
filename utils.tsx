export const getwinner = <T extends { gamertag: string }>(
  object: T[]
): string => (object.length > 0 ? object[0].gamertag : "");
