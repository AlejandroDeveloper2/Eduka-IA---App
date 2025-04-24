import { SizeType } from "@/lib/types";

import { Colors } from "@/lib/constants/Colors";

import { useAnimatedDropdownOption } from "@/lib/hooks";

import { Typography } from "@/components/atoms";

import { Option } from "./DropdownOption.style";

interface OptionProps<D> {
  size: SizeType;
  optionData: D;
  optionValueKey: keyof D;
  active: boolean;
  onSelectOption: (selectedOption: D) => void;
  toggleDeployOptions: () => void;
}

function DropdownOption<D>({
  size,
  optionData,
  optionValueKey,
  active,
  onSelectOption,
  toggleDeployOptions,
}: OptionProps<D>): JSX.Element {
  const value: string = Object(optionData)[optionValueKey];
  const { animatedStyle, toggleOptionState, optionState } =
    useAnimatedDropdownOption(active);

  return (
    <Option
      size={size}
      onPress={() => {
        onSelectOption(optionData);
        toggleDeployOptions();
      }}
      onPressIn={() => toggleOptionState("pressed")}
      onPressOut={() => toggleOptionState("default")}
      style={animatedStyle}
    >
      <Typography
        size={size}
        type="paragraph"
        text={value}
        color={
          active || optionState === "pressed"
            ? Colors.basic.white
            : Colors.neutral[1000]
        }
        align="center"
        fontWeight={"400Regular"}
      />
    </Option>
  );
}

export default DropdownOption;
