import { useCallback, useEffect, useState } from "react";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { OptionStateType } from "@/lib/types";
import { Colors } from "@/lib/constants/Colors";

const useAnimatedDropdownOption = (active: boolean) => {
  const [optionState, setOptionState] = useState<OptionStateType>("default");

  const backgroundValue = useSharedValue(Colors.basic.white);

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: backgroundValue.value,
  }));

  useEffect(() => {
    backgroundValue.value = withTiming(
      active || optionState === "pressed"
        ? Colors.primary[400]
        : Colors.basic.white,
      { duration: 150 }
    );
  }, [optionState, active]);

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
