import { FontSize, ScreenTypeStyle } from "@/lib/types";

export const FontSizes: ScreenTypeStyle<FontSize> = {
  Large: {
    display: 36,
    h1: 28,
    h2: 24,
    button: 20,
    paragraph: 16,
    caption: 12,
  },
  Small: {
    display: 32,
    h1: 26,
    h2: 22,
    button: 18,
    paragraph: 14,
    caption: 10,
  },
};
