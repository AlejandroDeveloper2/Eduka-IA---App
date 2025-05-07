import { GestureHandlerRootView } from "react-native-gesture-handler";

import { useCanAccessResources, useScreenDimensions } from "@/lib/hooks";

import { DownloadsTemplate } from "@/components/templates";
import { ExpiredAccessBox } from "@/components/molecules";

import { PageContent, RootContainerView } from "@/styles/GlobalStyles.style";

function SettingsScreen(): JSX.Element {
  const size = useScreenDimensions();
  const { isExpiredAccess } = useCanAccessResources();

  return (
    <GestureHandlerRootView>
      <RootContainerView>
        <PageContent size={size}>
          {isExpiredAccess ? (
            <ExpiredAccessBox size={size} />
          ) : (
            <DownloadsTemplate />
          )}
        </PageContent>
      </RootContainerView>
    </GestureHandlerRootView>
  );
}

export default SettingsScreen;
