import { ExpiredAccessBox } from "@/components/molecules";
import { MyResourcesTemplate } from "@/components/templates";

import { useCanAccessResources, useScreenDimensions } from "@/lib/hooks";

import { PageContent, RootContainerView } from "@/styles/GlobalStyles.style";

function MyResourcesScreen(): JSX.Element {
  const size = useScreenDimensions();
  const { isExpiredAccess } = useCanAccessResources();

  return (
    <RootContainerView>
      <PageContent size={size}>
        {isExpiredAccess ? (
          <ExpiredAccessBox size={size} />
        ) : (
          <MyResourcesTemplate />
        )}
      </PageContent>
    </RootContainerView>
  );
}

export default MyResourcesScreen;
