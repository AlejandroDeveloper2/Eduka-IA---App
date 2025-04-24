import styled from "styled-components/native";
import Animated from "react-native-reanimated";

import { SizeType } from "@/lib/types";

import { Radius } from "@/lib/constants/Radius";
import { Colors } from "@/lib/constants/Colors";
import { Spacing } from "@/lib/constants/Spacing";

interface FileBoxStyle {
  size: SizeType;
}

const FileCardBox = styled(Animated.View)<FileBoxStyle>`
  width: 100%;
  height: auto;
  border-radius: ${Radius.radius_md}px;
  background-color: ${Colors.basic.white};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding-inline: ${Spacing.spacing_sm}px;
  padding-top: ${Spacing.spacing_md}px;
  padding-bottom: ${Spacing.spacing_md}px;
  border-width: 1px;
  border-color: ${Colors.neutral[50]};
  margin-top: ${Spacing.spacing_md}px;
`;

const FileCardBody = styled.View`
  width: auto;
  height: auto;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  display: flex;
  gap: ${Spacing.spacing_sm}px;
`;

const SizeIndicator = styled.View`
  width: auto;
  height: auto;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 4px;
  left: ${Spacing.spacing_sm}px;
`;

export { FileCardBox, FileCardBody, SizeIndicator };
