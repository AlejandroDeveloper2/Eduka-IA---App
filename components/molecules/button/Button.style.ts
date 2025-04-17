import Animated from "react-native-reanimated";
import { Pressable } from "react-native";
import styled from "styled-components/native";

import { ButtonWidthType, SizeType } from "@/lib/types";

import { Radius } from "@/lib/constants/Radius";

import { ButtonStyleManager } from "@/lib/utils";

interface ButtonStyleProps {
  size: SizeType;
  width: ButtonWidthType;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const Button = styled(AnimatedPressable)<ButtonStyleProps>`
  width: ${({ width }: ButtonStyleProps) =>
    ButtonStyleManager.getButtonWidth(width)};
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: ${({ size }: ButtonStyleProps) =>
    ButtonStyleManager.getButtonGap(size)}px;
  overflow: hidden;
  padding-inline: ${({ size }: ButtonStyleProps) =>
    ButtonStyleManager.getButtonInlinePadding(size)}px;
  padding-top: ${({ size }: ButtonStyleProps) =>
    ButtonStyleManager.getButtonVerticalPadding(size)}px;
  padding-bottom: ${({ size }: ButtonStyleProps) =>
    ButtonStyleManager.getButtonVerticalPadding(size)}px;
  border-radius: ${Radius.radius_pilled}px;
`;

export { Button };
