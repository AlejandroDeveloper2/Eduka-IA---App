import { useEffect } from "react";
import { ListRenderItemInfo } from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import { SizeType } from "@/lib/types";
import { EducativeResource } from "@/lib/types/dataTypes";

import {
  useAnimatedLoader,
  useEducativeResourcesStore,
  useFilter,
  useLoader,
  useLoading,
  useScreenDimensions,
  useTranslations,
} from "..";

import { SourceCard } from "@/components/organisms";

const useMyResourcesTemplateLogic = () => {
  const size: SizeType = useScreenDimensions();

  const tabBarHeight = useBottomTabBarHeight();

  const { t } = useTranslations();

  const { isLoading, message, toggleLoading } = useLoading();

  const { selectedFilter, onSelectFilter } = useFilter("All");

  const {
    educativeResources,
    isDownloading,
    duration,
    findEducativeResources,
  } = useEducativeResourcesStore();

  const loadPercentage = useLoader(isDownloading, duration);
  const { progress, scaleValue } = useAnimatedLoader(
    loadPercentage,
    isDownloading
  );

  useEffect(() => {
    findEducativeResources(selectedFilter, toggleLoading);
  }, [selectedFilter]);

  const keyExtrator = (item: unknown) => {
    const resource = item as EducativeResource;
    return resource.resourceId;
  };

  const renderItem = (item: ListRenderItemInfo<unknown>) => {
    const resource = item.item as EducativeResource;
    return <SourceCard size={size} resourceData={resource} />;
  };

  return {
    size,
    tabBarHeight,
    t,
    isLoading,
    message,
    onSelectFilter,
    selectedFilter,
    educativeResources,
    isDownloading,
    loadPercentage,
    progress,
    scaleValue,
    keyExtrator,
    renderItem,
  };
};

export default useMyResourcesTemplateLogic;
