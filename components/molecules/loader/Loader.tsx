import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

import { SizeType } from "@/lib/types";
import { Colors } from "@/lib/constants/Colors";

import { ButtonStyleManager } from "@/lib/utils";

import { Typography } from "@/components/atoms";

import {
  BarLoad,
  LoaderBox,
  LoadingBarBox,
  LoadingBarContainer,
  PercentageCircle,
} from "./Loader.style";

interface LoaderProps {
  title: string;
  description: string;
  iconName: keyof typeof MaterialCommunityIcons.glyphMap;
  size: SizeType;
  loadPercentage: number;
  progress: SharedValue<number>;
  scaleValue: SharedValue<number>;
}

const Loader = ({
  title,
  description,
  iconName,
  size,
  loadPercentage,
  progress,
  scaleValue,
}: LoaderProps): JSX.Element => {
  const animatedLoadBar = useAnimatedStyle(() => {
    const width = interpolate(progress.value, [0, 1], [0, 100]);
    return {
      width: `${width}%`,
    };
  });

  const animatedIcon = useAnimatedStyle(() => ({
    transform: [{ scale: scaleValue.value }],
  }));

  return (
    <LoaderBox size={size}>
      <Animated.View style={animatedIcon}>
        <MaterialCommunityIcons
          name={iconName}
          size={size === "Large" ? 48 : 36}
          color={Colors.primary[400]}
        />
      </Animated.View>

      <Typography
        size={size}
        type="button"
        text={title}
        color={Colors.neutral[1000]}
        align="center"
        fontWeight="500Medium"
      />
      <Typography
        size={size}
        type="paragraph"
        text={description}
        color={Colors.neutral[900]}
        align="left"
        fontWeight="300Light"
      />
      <LoadingBarContainer>
        <LoadingBarBox style={ButtonStyleManager.getButtonShadow()}>
          <BarLoad style={animatedLoadBar} />
        </LoadingBarBox>
        <PercentageCircle>
          <Typography
            size={size}
            type="paragraph"
            text={loadPercentage + "%"}
            color={Colors.neutral[1000]}
            align="center"
            fontWeight="300Light"
          />
        </PercentageCircle>
      </LoadingBarContainer>
    </LoaderBox>
  );
};

export default Loader;
