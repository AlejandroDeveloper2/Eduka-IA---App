import { Dimensions } from "react-native";
import { Gesture } from "react-native-gesture-handler";
import {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const SCREEN_WIDTH = Dimensions.get("window").width;
const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * 0.3;

const useAnimatedFileCard = (onDelete: () => void) => {
  const translateX = useSharedValue(0);
  const itemHeight = useSharedValue(70);
  const itemOpacity = useSharedValue(1);

  const swipeToLeftGesture = Gesture.Pan()
    .simultaneousWithExternalGesture(Gesture.Native())
    .onUpdate((event) => {
      translateX.value = event.translationX;
    })
    .onEnd(() => {
      if (translateX.value < TRANSLATE_X_THRESHOLD) {
        translateX.value = withTiming(-SCREEN_WIDTH);
        itemHeight.value = withTiming(0);
        itemOpacity.value = withTiming(0, {}, () => {
          runOnJS(onDelete)();
        });
      } else {
        translateX.value = withTiming(0);
      }
    });

  const animatedCardStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const animatedContainerStyle = useAnimatedStyle(() => ({
    height: itemHeight.value,
    opacity: itemOpacity.value,
    marginBottom: itemHeight.value > 0 ? 10 : 0,
  }));

  return {
    swipeToLeftGesture,
    animatedCardStyle,
    animatedContainerStyle,
  };
};

export default useAnimatedFileCard;
