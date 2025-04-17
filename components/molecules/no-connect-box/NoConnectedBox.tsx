import { MaterialCommunityIcons } from "@expo/vector-icons";

import { SizeType } from "@/lib/types";

import { Colors } from "@/lib/constants/Colors";

import { useTranslations } from "@/lib/hooks";

import { Typography } from "@/components/atoms";

import { NoConnectedContainer } from "./NoConnectedBox.style";

interface NoConnectedBoxProps {
  size: SizeType;
}

const NoConnectedBox = ({ size }: NoConnectedBoxProps): JSX.Element => {
  const { t } = useTranslations();

  return (
    <NoConnectedContainer>
      <MaterialCommunityIcons
        color={Colors.primary[100]}
        size={52}
        name="wifi-strength-off-outline"
      />
      <Typography
        size={size}
        type="paragraph"
        text={t("no-conected-wifi-label")}
        color={Colors.neutral[900]}
        align="center"
        fontWeight="400Regular"
      />
    </NoConnectedContainer>
  );
};

export default NoConnectedBox;
