import "dotenv/config";
import { ExpoConfig, ConfigContext } from "@expo/config";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default ({ config }: ConfigContext): ExpoConfig => ({
  name: "Eduka IA",
  slug: "eduka-ia",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "myapp",
  userInterfaceStyle: "light",
  newArchEnabled: true,
  ios: {
    buildNumber: "2",
    userInterfaceStyle: "light",
    supportsTablet: true,
    infoPlist: {
      CFBundleAllowMixedLocalizations: true,
    },
    bundleIdentifier: "com.b1tech.edukaia",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#5E17EB",
    },
    package: "com.b1tech.edukaia",
    userInterfaceStyle: "light",
    versionCode: 3,
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/images/favicon.png",
  },
  splash: {
    image: "./assets/images/splash-icon.png",
    resizeMode: "contain",
    backgroundColor: "#5E17EB",
  },
  experiments: {
    typedRoutes: true,
  },
  extra: {
    router: {
      origin: false,
    },
    eas: {
      projectId: "e557612e-cd3d-424d-be26-417e440314bf",
    },
    EXPO_OPEN_IA_API_KEY: process.env.EXPO_OPEN_IA_API_KEY,
    EXPO_OPEN_IA_API_URL: process.env.EXPO_OPEN_IA_API_URL,
  },
  locales: {
    en: "./lib/lang/english.json",
    es: "./lib/lang/spanish.json",
    pt: "./lib/lang/portuguese.json",
  },

  plugins: ["expo-localization"],
});
