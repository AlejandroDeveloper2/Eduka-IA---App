import styled from "styled-components/native";

import { Spacing } from "@/lib/constants/Spacing";

const AlertContainer = styled.View`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${Spacing.spacing_md}px;
  flex-direction: column;
`;

const AlertBody = styled(AlertContainer)`
  gap: ${Spacing.spacing_xs}px;
`;

const AlertControls = styled(AlertContainer)`
  width: auto;
  flex-direction: row;
  gap: ${Spacing.spacing_xs}px;
  flex: 2;
`;

const AlertControl = styled.View`
  width: auto;
  flex: 1;
`;

export { AlertContainer, AlertBody, AlertControls, AlertControl };
