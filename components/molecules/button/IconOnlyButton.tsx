import { Ionicons } from "@expo/vector-icons";

import { ButtonStyleManager } from "@/lib/utils";

import BaseButton, { ButtonBaseProps } from "./BaseButton";

interface IconOnlyButtonProps extends Omit<ButtonBaseProps, "children"> {
  iconName: keyof typeof Ionicons.glyphMap;
}

const IconOnlyButton = ({
  iconName,
  ...props
}: IconOnlyButtonProps): JSX.Element => {
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
    </BaseButton>
  );
};

export default IconOnlyButton;
