import { useEffect, useState } from "react";
import { ListRenderItemInfo } from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import { SizeType } from "@/lib/types";
import { EducativeResource } from "@/lib/types/dataTypes";

import {
  useAnimatedLoader,
  useAnimatedPopUp,
  useEducativeResourcesStore,
  useFilter,
  useLoader,
  useLoading,
  useScreenDimensions,
  useTranslations,
} from "..";

import { SourceCard } from "@/components/organisms";

const useMyResourcesTemplateLogic = () => {
  const [resourceData, setResourceData] = useState<EducativeResource | null>(
    null
  );
  const [editionMode, setEditionMode] = useState<boolean>(false);

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

  const { isMounted, animatedPopUpStyle, openPopUp, closePopUp } =
    useAnimatedPopUp();

  useEffect(() => {
    findEducativeResources(selectedFilter, toggleLoading);
  }, [selectedFilter]);

  const handleResourceData = (data: EducativeResource): void => {
    setResourceData(data);
  };

  const toggleEditionMode = (mode: boolean): void => {
    setEditionMode(mode);
  };

  const keyExtrator = (item: unknown) => {
    const resource = item as EducativeResource;
    return resource.resourceId;
  };

  const renderItem = (item: ListRenderItemInfo<unknown>) => {
    const resource = item.item as EducativeResource;
    return (
      <SourceCard
        size={size}
        resourceData={resource}
        openPopUp={openPopUp}
        handleResourceData={handleResourceData}
        toggleEditionMode={toggleEditionMode}
      />
    );
  };

  return {
    resourceData,
    editionMode,
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
    isMounted,
    animatedPopUpStyle,
    closePopUp,
  };
};

export default useMyResourcesTemplateLogic;
