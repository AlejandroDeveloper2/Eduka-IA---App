import styled from "styled-components/native";

import { SizeType } from "@/lib/types";

import { Colors } from "@/lib/constants/Colors";
import { Radius } from "@/lib/constants/Radius";
import { Spacing } from "@/lib/constants/Spacing";

interface PanelOptionPressableStyle {
  selected: boolean;
  size: SizeType;
}

const PanelOptionPressable = styled.Pressable<PanelOptionPressableStyle>`
  width: auto;
  height: auto;
  background-color: ${({ selected }: PanelOptionPressableStyle) =>
    selected ? Colors.primary[400] : Colors.basic.white};
  border-radius: ${Radius.radius_pilled}px;
  display: flex;
  flex-direction: row;
  gap: ${Spacing.spacing_3xs}px;
  justify-content: center;
  align-items: center;
  padding-inline: ${({ size }: PanelOptionPressableStyle) =>
    size === "Large" ? Spacing.spacing_sm : Spacing.spacing_xs}px;
  padding-bottom: ${({ size }: PanelOptionPressableStyle) =>
    size === "Large" ? Spacing.spacing_xs : Spacing.spacing_2xs}px;
  padding-top: ${({ size }: PanelOptionPressableStyle) =>
    size === "Large" ? Spacing.spacing_xs : Spacing.spacing_2xs}px;
`;

export { PanelOptionPressable };
