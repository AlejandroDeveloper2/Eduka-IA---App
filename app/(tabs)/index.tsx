import { HomeTemplate } from "@/components/templates";

import { useScreenDimensions } from "@/lib/hooks";

import { PageContent, RootContainerView } from "@/styles/GlobalStyles.style";

export default function HomeScreen() {
  const size = useScreenDimensions();

  return (
    <RootContainerView>
      <PageContent size={size}>
        <HomeTemplate />
      </PageContent>
    </RootContainerView>
  );
}
