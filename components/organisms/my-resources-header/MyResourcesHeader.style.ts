import styled from "styled-components/native";

import { Spacing } from "@/lib/constants/Spacing";

const ListHeader = styled.View`
  width: 100%;
  height: auto;
  flex-direction: column;
  gap: ${Spacing.spacing_lg}px;
  justify-content: center;
  align-items: center;
`;

const FilterList = styled(ListHeader)`
  flex-wrap: wrap;
  flex-direction: row;
  gap: ${Spacing.spacing_xs}px;
`;
export { ListHeader, FilterList };
