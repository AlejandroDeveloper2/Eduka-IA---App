import { useEffect, useRef, useState } from "react";
import {
  useSharedValue,
  withTiming,
  withRepeat,
  withSequence,
} from "react-native-reanimated";

const useAnimatedLoader = (percentage: number, isGenerating: boolean) => {
  const progress = useSharedValue(0);
  const scaleValue = useSharedValue(1);

  const hasStarted = useRef(false);
  const [internalPercentage, setInternalPercentage] = useState(0);

  useEffect(() => {
    if (!isGenerating) return;

    if (!hasStarted.current) {
      progress.value = 0;
      setInternalPercentage(0);
      hasStarted.current = true;
      return;
    }

    if (percentage > 0 && percentage !== internalPercentage) {
      setInternalPercentage(percentage);
      progress.value = withTiming(percentage / 100, {
        duration: 100,
      });
    }

    if (percentage >= 100) {
      hasStarted.current = false;
    }
  }, [percentage, isGenerating]);

  useEffect(() => {
    scaleValue.value = withRepeat(
      withSequence(
        withTiming(1.1, {
          duration: 200,
        }),
        withTiming(0.9, {
          duration: 200,
        }),
        withTiming(1.05, {
          duration: 200,
        }),
        withTiming(0.95, {
          duration: 200,
        }),
        withTiming(1, {
          duration: 200,
        })
      ),
      -1,
      true
    );
  }, []);

  return { progress, scaleValue };
};

export default useAnimatedLoader;
