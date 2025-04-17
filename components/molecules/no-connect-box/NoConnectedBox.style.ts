import { Dimensions } from "react-native";
import styled from "styled-components/native";

import { Spacing } from "@/lib/constants/Spacing";

const NoConnectedContainer = styled.View`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${Spacing.spacing_md}px;
  margin-top: ${((Dimensions.get("screen").height / 2) * 100) /
  Dimensions.get("screen").height}%;
`;

export { NoConnectedContainer };
