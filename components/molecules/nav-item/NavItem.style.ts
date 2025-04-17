import Animated from "react-native-reanimated";
import { Pressable } from "react-native";
import styled from "styled-components/native";

import { SizeType } from "@/lib/types";

import { Spacing } from "@/lib/constants/Spacing";
import { Radius } from "@/lib/constants/Radius";
import { Colors } from "@/lib/constants/Colors";

interface NavPressableStyle {
  size: SizeType;
}

const AnimatedNavPressable = Animated.createAnimatedComponent(Pressable);

const NavItemBox = styled.View`
  display: flex;
  flex-direction: column;
  gap: ${Spacing.spacing_2xs}px;
  justify-content: center;
  align-items: center;
`;

const NavPressable = styled(AnimatedNavPressable)<NavPressableStyle>`
  width: ${({ size }: NavPressableStyle) => (size === "Large" ? 50 : 40)}px;
  height: ${({ size }: NavPressableStyle) => (size === "Large" ? 50 : 40)}px;
  overflow: hidden;
  border-radius: ${Radius.radius_rounded};
  justify-content: center;
  align-items: center;
  background-color: ${({ disabled }) =>
    disabled ? Colors.neutral[50] : Colors.basic.white};
`;

export { NavItemBox, NavPressable };
