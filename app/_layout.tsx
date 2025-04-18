import { useEffect, useState } from "react";
import { Stack } from "expo-router";
import {
  useFonts,
  Poppins_700Bold,
  Poppins_500Medium,
  Poppins_400Regular,
  Poppins_300Light,
} from "@expo-google-fonts/poppins";
import { PaperProvider } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import ToastManager from "toastify-react-native";
import { preventAutoHideAsync } from "expo-splash-screen";

import { FontProvider } from "@/lib/context/FontContext";

import {
  useLanguageListener,
  useScreenDimensions,
  useSplashScreen,
} from "@/lib/hooks";
import { setupNotifications } from "@/lib/utils";

import { Splash, toastConfig } from "@/components/molecules";

preventAutoHideAsync();

export default function RootLayout() {
  const [showSplash, setShowSplash] = useState<boolean>(true);

  const appReady = useSplashScreen();

  useLanguageListener();

  const size = useScreenDimensions();

  const [loaded] = useFonts({
    Poppins_700Bold,
    Poppins_500Medium,
    Poppins_400Regular,
    Poppins_300Light,
  });

  const handleSplashFinish = (): void => {
    setShowSplash(false);
  };

  useEffect(() => {
    setupNotifications();
  }, []);

  if (!loaded || !appReady || showSplash)
    return (
      <>
        <StatusBar style="auto" />
        <Splash onFinish={handleSplashFinish} />
      </>
    );

  return (
    <FontProvider fontsLoaded={loaded}>
      <PaperProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <ToastManager config={toastConfig(size)} animationStyle="fade" />
        <StatusBar style="auto" />
      </PaperProvider>
    </FontProvider>
  );
}
