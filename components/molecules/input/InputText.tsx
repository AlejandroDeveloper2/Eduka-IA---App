import { KeyboardTypeOptions, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { SizeType } from "@/lib/types";
import { Colors } from "@/lib/constants/Colors";
import { FontSizes } from "@/lib/constants/FontSizes";

import { useAnimatedInput } from "@/lib/hooks";

import { Typography, ErrorMessage } from "@/components/atoms";

import {
  inputStyle,
  InputContainer,
  InputTextBody,
  InputTextBox,
  InputTools,
} from "./Input.style";

export interface InputTextProps<T> {
  inputRef: React.RefObject<TextInput>;
  label?: string;
  value: string;
  name: keyof T;
  size: SizeType;
  iconName: keyof typeof Ionicons.glyphMap;
  placeholder: string;
  keyboardType: KeyboardTypeOptions;
  errorMessage?: string;
  disabled?: boolean;
  onChange: (name: keyof T, text: string) => void;
  onClearInput: () => void;
}

function InputText<T>({
  inputRef,
  label,
  iconName,
  size,
  name,
  value,
  placeholder,
  keyboardType,
  errorMessage,
  disabled,
  onChange,
  onClearInput,
}: InputTextProps<T>): JSX.Element {
  const error: boolean = errorMessage !== undefined;

  const { animatedBorderStyle, onFocus, onBlur } = useAnimatedInput(error);

  return (
    <InputContainer>
      {label && (
        <Typography
          size={size}
          type="paragraph"
          text={label}
          color={Colors.neutral[1000]}
          align="left"
          fontWeight={"400Regular"}
        />
      )}

      <InputTextBox
        size={size}
        disabled={disabled}
        style={[animatedBorderStyle]}
      >
        <InputTextBody>
          <Ionicons
            name={iconName}
            size={size === "Large" ? 24 : 20}
            color={Colors.neutral[1000]}
          />
          <TextInput
            id={name as string}
            ref={inputRef}
            value={value}
            placeholder={placeholder}
            keyboardType={keyboardType}
            onChangeText={(text) => onChange(name, text)}
            onFocus={onFocus}
            onBlur={onBlur}
            editable={!disabled}
            style={[
              { fontSize: FontSizes["Large"].caption },
              inputStyle(size, !disabled),
            ]}
          />
        </InputTextBody>
        <InputTools>
          {value.length > 0 && !disabled && (
            <Ionicons
              name="close-outline"
              size={size === "Large" ? 24 : 20}
              color={Colors.neutral[700]}
              onPress={onClearInput}
            />
          )}
        </InputTools>
      </InputTextBox>
      {errorMessage && <ErrorMessage message={errorMessage} size={size} />}
    </InputContainer>
  );
}

export default InputText;
