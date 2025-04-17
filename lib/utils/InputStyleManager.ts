import { Platform } from "react-native";

import { SizeType } from "@/lib/types";

import { Spacing } from "@/lib/constants/Spacing";

export class InputStyleManager {
  public static getInputInlinePadding(size: SizeType): number {
    const inlinePadding: number =
      size === "Large" ? Spacing.spacing_xl : Spacing.spacing_lg;
    return inlinePadding;
  }

  public static getInputVerticalPadding = (size: SizeType): number => {
    const verticalPadding: number =
      size === "Large" ? Spacing.spacing_lg : Spacing.spacing_md;
    return verticalPadding;
  };
  public static getInputShadow = () => {
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
