import styled from "styled-components/native";

import { Colors } from "@/lib/constants/Colors";
import { Spacing } from "@/lib/constants/Spacing";

import { SizeType } from "@/lib/types";

interface PageContentStyle {
  size: SizeType;
}

const RootContainerView = styled.View`
  flex: 1;
  background-color: ${Colors.basic.white};
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
`;

const PageContent = styled.View<PageContentStyle>`
  width: ${({ size }: PageContentStyle) => (size === "Large" ? 600 : 340)}px;
  max-width: ${({ size }: PageContentStyle) =>
    size === "Large" ? 600 : 360}px;
  min-width: ${({ size }: PageContentStyle) =>
    size === "Large" ? 500 : 300}px;
  gap: ${({ size }: PageContentStyle) =>
    size === "Large" ? Spacing.spacing_4xl : Spacing.spacing_3xl}px;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  position: relative;
`;

export { PageContent, RootContainerView };
