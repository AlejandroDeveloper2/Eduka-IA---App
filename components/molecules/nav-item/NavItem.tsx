import { Ionicons } from "@expo/vector-icons";

import { SizeType } from "@/lib/types";

import { Colors } from "@/lib/constants/Colors";

import { ButtonStyleManager } from "@/lib/utils";
import { useAnimatedNavItem } from "@/lib/hooks";

import { Typography } from "@/components/atoms";

import { NavItemBox, NavPressable } from "./NavItem.style";

interface NavItemProps {
  label?: string;
  size: SizeType;
  iconName: keyof typeof Ionicons.glyphMap;
  active: boolean;
  disabled?: boolean;
  onPress: () => void;
}

const NavItem = ({
  label,
  size,
  iconName,
  active,
  disabled,
  onPress,
}: NavItemProps): JSX.Element => {
  const { animatedStyle, toggleOptionState } = useAnimatedNavItem(active);

  return (
    <NavItemBox>
      <NavPressable
        size={size}
        style={[ButtonStyleManager.getButtonShadow(), animatedStyle]}
        onPressIn={() => toggleOptionState("pressed")}
        onPressOut={() => toggleOptionState("default")}
        onPress={onPress}
        disabled={disabled}
      >
        <Ionicons
          name={iconName}
          size={size === "Large" ? 24 : 20}
          color={
            disabled
              ? Colors.neutral[700]
              : active
              ? Colors.basic.white
              : Colors.neutral[1000]
          }
        />
      </NavPressable>
      {label && (
        <Typography
          size={size}
          type="caption"
          text={label}
          color={Colors.neutral[1000]}
          align="center"
          fontWeight="400Regular"
        />
      )}
    </NavItemBox>
  );
};

export default NavItem;
