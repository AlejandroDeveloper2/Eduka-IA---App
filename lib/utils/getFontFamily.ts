import { FontWeigthType } from "../types";

export const getFontFamily = (
  weight: FontWeigthType,
  fontsLoaded: boolean
): string | undefined => {
  if (!fontsLoaded) return undefined;

  switch (weight) {
    case "400Regular":
      return "Poppins_400Regular";
    case "500Medium":
      return "Poppins_500Medium";
    case "700Bold":
      return "Poppins_700Bold";
    case "300Light":
      return "Poppins_300Light";
    default:
      return undefined;
  }
};
