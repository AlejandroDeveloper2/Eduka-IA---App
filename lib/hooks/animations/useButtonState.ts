import { useState, useEffect } from "react";
import {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { ButtonStateType, ButtonVariantType } from "@/lib/types";

import { Colors } from "@/lib/constants/Colors";

import { ButtonStyleManager } from "@/lib/utils";

const useButtonState = (variant: ButtonVariantType, disabled?: boolean) => {
  const disabledBackground = ButtonStyleManager.getDisabledButtonBg(variant);

  const defaultBackground = disabled
    ? disabledBackground
    : variant === "neutral"
    ? Colors.basic.white
    : Colors[variant][400];

  const pressedBackground = disabled
    ? disabledBackground
    : Colors[variant][variant === "neutral" ? 200 : 600];

  const [buttonState, setButtonState] = useState<ButtonStateType>("default");

  const backgroundValue = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      backgroundValue.value,
      [0, 1],
      [defaultBackground, pressedBackground]
    ),
  }));

  useEffect(() => {
    if (buttonState === "pressed")
      backgroundValue.value = withTiming(1, { duration: 200 });
    else backgroundValue.value = withTiming(0, { duration: 200 });
  }, [buttonState]);

  const toggleButtonState = (state: ButtonStateType) => {
    setButtonState(state);
  };

  return {
    buttonState,
    animatedStyle,
    toggleButtonState,
  };
};

export default useButtonState;
