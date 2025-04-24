import { useEffect } from "react";
import { ListRenderItemInfo } from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import { SizeType } from "@/lib/types";
import { DownloadedFileInfo } from "@/lib/types/dataTypes";

import {
  useDownloadsHistoryStore,
  useLoading,
  useScreenDimensions,
  useTranslations,
} from "..";

import { FileCard } from "@/components/organisms";

const useDownloadsTemplateLogic = () => {
  const size: SizeType = useScreenDimensions();

  const tabBarHeight = useBottomTabBarHeight();

  const { t } = useTranslations();

  const {
    downloadedResources,
    findDownloadedResources,
    shareResource,
    removeDownloadedResource,
  } = useDownloadsHistoryStore();

  const { isLoading, message, toggleLoading } = useLoading();

  useEffect(() => {
    findDownloadedResources(toggleLoading);
  }, []);

  const keyExtrator = (item: unknown) => {
    const downloadedFile = item as DownloadedFileInfo;
    return downloadedFile.name;
  };

  const renderItem = (item: ListRenderItemInfo<unknown>) => {
    const resource = item.item as DownloadedFileInfo;
    return (
      <FileCard
        key={resource.name}
        size={size}
        fileInfo={resource}
        onPressFile={() => shareResource(resource.fileUri)}
        onDeleteFile={() => removeDownloadedResource(resource.fileUri)}
      />
    );
  };

  return {
    size,
    tabBarHeight,
    t,
    downloadedResources,
    keyExtrator,
    isLoading,
    message,
    renderItem,
  };
};
export default useDownloadsTemplateLogic;
