import { ReactNode } from "react";

import { SizeType } from "@/lib/types";

import { Colors } from "@/lib/constants/Colors";

import Typography from "../typography/Typography";

import { SectionSubtitle } from "./Subtitle.style";

interface SubtitleProps {
  subTitle: string;
  Icon: () => ReactNode;
  size: SizeType;
}

const Subtitle = ({ subTitle, Icon, size }: SubtitleProps): JSX.Element => {
  return (
    <SectionSubtitle>
      <Icon />
      <Typography
        size={size}
        type="button"
        text={subTitle}
        color={Colors.neutral[1000]}
        align="center"
        fontWeight="400Regular"
      />
    </SectionSubtitle>
  );
};

export default Subtitle;
