type SpacingNamesType =
  | "null"
  | "4xs"
  | "3xs"
  | "2xs"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl";
type RadiusValuesType = "null" | "sm" | "md" | "lg" | "rounded" | "pilled";
type FontType = "display" | "h1" | "h2" | "button" | "paragraph" | "caption";
type AlignTextType = "center" | "left" | "right" | "justify";
type FontWeigthType = "700Bold" | "500Medium" | "400Regular" | "300Light";

type ButtonVariantType = "primary" | "danger" | "neutral";
type ButtonWidthType = number | "fill" | "auto";
type ButtonStateType = "default" | "pressed";
type OptionStateType = "default" | "pressed" | "active";

type SizeType = "Large" | "Small";

interface SpacingStyle {
  spacing_null: number;
  spacing_4xs: number;
  spacing_3xs: number;
  spacing_2xs: number;
  spacing_xs: number;
  spacing_sm: number;
  spacing_md: number;
  spacing_lg: number;
  spacing_xl: number;
  spacing_2xl: number;
  spacing_3xl: number;
  spacing_4xl: number;
}

interface RadiusStyle {
  radius_null: number;
  radius_sm: number;
  radius_md: number;
  radius_lg: number;
  radius_pilled: number;
  radius_rounded: string;
}

interface FontSize {
  display: number;
  h1: number;
  h2: number;
  button: number;
  paragraph: number;
  caption: number;
}

interface ColorSchema {
  primary: {
    "25": string;
    "50": string;
    "100": string;
    "200": string;
    "300": string;
    "400": string;
    "500": string;
    "600": string;
    "700": string;
    "800": string;
    "900": string;
  };
  danger: {
    "25": string;
    "50": string;
    "100": string;
    "200": string;
    "300": string;
    "400": string;
    "500": string;
    "600": string;
    "700": string;
    "800": string;
    "900": string;
  };
  neutral: {
    "0": string;
    "25": string;
    "50": string;
    "100": string;
    "200": string;
    "300": string;
    "400": string;
    "500": string;
    "600": string;
    "700": string;
    "800": string;
    "900": string;
    "1000": string;
  };
  basic: {
    white: string;
    black: string;
  };
}

interface ScreenTypeStyle<T> {
  Large: T;
  Small: T;
}

export {
  SpacingNamesType,
  RadiusValuesType,
  FontType,
  AlignTextType,
  FontWeigthType,
  ButtonVariantType,
  ButtonStateType,
  SizeType,
  ButtonWidthType,
  OptionStateType,
  SpacingStyle,
  RadiusStyle,
  FontSize,
  ColorSchema,
  ScreenTypeStyle,
  FilterOption,
};
