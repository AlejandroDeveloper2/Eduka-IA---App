import { useEffect, useState } from "react";
import { Stack } from "expo-router";
import {
  useFonts,
  Poppins_700Bold,
  Poppins_500Medium,
  Poppins_400Regular,
  Poppins_300Light,
} from "@expo-google-fonts/poppins";
import { StatusBar } from "expo-status-bar";
import ToastManager from "toastify-react-native";
import { preventAutoHideAsync } from "expo-splash-screen";
import { Host } from "react-native-portalize";

import { FontProvider } from "@/lib/context/FontContext";
import {
  SubscriptionProvider,
  useSubscriptionContext,
} from "@/lib/context/SubscriptionContext";

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

  const { hasSubscription } = useSubscriptionContext();

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
      <SubscriptionProvider>
        <Host>
          <Stack>
            {hasSubscription ? (
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            ) : (
              <Stack.Screen
                name="subscriptions"
                options={{ headerShown: false }}
              />
            )}
            <Stack.Screen name="+not-found" />
          </Stack>
          <ToastManager config={toastConfig(size)} animationStyle="fade" />
          <StatusBar style="auto" />
        </Host>
      </SubscriptionProvider>
    </FontProvider>
  );
}
