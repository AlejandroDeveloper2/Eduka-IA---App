import styled from "styled-components/native";

import { Spacing } from "@/lib/constants/Spacing";

const SectionContainer = styled.View`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${Spacing.spacing_lg}px;
`;

const SectionTitle = styled(SectionContainer)`
  gap: ${Spacing.spacing_xs}px;
`;

export { SectionContainer, SectionTitle };
