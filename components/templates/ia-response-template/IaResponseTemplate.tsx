import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

import { Colors } from "@/lib/constants/Colors";
import { Spacing } from "@/lib/constants/Spacing";

import {
  useEducativeResourcesStore,
  useScreenDimensions,
  useTranslations,
} from "@/lib/hooks";

import { Subtitle } from "@/components/atoms";
import { ButtonWithLabel } from "@/components/molecules";
import { IaResponseBox } from "@/components/organisms";

const IaResponseTemplate = (): JSX.Element => {
  const { t } = useTranslations();
  const size = useScreenDimensions();

  const { cleanGeneratedResponse } = useEducativeResourcesStore();

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        gap: Spacing.spacing_lg,
        marginTop: Spacing.spacing_lg,
      }}
    >
      <Subtitle
        subTitle={t("home-screen-translations.ia-result-section-title")}
        size={size}
        Icon={() => (
          <Ionicons
            name="star-outline"
            size={size === "Large" ? 32 : 28}
            color={Colors.primary[400]}
          />
        )}
      />
      <IaResponseBox size={size} />
      <ButtonWithLabel
        label={t("home-screen-translations.ia-result-section-btn-label")}
        iconName="bulb-outline"
        size={size}
        width="fill"
        variant="primary"
        onPress={cleanGeneratedResponse}
      />
    </View>
  );
};

export default IaResponseTemplate;
