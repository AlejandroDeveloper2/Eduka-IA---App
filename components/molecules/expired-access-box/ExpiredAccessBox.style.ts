import styled from "styled-components/native";

import { Spacing } from "@/lib/constants/Spacing";

const BoxContainer = styled.View`
  width: 100%;
  height: auto;
  justify-content: center;
  align-items: center;
  gap: ${Spacing.spacing_2xl}px;
  margin-top: ${Spacing.spacing_lg}px;
`;

export { BoxContainer };
