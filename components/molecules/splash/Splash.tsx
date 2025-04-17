/* eslint-disable @typescript-eslint/no-require-imports */

import { StyleSheet } from "react-native";

import { SplashContainer, Logo } from "./Splash.style";
import { useAnimatedSplash } from "@/lib/hooks";

interface Props {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: Props): JSX.Element {
  const { animatedSplashStyle, logoAnimatedStyle, insets } =
    useAnimatedSplash(onFinish);

  return (
    <SplashContainer
      style={[
        { paddingTop: insets.top },
        animatedSplashStyle,
        { ...StyleSheet.absoluteFillObject },
      ]}
    >
      <Logo
        source={require("@/assets/images/splash-icon.png")}
        style={logoAnimatedStyle}
      />
    </SplashContainer>
  );
}
