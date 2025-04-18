import { useEffect, useState } from "react";
import { hideAsync } from "expo-splash-screen";

const useSplashScreen = (): boolean => {
  const [appReady, setAppReady] = useState<boolean>(false);

  useEffect(() => {
    async function prepare() {
      await hideAsync();
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setAppReady(true);
    }
    prepare();
  }, []);

  return appReady;
};

export default useSplashScreen;
