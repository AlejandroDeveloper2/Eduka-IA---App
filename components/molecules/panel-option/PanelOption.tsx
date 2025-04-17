import { Ionicons } from "@expo/vector-icons";

import { SizeType } from "@/lib/types";

import { Colors } from "@/lib/constants/Colors";

import { ButtonStyleManager } from "@/lib/utils";

import { Typography } from "@/components/atoms";

import { PanelOptionPressable } from "./PanelOption.style";

interface PanelOptionProps {
  optionValue: string;
  iconName: keyof typeof Ionicons.glyphMap;
  size: SizeType;
  selected: boolean;
  onPress: () => void;
}

const PanelOption = ({
  optionValue,
  iconName,
  size,
  selected,
  onPress,
}: PanelOptionProps): JSX.Element => {
  return (
    <PanelOptionPressable
      size={size}
      selected={selected}
      onPress={onPress}
      style={ButtonStyleManager.getButtonShadow()}
    >
      <Ionicons
        name={iconName}
        size={size === "Large" ? 24 : 20}
        color={selected ? Colors.basic.white : Colors.neutral[1000]}
      />
      <Typography
        size={size}
        type="caption"
        text={optionValue}
        color={selected ? Colors.basic.white : Colors.neutral[1000]}
        align="center"
        fontWeight="400Regular"
      />
    </PanelOptionPressable>
  );
};

export default PanelOption;
