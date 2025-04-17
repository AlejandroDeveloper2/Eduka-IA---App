import styled from "styled-components/native";
import { StyleProp, TextStyle } from "react-native";

import { SizeType } from "@/lib/types";

import { Radius } from "@/lib/constants/Radius";
import { Spacing } from "@/lib/constants/Spacing";
import { Colors } from "@/lib/constants/Colors";

import { InputStyleManager } from "@/lib/utils";

import {
  InputContainer,
  InputTextBox,
  InputTools,
} from "../../molecules/input/Input.style";

const PromptPanelContainer = styled(InputContainer)``;

const PromptPanelBox = styled(InputTextBox)`
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  border-radius: ${Radius.radius_md}px;
  padding-bottom: ${({ size }) =>
    size === "Large" ? Spacing.spacing_lg : Spacing.spacing_md}px;
  padding-top: ${({ size }) =>
    size === "Large" ? Spacing.spacing_lg : Spacing.spacing_md}px;
`;

const TextAreaBox = styled.View`
  width: 80%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

const TextAreaTools = styled(InputTools)``;

const PanelOptions = styled.View`
  width: 100%;
  flex-wrap: wrap;
  height: auto;
  gap: ${Spacing.spacing_xs}px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
`;

const textareaStyle = (
  size: SizeType,
  editable: boolean | undefined
): StyleProp<TextStyle> => ({
  borderWidth: 0,
  width: "100%",
  height: 150,
  backgroundColor: "transparent",
  color: editable ? Colors.neutral[1000] : Colors.neutral[700],
  fontFamily: "Poppins_400Regular",
  paddingTop: 0,
  paddingBottom: InputStyleManager.getInputVerticalPadding(size),
});

export {
  PromptPanelContainer,
  PromptPanelBox,
  TextAreaBox,
  TextAreaTools,
  PanelOptions,
  textareaStyle,
};
