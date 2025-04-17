import styled from "styled-components/native";

import { Spacing } from "@/lib/constants/Spacing";

const DownloadsList = styled.FlatList`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: ${Spacing.spacing_lg}px;
`;

export { DownloadsList };
