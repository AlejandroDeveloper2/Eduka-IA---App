import styled from "styled-components/native";

import { Spacing } from "@/lib/constants/Spacing";

const ErrorMessageContainer = styled.View`
  width: auto;
  height: auto;
  gap: ${Spacing.spacing_xs}px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export { ErrorMessageContainer };
