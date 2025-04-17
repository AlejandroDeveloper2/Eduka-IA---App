import Constants from "expo-constants";

export const config = {
  OPEN_IA_API_KEY: Constants.expoConfig?.extra?.EXPO_OPEN_IA_API_KEY as string,
  OPEN_IA_API_URL: Constants.expoConfig?.extra?.EXPO_OPEN_IA_API_URL as string,
};
