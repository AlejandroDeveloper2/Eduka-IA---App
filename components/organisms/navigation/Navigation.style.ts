import styled from "styled-components/native";

import { SizeType } from "@/lib/types";

import { Colors } from "@/lib/constants/Colors";
import { Spacing } from "@/lib/constants/Spacing";

interface NavigationBoxStyle {
  size: SizeType;
  insetsBottom: number;
}

const NavigationBox = styled.View<NavigationBoxStyle>`
  width: 100%;
  height: auto;
  background-color: ${Colors.neutral[0]};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: ${Spacing.spacing_xs}px;
  padding-inline: ${Spacing.spacing_4xl}px;
  padding-top: ${({ size }: NavigationBoxStyle) =>
    size === "Large" ? Spacing.spacing_md : Spacing.spacing_sm}px;
  padding-bottom: ${({ size, insetsBottom }: NavigationBoxStyle) =>
    size === "Large"
      ? Spacing.spacing_md + insetsBottom
      : Spacing.spacing_sm + insetsBottom}px;
  border-color: ${Colors.neutral[50]};
  border-top-width: 1px;
`;

export { NavigationBox };
