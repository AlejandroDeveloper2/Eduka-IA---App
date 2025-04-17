import { Pressable } from "react-native";
import Animated from "react-native-reanimated";
import styled from "styled-components/native";

import { SizeType } from "@/lib/types";

import { Colors } from "@/lib/constants/Colors";
import { Spacing } from "@/lib/constants/Spacing";

interface OptionStyleProps {
  size: SizeType;
}

const AnimatedOption = Animated.createAnimatedComponent(Pressable);

const Option = styled(AnimatedOption)<OptionStyleProps>`
  width: 100%;
  height: auto;
  padding: ${({ size }: OptionStyleProps) =>
    size === "Large" ? Spacing.spacing_lg : Spacing.spacing_md}px;
  border-top-width: 1px;
  border-top-color: ${Colors.neutral[0]};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export { Option };
