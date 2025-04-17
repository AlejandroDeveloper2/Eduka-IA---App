import { MyResourcesTemplate } from "@/components/templates";

import { useScreenDimensions } from "@/lib/hooks";

import { PageContent, RootContainerView } from "@/styles/GlobalStyles.style";

function MyResourcesScreen(): JSX.Element {
  const size = useScreenDimensions();

  return (
    <RootContainerView>
      <PageContent size={size}>
        <MyResourcesTemplate />
      </PageContent>
    </RootContainerView>
  );
}

export default MyResourcesScreen;
