import styled from "styled-components/native";

import { Spacing } from "@/lib/constants/Spacing";

const DropDownContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: ${Spacing.spacing_xs}px;
`;

export { DropDownContainer };
