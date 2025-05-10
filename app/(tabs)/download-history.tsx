import { GestureHandlerRootView } from "react-native-gesture-handler";

import { useCanAccessResources, useScreenDimensions } from "@/lib/hooks";

import { DownloadsTemplate } from "@/components/templates";
import { ExpiredAccessBox, LoadingBox } from "@/components/molecules";

import { PageContent, RootContainerView } from "@/styles/GlobalStyles.style";

function SettingsScreen(): JSX.Element {
  const size = useScreenDimensions();
  const { isExpiredAccess, loadingSubscription, t } = useCanAccessResources();

  return (
    <GestureHandlerRootView>
      <RootContainerView>
        <PageContent size={size}>
          {loadingSubscription ? (
            <LoadingBox
              size={size}
              message={t(
                "download-history-screen-translations.subs-checking-loading-msg"
              )}
            />
          ) : isExpiredAccess ? (
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
