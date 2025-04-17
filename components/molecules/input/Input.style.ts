import { Pressable, StyleProp, TextStyle } from "react-native";
import Animated from "react-native-reanimated";
import styled from "styled-components/native";

import { SizeType } from "@/lib/types";

import { Spacing } from "@/lib/constants/Spacing";
import { Radius } from "@/lib/constants/Radius";
import { Colors } from "@/lib/constants/Colors";

import { InputStyleManager } from "@/lib/utils";

const AnimatedInputBox = Animated.createAnimatedComponent(Pressable);

interface InputTextBoxStyle {
  size: SizeType;
  disabled?: boolean;
}

const InputContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: ${Spacing.spacing_xs}px;
`;

const InputTextBox = styled(AnimatedInputBox)<InputTextBoxStyle>`
  width: 100%;
  display: flex;
  position: relative;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: ${Radius.radius_pilled}px;
  background-color: ${({ disabled }: InputTextBoxStyle) =>
    disabled ? Colors.neutral[50] : Colors.basic.white};
  padding-inline: ${({ size }: InputTextBoxStyle) =>
    InputStyleManager.getInputInlinePadding(size)}px;
`;

const InputTextBody = styled.View`
  width: 80%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: ${Spacing.spacing_sm}px;
`;

const inputStyle = (
  size: SizeType,
  editable: boolean | undefined
): StyleProp<TextStyle> => ({
  borderWidth: 0,
  width: "100%",
  height: "auto",
  backgroundColor: "transparent",
  color: editable ? Colors.neutral[1000] : Colors.neutral[700],
  fontFamily: "Poppins_400Regular",
  paddingTop: InputStyleManager.getInputVerticalPadding(size),
  paddingBottom: InputStyleManager.getInputVerticalPadding(size),
});

const InputTools = styled.View`
  gap: ${Spacing.spacing_xs}px;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: row;
`;

export { InputContainer, InputTextBox, InputTextBody, inputStyle, InputTools };
