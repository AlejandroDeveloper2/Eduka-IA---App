import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import { Colors } from "@/lib/constants/Colors";

import { useScreenDimensions, useTranslations } from "@/lib/hooks";

import { ScreenSection } from "@/components/molecules";
import { SubscriptionPlans } from "@/components/organisms";

import { ScrollViewStyles } from "./SubscriptionsTemplate.style";

const SubscriptionsTemplate = (): JSX.Element => {
  const size = useScreenDimensions();
  const { t } = useTranslations();
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <ScrollView
      style={ScrollViewStyles.ScrollHomeContent}
      contentContainerStyle={{
        justifyContent: "flex-start",
        paddingBottom: tabBarHeight + 16,
      }}
      showsVerticalScrollIndicator={false}
    >
      <ScreenSection
        title={t("subscriptions-screen-labels.screen-title")}
        description={t("subscriptions-screen-labels.screen-description")}
        Icon={() => (
          <Ionicons name="star-outline" size={32} color={Colors.primary[400]} />
        )}
        size={size}
      />
      <SubscriptionPlans size={size} />
    </ScrollView>
  );
};

export default SubscriptionsTemplate;
