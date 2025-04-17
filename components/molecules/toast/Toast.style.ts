import styled from "styled-components/native";

import { SizeType } from "@/lib/types";

import { Colors } from "@/lib/constants/Colors";
import { Spacing } from "@/lib/constants/Spacing";
import { Radius } from "@/lib/constants/Radius";

interface ToastContainerStyle {
  size: SizeType;
}

const ToastContainer = styled.View<ToastContainerStyle>`
  background-color: ${Colors.basic.white};
  border-width: 1px;
  border-color: ${Colors.neutral[50]};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding-inline: ${({ size }: ToastContainerStyle) =>
    size === "Large" ? Spacing.spacing_xl : Spacing.spacing_lg}px;
  padding-top: ${({ size }: ToastContainerStyle) =>
    size === "Large" ? Spacing.spacing_md : Spacing.spacing_sm}px;
  padding-bottom: ${Spacing.spacing_sm}px;
  border-radius: ${Radius.radius_md}px;
  gap: ${Spacing.spacing_xs}px;
`;

export { ToastContainer };
