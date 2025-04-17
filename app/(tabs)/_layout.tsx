import { Tabs } from "expo-router";

import useTabLayoutLogic from "@/lib/hooks/core/useTabLayoutLogic";

import { Navigation, Header, PopUp, Alert } from "@/components/organisms";

export default function TabLayout(): JSX.Element {
  const {
    size,
    selectedResources,
    isMounted,
    animatedPopUpStyle,
    closePopUp,
    dynamicNavItems,
    isRemovingProcessing,
    handleRemoveResources,
    t,
  } = useTabLayoutLogic();

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: true,
          header: () => <Header size={size} />,
        }}
        tabBar={(props) => (
          <Navigation
            size={size}
            myResourcesActions={
              selectedResources.length > 0 ? dynamicNavItems : []
            }
            {...props}
          />
        )}
      />
      <PopUp
        title={t(
          "my-resources-screen-translations.delete-resources-pop-up-title"
        )}
        size={size}
        isMounted={isMounted}
        animatedPopUpStyle={animatedPopUpStyle}
        closePopUp={closePopUp}
      >
        <Alert
          isLoading={isRemovingProcessing}
          message={t(
            "my-resources-screen-translations.delete-resources-pop-up-msg"
          )}
          acceptBtnText={t(
            "my-resources-screen-translations.delete-resources-pop-up-btn-label"
          )}
          size={size}
          iconName="trash-outline"
          closePopUp={closePopUp}
          onAcceptAction={handleRemoveResources}
        />
      </PopUp>
    </>
  );
}
