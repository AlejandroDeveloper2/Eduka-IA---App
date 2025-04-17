import { Platform } from "react-native";

import { ButtonWidthType, SizeType, ButtonVariantType } from "@/lib/types";

import { Spacing } from "@/lib/constants/Spacing";
import { Colors } from "@/lib/constants/Colors";

export class ButtonStyleManager {
  public static getButtonWidth(widthValue: ButtonWidthType): string {
    const width: string | number =
      widthValue === "fill"
        ? "100%"
        : widthValue === "auto"
        ? widthValue
        : widthValue + "px";
    return width;
  }

  public static getButtonInlinePadding(size: SizeType): number {
    const inlinePadding: number =
      size === "Large" ? Spacing.spacing_lg : Spacing.spacing_md;
    return inlinePadding;
  }

  public static getButtonVerticalPadding = (size: SizeType): number => {
    const verticalPadding: number =
      size === "Large" ? Spacing.spacing_md : Spacing.spacing_sm;
    return verticalPadding;
  };

  public static getButtonGap = (size: SizeType): number => {
    const buttonGap: number =
      size === "Large" ? Spacing.spacing_xs : Spacing.spacing_2xs;
    return buttonGap;
  };

  public static getButtonTextColor = (
    variant: ButtonVariantType,
    disabled?: boolean
  ): string => {
    const normalColor: string =
      variant === "danger" || variant === "primary"
        ? Colors.basic.white
        : Colors.neutral[1000];
    const disabledColor: string = Colors.neutral[400];

    return disabled ? disabledColor : normalColor;
  };

  public static getDisabledButtonBg = (variant: ButtonVariantType): string => {
    const disabledColor: string =
      Colors[variant][variant === "neutral" ? 25 : 100];
    return disabledColor;
  };

  public static getButtonShadow = () => {
    const platform = Platform.OS;
    if (platform === "android")
      return {
        elevation: 2,
      };
    return {
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    };
  };
}
