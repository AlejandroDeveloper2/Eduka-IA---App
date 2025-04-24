import { ScrollView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Colors } from "@/lib/constants/Colors";

import useHomeTemplateLogic from "@/lib/hooks/core/useHomeTemplateLogic";

import {
  Loader,
  LoadingBox,
  NoConnectedBox,
  ScreenSection,
} from "@/components/molecules";
import { GenerateResourceForm } from "@/components/organisms";
import IaResponseTemplate from "../ia-response-template/IaResponseTemplate";

import { ScrollViewStyles } from "./HomeTemplate.style";

const HomeTemplate = (): JSX.Element => {
  const {
    networkState,
    t,
    size,
    scrollViewRef,
    tabBarHeight,
    isEditing,
    isGenerating,
    generatedEducativeResource,
    loadPercentage,
    progress,
    scaleValue,
  } = useHomeTemplateLogic();

  return (
    <>
      {isGenerating ? (
        <Loader
          title={t("home-screen-translations.loader-title")}
          description={t("home-screen-translations.loader-description")}
          iconName="robot-happy-outline"
          size={size}
          loadPercentage={loadPercentage}
          progress={progress}
          scaleValue={scaleValue}
        />
      ) : (
        <ScrollView
          ref={scrollViewRef}
          style={ScrollViewStyles.ScrollHomeContent}
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            justifyContent: "flex-start",
            paddingBottom: tabBarHeight + 16,
          }}
        >
          <ScreenSection
            title={t("home-screen-translations.screen-title")}
            description={t("home-screen-translations.screen-description")}
            Icon={() => (
              <MaterialCommunityIcons
                name="robot-happy-outline"
                size={32}
                color={Colors.primary[400]}
              />
            )}
            size={size}
          />
          {networkState.isConnected === undefined ? (
            <LoadingBox size={size} message={t("network-state-loading-msg")} />
          ) : networkState.isConnected === false ? (
            <NoConnectedBox size={size} />
          ) : generatedEducativeResource && !isEditing ? (
            <IaResponseTemplate />
          ) : (
            <GenerateResourceForm scrollViewRef={scrollViewRef} />
          )}
        </ScrollView>
      )}
    </>
  );
};

export default HomeTemplate;
