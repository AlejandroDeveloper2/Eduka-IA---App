import { ExpiredAccessBox, LoadingBox } from "@/components/molecules";
import { MyResourcesTemplate } from "@/components/templates";

import { useCanAccessResources, useScreenDimensions } from "@/lib/hooks";

import { PageContent, RootContainerView } from "@/styles/GlobalStyles.style";

function MyResourcesScreen(): JSX.Element {
  const size = useScreenDimensions();
  const { isExpiredAccess, loadingSubscription, t } = useCanAccessResources();

  return (
    <RootContainerView>
      <PageContent size={size}>
        {loadingSubscription ? (
          <LoadingBox
            size={size}
            message={t(
              "my-resources-screen-translations.subs-checking-loading-msg"
            )}
          />
        ) : isExpiredAccess ? (
          <ExpiredAccessBox size={size} />
        ) : (
          <MyResourcesTemplate />
        )}
      </PageContent>
    </RootContainerView>
  );
}

export default MyResourcesScreen;
