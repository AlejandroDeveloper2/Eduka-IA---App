import { Ionicons } from "@expo/vector-icons";

import { ButtonStyleManager } from "@/lib/utils";

import BaseButton, { ButtonBaseProps } from "./BaseButton";
import { Typography } from "@/components/atoms";

interface ButtonProps extends Omit<ButtonBaseProps, "children"> {
  label: string;
  iconName: keyof typeof Ionicons.glyphMap;
}

const ButtonWithLabel = ({
  label,
  iconName,
  ...props
}: ButtonProps): JSX.Element => {
  const color: string = ButtonStyleManager.getButtonTextColor(
    props.variant,
    props.disabled
  );

  return (
    <BaseButton {...props}>
      <Ionicons
        name={iconName}
        size={props.size === "Large" ? 24 : 20}
        color={color}
      />
      <Typography
        size={props.size}
        type="paragraph"
        text={label}
        color={color}
        align="center"
        fontWeight="700Bold"
      />
    </BaseButton>
  );
};

export default ButtonWithLabel;
