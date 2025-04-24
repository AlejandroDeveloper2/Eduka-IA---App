import { useEffect } from "react";
import {
  useSharedValue,
  withTiming,
  runOnJS,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const useAnimatedSplash = (onFinish: () => void) => {
  const insets = useSafeAreaInsets();
  const opacity = useSharedValue(1);
  const logoScale = useSharedValue(0.8);
  const logoOpacity = useSharedValue(0);

  useEffect(() => {
    logoOpacity.value = withTiming(1, {
      duration: 800,
      easing: Easing.out(Easing.ease),
    });

    logoScale.value = withTiming(1, {
      duration: 800,
      easing: Easing.out(Easing.exp),
    });
    const timeout = setTimeout(() => {
      opacity.value = withTiming(0, { duration: 600 }, (finished) => {
        if (finished) {
          runOnJS(onFinish)();
        }
      });
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  const animatedSplashStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: logoScale.value }],
  }));

  return {
    insets,
    animatedSplashStyle,
    logoAnimatedStyle,
  };
};

export default useAnimatedSplash;
