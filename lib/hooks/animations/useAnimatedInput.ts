import { useEffect } from "react";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { Colors } from "@/lib/constants/Colors";

const useAnimatedInput = (error: boolean, isDropdownListOpen?: boolean) => {
  const borderColor = useSharedValue(
    error ? Colors.danger[400] : Colors.neutral[50]
  );
  const borderWidth = useSharedValue(1);

  const animatedBorderStyle = useAnimatedStyle(() => ({
    borderColor: borderColor.value,
    borderWidth: borderWidth.value,
  }));

  useEffect(() => {
    if (isDropdownListOpen) {
      borderColor.value = withTiming(
        error ? Colors.danger[200] : Colors.primary[400],
        { duration: 200 }
      );
      borderWidth.value = withTiming(2, { duration: 200 });
      return;
    }
    borderColor.value = withTiming(
      error ? Colors.danger[400] : Colors.neutral[50],
      { duration: 200 }
    );
    borderWidth.value = withTiming(1, { duration: 200 });
  }, [isDropdownListOpen, error]);

  const onFocus = () => {
    borderColor.value = withTiming(
      error ? Colors.danger[200] : Colors.primary[400],
      { duration: 200 }
    );
    borderWidth.value = withTiming(2, { duration: 200 });
  };

  const onBlur = () => {
    borderColor.value = withTiming(
      error ? Colors.danger[400] : Colors.neutral[50],
      { duration: 200 }
    );
    borderWidth.value = withTiming(1, { duration: 200 });
  };

  return {
    animatedBorderStyle,
    onFocus,
    onBlur,
  };
};

export default useAnimatedInput;
