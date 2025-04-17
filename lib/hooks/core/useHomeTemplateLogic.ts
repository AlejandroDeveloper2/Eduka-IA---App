import { useRef } from "react";
import { ScrollView } from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useNetworkState } from "expo-network";

import {
  useAnimatedLoader,
  useEducativeResourcesStore,
  useLoader,
  useScreenDimensions,
  useTranslations,
} from "..";

const useHomeTemplateLogic = () => {
  const networkState = useNetworkState();

  const { t } = useTranslations();

  const size = useScreenDimensions();

  const scrollViewRef = useRef<ScrollView>(null);

  const tabBarHeight = useBottomTabBarHeight();

  const { isGenerating, isEditing, generatedEducativeResource, duration } =
    useEducativeResourcesStore();

  const loadPercentage = useLoader(isGenerating, duration);
  const { progress, scaleValue } = useAnimatedLoader(
    loadPercentage,
    isGenerating
  );

  return {
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
  };
};

export default useHomeTemplateLogic;
