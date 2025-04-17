import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { SizeType } from "@/lib/types";

import { Colors } from "@/lib/constants/Colors";

import { useAnimatedInput } from "@/lib/hooks";

import { DropdownTools } from "@/components/molecules";
import { Typography } from "@/components/atoms";

import { DropdownBody, DropdownBox } from "./DropdownHeader.style";

interface DropdownHeaderProps<D> {
  dropdownRef: React.RefObject<View>;
  iconName: keyof typeof Ionicons.glyphMap;
  size: SizeType;
  selectedOption: D | null;
  defaultText: string;
  optionValueKey: keyof D;
  errorMessage?: string;
  disabled?: boolean;
  isPopUpVisible: boolean;
  openPopUp: () => void;
  onClearOption: () => void;
}

function DropdownHeader<D>({
  dropdownRef,
  iconName,
  size,
  openPopUp,
  onClearOption,
  selectedOption,
  errorMessage,
  defaultText,
  optionValueKey,
  isPopUpVisible,
  disabled,
}: DropdownHeaderProps<D>): JSX.Element {
  const { animatedBorderStyle, onFocus, onBlur } = useAnimatedInput(
    errorMessage !== undefined,
    isPopUpVisible
  );

  return (
    <DropdownBox
      onPressIn={onFocus}
      onPressOut={onBlur}
      onPress={openPopUp}
      size={size}
      disabled={disabled}
      style={animatedBorderStyle}
    >
      <View ref={dropdownRef} style={{ width: "auto", flexDirection: "row" }}>
        <DropdownBody>
          <Ionicons
            name={iconName}
            size={size === "Large" ? 24 : 20}
            color={Colors.neutral[1000]}
          />
          <Typography
            size={size}
            type="paragraph"
            text={
              selectedOption
                ? (selectedOption[optionValueKey] as string)
                : defaultText
            }
            color={Colors.neutral[1000]}
            align="center"
            fontWeight={"400Regular"}
          />
        </DropdownBody>
      </View>

      <DropdownTools<D>
        size={size}
        selectedOption={selectedOption}
        onClearOption={onClearOption}
      />
    </DropdownBox>
  );
}

export default DropdownHeader;
