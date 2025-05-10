import { useSubscriptionContext } from "@/lib/context/subscription-context/SubscriptionContext";

import { useScreenDimensions, useTranslations } from "@/lib/hooks";

import { HomeTemplate, SubscriptionsTemplate } from "@/components/templates";

import { PageContent, RootContainerView } from "@/styles/GlobalStyles.style";
import { LoadingBox } from "@/components/molecules";

export default function HomeScreen() {
  const size = useScreenDimensions();
  const { t } = useTranslations();
  const { loadingSubscription, hasSubscription } = useSubscriptionContext();

  return (
    <RootContainerView>
      <PageContent size={size}>
        {loadingSubscription ? (
          <LoadingBox
            size={size}
            message={t("home-screen-translations.subs-checking-loading-msg")}
          />
        ) : hasSubscription ? (
          <HomeTemplate />
        ) : (
          <SubscriptionsTemplate />
        )}
      </PageContent>
    </RootContainerView>
  );
}
