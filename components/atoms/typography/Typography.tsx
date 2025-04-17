import { AlignTextType, FontType, FontWeigthType, SizeType } from "@/lib/types";

import { useFont } from "@/lib/context/FontContext";

import { FontText } from "./Typography.style";

interface TypographyProps {
  size: SizeType;
  type: FontType;
  text: string;
  color: string;
  align: AlignTextType;
  fontWeight: FontWeigthType;
}

export default function Typography({
  text,
  ...props
}: TypographyProps): JSX.Element {
  const { fontsLoaded } = useFont();

  return (
    <FontText fontsLoaded={fontsLoaded} {...props}>
      {text}
    </FontText>
  );
}
