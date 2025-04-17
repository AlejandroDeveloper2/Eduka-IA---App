import { useEffect } from "react";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Dimensions } from "react-native";

import useEducativeResourcesStore from "../store/useEducativeResourcesStore";

const useAnimatedToolBar = () => {
  const { selectionMode } = useEducativeResourcesStore();

  const opacity = useSharedValue(0);
  const translateX = useSharedValue(-Dimensions.get("window").width);

  useEffect(() => {
    if (selectionMode) {
      opacity.value = withTiming(1, { duration: 300 });
      translateX.value = withTiming(0, { duration: 300 });
    } else {
      opacity.value = withTiming(0, { duration: 500 });
      translateX.value = withTiming(-Dimensions.get("screen").width, {
        duration: 300,
      });
    }
  }, [selectionMode]);

  const animatedToolbarStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateX: translateX.value }],
  }));

  return { animatedToolbarStyle };
};

export default useAnimatedToolBar;
