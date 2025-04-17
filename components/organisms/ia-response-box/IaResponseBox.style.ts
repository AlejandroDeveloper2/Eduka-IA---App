import styled from "styled-components/native";

import { SizeType } from "@/lib/types";

import { Radius } from "@/lib/constants/Radius";
import { Colors } from "@/lib/constants/Colors";
import { Spacing } from "@/lib/constants/Spacing";

interface IaResponseContainerStyle {
  size: SizeType;
}

const IaResponseContainer = styled.View<IaResponseContainerStyle>`
  width: 100%;
  height: auto;
  border-radius: ${Radius.radius_md}px;
  background-color: ${Colors.basic.white};
  display: flex;
  flex-direction: "column";
  justify-content: center;
  align-items: center;
  gap: ${Spacing.spacing_md}px;
  border-width: 1px;
  border-color: ${Colors.neutral[50]};
  padding-inline: ${({ size }: IaResponseContainerStyle) =>
    size === "Large" ? Spacing.spacing_xl : Spacing.spacing_lg}px;
  padding-top: ${({ size }: IaResponseContainerStyle) =>
    size === "Large" ? Spacing.spacing_lg : Spacing.spacing_md}px;
  padding-bottom: ${({ size }: IaResponseContainerStyle) =>
    size === "Large" ? Spacing.spacing_lg : Spacing.spacing_md}px;
`;

const IaResponseHeader = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const IaResponseOptions = styled(IaResponseHeader)`
  justify-content: center;
  gap: ${Spacing.spacing_xs}px;
`;

export { IaResponseContainer, IaResponseHeader, IaResponseOptions };
