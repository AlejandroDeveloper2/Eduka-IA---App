import { SizeType } from "@/lib/types";

import { Colors } from "@/lib/constants/Colors";

import { Typography } from "@/components/atoms";

import { InfoCardBox } from "./InfoCard.style";
import { Ionicons } from "@expo/vector-icons";

interface InfoCardProps {
  description: string;
  size: SizeType;
}

const InfoCard = ({ description, size }: InfoCardProps): JSX.Element => {
  return (
    <InfoCardBox size={size}>
      <Ionicons
        name="information-outline"
        color={Colors.neutral[900]}
        size={size === "Large" ? 32 : 24}
      />
      <Typography
        size={size}
        type="caption"
        text={description}
        color={Colors.neutral[900]}
        align="left"
        fontWeight="400Regular"
      />
    </InfoCardBox>
  );
};

export default InfoCard;
