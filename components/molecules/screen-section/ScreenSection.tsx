import { ReactNode } from "react";

import { SizeType } from "@/lib/types";

import { Colors } from "@/lib/constants/Colors";

import Typography from "../../atoms/typography/Typography";

import { SectionContainer, SectionTitle } from "./ScreenSection.style";

interface ScreenSectionProps {
  title: string;
  description: string;
  Icon: () => ReactNode;
  size: SizeType;
}

const ScreenSection = ({
  title,
  description,
  Icon,
  size,
}: ScreenSectionProps): JSX.Element => {
  return (
    <SectionContainer>
      <SectionTitle>
        <Icon />
        <Typography
          size={size}
          type="h2"
          text={title}
          color={Colors.neutral[1000]}
          align="center"
          fontWeight="500Medium"
        />
      </SectionTitle>
      <Typography
        size={size}
        type="paragraph"
        text={description}
        color={Colors.neutral[900]}
        align="left"
        fontWeight="400Regular"
      />
    </SectionContainer>
  );
};

export default ScreenSection;
