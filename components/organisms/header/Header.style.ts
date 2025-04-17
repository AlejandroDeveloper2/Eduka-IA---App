import styled from "styled-components/native";

import { Colors } from "@/lib/constants/Colors";
import { Spacing } from "@/lib/constants/Spacing";

const HeaderBox = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${Colors.basic.white};
  border-color: ${Colors.neutral[50]};
  border-bottom-width: 1px;
  padding-inline: ${Spacing.spacing_lg}px;
  padding-bottom: ${Spacing.spacing_md}px;
  position: relative;
  overflow: hidden;
`;

const HeaderOptions = styled.View`
  width: auto;
  height: auto;
  flex-direction: row;
  gap: ${Spacing.spacing_xs}px;
  align-items: center;
  justify-content: center;
`;

export { HeaderBox, HeaderOptions };
