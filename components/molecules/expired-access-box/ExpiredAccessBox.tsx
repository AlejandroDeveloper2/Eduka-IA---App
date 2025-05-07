import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { SizeType } from "@/lib/types";

import { Colors } from "@/lib/constants/Colors";

import { useTranslations } from "@/lib/hooks";

import ScreenSection from "../screen-section/ScreenSection";
import ButtonWithLabel from "../button/ButtonWithLabel";

import { BoxContainer } from "./ExpiredAccessBox.style";

interface ExpiredAccessBoxProps {
  size: SizeType;
}

const ExpiredAccessBox = ({ size }: ExpiredAccessBoxProps): JSX.Element => {
  const router = useRouter();

  const { t } = useTranslations();

  return (
    <BoxContainer>
      <ScreenSection
        title={t("expired-access-box-labels.title")}
        description={t("expired-access-box-labels.description")}
        Icon={() => (
          <Ionicons
            name="information-circle-outline"
            color={Colors.primary[400]}
            size={size === "Large" ? 36 : 32}
          />
        )}
        size={size}
      />
      <ButtonWithLabel
        label={t("expired-access-box-labels.button-label")}
        iconName="star-outline"
        size={size}
        variant="primary"
        width="fill"
        onPress={() => router.navigate("/")}
      />
    </BoxContainer>
  );
};

export default ExpiredAccessBox;
