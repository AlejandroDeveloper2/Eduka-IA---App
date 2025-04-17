import styled from "styled-components/native";

import { Spacing } from "@/lib/constants/Spacing";

const ResourcesList = styled.FlatList`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  padding-top: ${Spacing.spacing_lg}px;
`;

export { ResourcesList };
