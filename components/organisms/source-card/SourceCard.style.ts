import { Pressable } from "react-native";
import Animated from "react-native-reanimated";
import styled from "styled-components/native";

import { SizeType } from "@/lib/types";

import { Colors } from "@/lib/constants/Colors";
import { Radius } from "@/lib/constants/Radius";
import { Spacing } from "@/lib/constants/Spacing";

interface CardBoxStyle {
  size: SizeType;
}

const AnimatedCardBox = Animated.createAnimatedComponent(Pressable);

const CardBox = styled(AnimatedCardBox)<CardBoxStyle>`
  margin-top: ${Spacing.spacing_md}px;
  width: 100%;
  height: auto;
  background-color: ${Colors.basic.white};
  border-radius: ${Radius.radius_md}px;
  border-width: 1px;
  border-color: ${Colors.neutral[50]};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${Spacing.spacing_md}px;
  padding-inline: ${({ size }: CardBoxStyle) =>
    size === "Large" ? Spacing.spacing_md : Spacing.spacing_sm}px;
  padding-top: ${({ size }: CardBoxStyle) =>
    size === "Large" ? Spacing.spacing_xl : Spacing.spacing_lg}px;
  padding-bottom: ${({ size }: CardBoxStyle) =>
    size === "Large" ? Spacing.spacing_xl : Spacing.spacing_lg}px;
`;

const CardHeader = styled.View`
  width: 100%;
  height: auto;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TitleContainer = styled.View`
  width: 60%;
  height: auto;
  justify-content: center;
  align-items: center;
  display: flex;
`;

export { CardBox, CardHeader, TitleContainer };
