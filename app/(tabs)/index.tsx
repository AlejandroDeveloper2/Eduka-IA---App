import { useSubscriptionContext } from "@/lib/context/SubscriptionContext";

import { useScreenDimensions } from "@/lib/hooks";

import { HomeTemplate, SubscriptionsTemplate } from "@/components/templates";

import { PageContent, RootContainerView } from "@/styles/GlobalStyles.style";

export default function HomeScreen() {
  const size = useScreenDimensions();
  const { hasSubscription } = useSubscriptionContext();

  return (
    <RootContainerView>
      <PageContent size={size}>
        {hasSubscription ? <HomeTemplate /> : <SubscriptionsTemplate />}
      </PageContent>
    </RootContainerView>
  );
}
