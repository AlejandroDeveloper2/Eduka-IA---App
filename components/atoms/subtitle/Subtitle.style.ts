import styled from "styled-components/native";

import { Spacing } from "@/lib/constants/Spacing";

import { SectionContainer } from "../../molecules/screen-section/ScreenSection.style";

const SectionSubtitle = styled(SectionContainer)`
  width: 100%;
  flex-direction: row;
  gap: ${Spacing.spacing_xs}px;
  justify-content: center;
  flex-wrap: wrap;
`;

export { SectionSubtitle };
