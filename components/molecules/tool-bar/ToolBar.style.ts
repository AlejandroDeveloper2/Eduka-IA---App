import styled from "styled-components/native";
import Animated from "react-native-reanimated";

import { SizeType } from "@/lib/types";

import { Colors } from "@/lib/constants/Colors";
import { Spacing } from "@/lib/constants/Spacing";
import { Radius } from "@/lib/constants/Radius";

interface ToolBarBoxStyle {
  size: SizeType;
}

const ToolBarBox = styled(Animated.View)<ToolBarBoxStyle>`
  width: ${({ size }: ToolBarBoxStyle) => (size === "Large" ? 600 : 360)}px;
  height: auto;
  background-color: ${Colors.basic.white};
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  display: flex;
  padding-inline: ${({ size }: ToolBarBoxStyle) =>
    size === "Large" ? Spacing.spacing_md : Spacing.spacing_sm}px;
  padding-top: ${Spacing.spacing_md}px;
  padding-bottom: ${Spacing.spacing_md}px;
  border-radius: ${Radius.radius_pilled}px;
`;

export { ToolBarBox };
