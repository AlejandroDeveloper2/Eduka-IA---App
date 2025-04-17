import styled from "styled-components/native";

import { AlignTextType, FontType, FontWeigthType, SizeType } from "@/lib/types";

import { FontSizes } from "@/lib/constants/FontSizes";

import { getFontFamily } from "@/lib/utils";

type TypographyStyle = {
  size: SizeType;
  type: FontType;
  color: string;
  align: AlignTextType;
  fontWeight: FontWeigthType;
  fontsLoaded: boolean;
};

const FontText = styled.Text<TypographyStyle>`
  color: ${({ color }: TypographyStyle) => color};
  font-size: ${({ type, size }: TypographyStyle) =>
    FontSizes[size][type] + "px"};
  font-style: normal;
  text-decoration: none;
  text-align: ${({ align }: TypographyStyle) => align};
  font-family: ${({ fontWeight, fontsLoaded }: TypographyStyle) =>
    getFontFamily(fontWeight, fontsLoaded)};
  white-space: pre-wrap;
`;

export { FontText };
