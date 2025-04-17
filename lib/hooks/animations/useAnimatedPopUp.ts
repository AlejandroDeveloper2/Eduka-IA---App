import { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
// import { Gesture } from "react-native-gesture-handler";

const { height } = Dimensions.get("window");

const useAnimatedPopUp = () => {
  const [isPopUpVisible, setIsPopUpVisible] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(isPopUpVisible);

  const translateY = useSharedValue(height);

  useEffect(() => {
    if (isPopUpVisible) {
      setIsMounted(true);
      translateY.value = withSpring(0, { damping: 15 });
    } else {
      translateY.value = withTiming(height, { duration: 300 }, () => {
        runOnJS(setIsMounted)(false);
      });
    }
  }, [isPopUpVisible]);

  const animatedPopUpStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  // const gesture = Gesture.Pan()
  //   .simultaneousWithExternalGesture(Gesture.Native())
  //   .onUpdate((event) => {
  //     if (event.translationY > 0) {
  //       translateY.value = event.translationY;
  //     }
  //   })
  //   .onEnd((event) => {
  //     if (event.translationY > 100) {
  //       closePopUp();
  //     } else {
  //       translateY.value = withSpring(0, { damping: 15 });
  //     }
  //   });

  const openPopUp = (): void => {
    setIsPopUpVisible(true);
  };

  const closePopUp = (): void => {
    setIsPopUpVisible(false);
  };

  return {
    isMounted,
    isPopUpVisible,
    animatedPopUpStyle,
    // gesture,
    openPopUp,
    closePopUp,
  };
};

export default useAnimatedPopUp;
