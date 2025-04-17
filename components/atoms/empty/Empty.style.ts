import styled from "styled-components/native";

import { Spacing } from "@/lib/constants/Spacing";

const EmptyContainer = styled.View`
  width: auto;
  height: auto;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${Spacing.spacing_lg}px;
  margin-top: ${Spacing.spacing_md}px;
`;

const EmptyImage = styled.Image`
  width: 200px;
  height: 200px;
`;

export { EmptyContainer, EmptyImage };
