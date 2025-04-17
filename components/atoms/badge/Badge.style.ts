import styled from "styled-components/native";

import { SizeType } from "@/lib/types";

import { Radius } from "@/lib/constants/Radius";
import { Spacing } from "@/lib/constants/Spacing";
import { Colors } from "@/lib/constants/Colors";

interface BadgeBoxStyle {
  size: SizeType;
}

const BadgeBox = styled.View<BadgeBoxStyle>`
  width: auto;
  border-radius: ${Radius.radius_pilled}px;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.primary[400]};
  padding-inline: ${({ size }: BadgeBoxStyle) =>
    size === "Large" ? Spacing.spacing_md : Spacing.spacing_sm}px;
  padding-top: ${({ size }: BadgeBoxStyle) =>
    size === "Large" ? Spacing.spacing_xs : Spacing.spacing_2xs}px;
  padding-bottom: ${({ size }: BadgeBoxStyle) =>
    size === "Large" ? Spacing.spacing_xs : Spacing.spacing_2xs}px;
  overflow: hidden;
`;

export { BadgeBox };
