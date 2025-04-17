export const generateUniqueId = (): string => {
  const characters: string =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  const uniqueIdLength = 10;
  let uniqueId: string = "";

  for (let i: number = 0; i < uniqueIdLength; i++) {
    const randomIndex: number = Math.random() * characters.length;
    const character = characters.charAt(randomIndex);
    uniqueId += character;
  }

  return uniqueId;
};
