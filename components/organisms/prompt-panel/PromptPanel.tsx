import { TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { FontSizes } from "@/lib/constants/FontSizes";
import { Colors } from "@/lib/constants/Colors";
import { PROMPT_PANEL_OPTIONS } from "@/lib/constants/PromptPanelOptions";

import { SizeType } from "@/lib/types";
import { FormatOption } from "@/lib/types/dataTypes";

import { useAnimatedInput, useTranslations } from "@/lib/hooks";

import { ErrorMessage } from "@/components/atoms";
import { PanelOption } from "@/components/molecules";

import {
  PanelOptions,
  PromptPanelBox,
  PromptPanelContainer,
  TextAreaBox,
  textareaStyle,
  TextAreaTools,
} from "./PromptPanel.style";

interface PromptPanelProps<T> {
  inputRef: React.RefObject<TextInput>;
  value: string;
  selectedOption: FormatOption;
  name: keyof T;
  size: SizeType;
  placeholder: string;
  errorMessage?: string;
  disabled?: boolean;
  onChange: (name: keyof T, text: string) => void;
  onClearInput: () => void;
  onSelectOption: (option: FormatOption) => void;
}

function PromptPanel<T>({
  inputRef,
  value,
  selectedOption,
  name,
  size,
  placeholder,
  errorMessage,
  disabled,
  onChange,
  onClearInput,
  onSelectOption,
}: PromptPanelProps<T>): JSX.Element {
  const error: boolean = errorMessage !== undefined;

  const { language } = useTranslations();

  const { animatedBorderStyle, onFocus, onBlur } = useAnimatedInput(error);

  return (
    <PromptPanelContainer>
      <PromptPanelBox
        size={size}
        disabled={disabled}
        style={animatedBorderStyle}
      >
        <TextAreaBox>
          <Ionicons
            name="document-text-outline"
            size={size === "Large" ? 24 : 20}
            color={Colors.neutral[1000]}
          />
          <TextInput
            ref={inputRef}
            id={name as string}
            value={value}
            placeholder={placeholder}
            keyboardType="default"
            onChangeText={(text) => onChange(name, text)}
            onFocus={onFocus}
            onBlur={onBlur}
            editable={!disabled}
            style={[
              {
                fontSize: FontSizes["Large"].caption,
                textAlignVertical: "top",
              },
              textareaStyle(size, !disabled),
            ]}
            multiline
            numberOfLines={20}
          />
          <TextAreaTools>
            {value.length > 0 && (
              <Ionicons
                name="close"
                size={size === "Large" ? 24 : 20}
                color={Colors.neutral[700]}
                onPress={onClearInput}
              />
            )}
          </TextAreaTools>
        </TextAreaBox>
        <PanelOptions>
          {PROMPT_PANEL_OPTIONS[language].map((option) => (
            <PanelOption
              key={option.optionValue}
              optionValue={option.optionValue}
              iconName={option.iconName}
              size={size}
              selected={selectedOption.key === option.formatOptionKey}
              onPress={() =>
                onSelectOption({
                  key: option.formatOptionKey,
                  name: option.optionValue,
                })
              }
            />
          ))}
        </PanelOptions>
      </PromptPanelBox>
      {errorMessage && <ErrorMessage message={errorMessage} size={size} />}
    </PromptPanelContainer>
  );
}

export default PromptPanel;
