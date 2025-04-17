import { SizeType } from "@/lib/types";

import { Colors } from "@/lib/constants/Colors";

import Typography from "../typography/Typography";

import { BadgeBox } from "./Badge.style";

interface BadgeProps {
  label: string;
  size: SizeType;
}

const Badge = ({ label, size }: BadgeProps): JSX.Element => {
  return (
    <BadgeBox size={size}>
      <Typography
        size={size}
        type="caption"
        text={label}
        color={Colors.basic.white}
        align="center"
        fontWeight="400Regular"
      />
    </BadgeBox>
  );
};

export default Badge;
