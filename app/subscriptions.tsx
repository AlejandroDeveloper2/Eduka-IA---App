import { Ionicons } from "@expo/vector-icons";

import { Colors } from "@/lib/constants/Colors";

import { useScreenDimensions, useTranslations } from "@/lib/hooks";

import { ScreenSection } from "@/components/molecules";
import { SubscriptionPlans } from "@/components/organisms";

import { PageContent, RootContainerView } from "@/styles/GlobalStyles.style";

export default function Subscriptions(): JSX.Element {
  const size = useScreenDimensions();
  const { t } = useTranslations();

  return (
    <RootContainerView>
      <PageContent size={size}>
        <ScreenSection
          title={t("subscriptions-screen-labels.screen-title")}
          description={t("subscriptions-screen-labels.screen-description")}
          Icon={() => (
            <Ionicons
              name="star-outline"
              size={32}
              color={Colors.primary[400]}
            />
          )}
          size={size}
        />
        <SubscriptionPlans size={size} />
      </PageContent>
    </RootContainerView>
  );
}
