import Animated from "react-native-reanimated";
import styled from "styled-components/native";

import { SizeType } from "@/lib/types";

import { Colors } from "@/lib/constants/Colors";
import { Spacing } from "@/lib/constants/Spacing";
import { Radius } from "@/lib/constants/Radius";

interface LoaderBoxStyleProps {
  size: SizeType;
}

const AnimatedBarLoad = Animated.View;

const LoaderBox = styled.View<LoaderBoxStyleProps>`
  width: ${({ size }: LoaderBoxStyleProps) => (size === "Large" ? 600 : 360)}px;
  height: auto;
  background-color: ${Colors.basic.white};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${Spacing.spacing_sm}px;
  border-radius: ${Radius.radius_md}px;
  padding: ${({ size }: LoaderBoxStyleProps) =>
    size === "Large" ? Spacing.spacing_3xl : Spacing.spacing_xl}px;
`;

const LoadingBarContainer = styled.View`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${Spacing.spacing_2xs}px;
`;

const LoadingBarBox = styled.View`
  width: 80%;
  height: auto;
  border-radius: ${Radius.radius_pilled}px;
  background-color: ${Colors.basic.white};
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: ${Spacing.spacing_2xs}px;
`;

const BarLoad = styled(AnimatedBarLoad)`
  /* width: 40%; */
  height: 30px;
  border-radius: ${Radius.radius_pilled}px;
  background-color: ${Colors.primary[400]};
`;

const PercentageCircle = styled.View`
  width: 50px;
  height: 50px;
  background-color: ${Colors.neutral[0]};
  justify-content: center;
  align-items: center;
  border-radius: ${Radius.radius_rounded};
`;

export {
  LoaderBox,
  LoadingBarContainer,
  LoadingBarBox,
  BarLoad,
  PercentageCircle,
};
