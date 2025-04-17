import { useCallback, useEffect, useState } from "react";
import {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { OptionStateType } from "@/lib/types";
import { Colors } from "@/lib/constants/Colors";

const useAnimatedDropdownOption = (active: boolean) => {
  const [optionState, setOptionState] = useState<OptionStateType>("default");

  const backgroundValue = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      backgroundValue.value,
      [0, 1],
      [active ? Colors.primary[400] : Colors.basic.white, Colors.primary[100]]
    ),
  }));

  useEffect(() => {
    if (active) backgroundValue.value = withTiming(0, { duration: 200 });
  }, [active]);

  useEffect(() => {
    if (optionState === "pressed")
      backgroundValue.value = withTiming(1, { duration: 200 });
    else backgroundValue.value = withTiming(0, { duration: 200 });
  }, [optionState]);

  const toggleOptionState = useCallback((state: OptionStateType) => {
    setOptionState(state);
  }, []);

  return {
    optionState,
    animatedStyle,
    toggleOptionState,
  };
};

export default useAnimatedDropdownOption;
