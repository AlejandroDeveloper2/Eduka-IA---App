import styled from "styled-components/native";

import { SizeType } from "@/lib/types";

import { Spacing } from "@/lib/constants/Spacing";
import { Radius } from "@/lib/constants/Radius";
import { Colors } from "@/lib/constants/Colors";

interface InfoCardStyle {
  size: SizeType;
}

const InfoCardBox = styled.View<InfoCardStyle>`
  width: 100%;
  height: auto;
  padding: ${({ size }: InfoCardStyle) =>
    size === "Large" ? Spacing.spacing_md : Spacing.spacing_sm}px;
  border-radius: ${Radius.radius_md}px;
  border-width: 1px;
  border-color: ${Colors.neutral[50]};
  display: flex;
  flex-direction: column;
  gap: ${Spacing.spacing_sm}px;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.basic.white};
`;

export { InfoCardBox };
