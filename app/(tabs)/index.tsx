import { useSubscriptionContext } from "@/lib/context/subscription-context/SubscriptionContext";

import { useScreenDimensions } from "@/lib/hooks";

import { HomeTemplate, SubscriptionsTemplate } from "@/components/templates";

import { PageContent, RootContainerView } from "@/styles/GlobalStyles.style";
import { LoadingBox } from "@/components/molecules";

export default function HomeScreen() {
  const size = useScreenDimensions();
  const { loadingSubscription, hasSubscription } = useSubscriptionContext();

  return (
    <RootContainerView>
      <PageContent size={size}>
        {loadingSubscription ? (
          <LoadingBox size={size} message="..." />
        ) : hasSubscription ? (
          <HomeTemplate />
        ) : (
          <SubscriptionsTemplate />
        )}
      </PageContent>
    </RootContainerView>
  );
}
