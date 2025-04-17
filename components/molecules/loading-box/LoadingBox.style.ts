import styled from "styled-components/native";

import { Spacing } from "@/lib/constants/Spacing";

const LoadingBoxContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: ${Spacing.spacing_md}px;
  margin-top: ${Spacing.spacing_lg}px;
`;

export { LoadingBoxContainer };
