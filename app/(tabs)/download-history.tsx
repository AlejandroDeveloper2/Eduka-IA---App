import { GestureHandlerRootView } from "react-native-gesture-handler";

import { useScreenDimensions } from "@/lib/hooks";

import { DownloadsTemplate } from "@/components/templates";

import { PageContent, RootContainerView } from "@/styles/GlobalStyles.style";

function SettingsScreen(): JSX.Element {
  const size = useScreenDimensions();
  return (
    <GestureHandlerRootView>
      <RootContainerView>
        <PageContent size={size}>
          <DownloadsTemplate />
        </PageContent>
      </RootContainerView>
    </GestureHandlerRootView>
  );
}

export default SettingsScreen;
