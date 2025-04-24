import { useEffect, useState } from "react";
import { ListRenderItemInfo } from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import { SizeType } from "@/lib/types";
import { DownloadedFileInfo } from "@/lib/types/dataTypes";

import {
  useAnimatedPopUp,
  useDownloadsHistoryStore,
  useLoading,
  useScreenDimensions,
  useTranslations,
} from "..";

import { FileCard } from "@/components/organisms";

const useDownloadsTemplateLogic = () => {
  const [fileData, setFileData] = useState<DownloadedFileInfo | null>(null);

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

  const { isMounted, animatedPopUpStyle, openPopUp, closePopUp } =
    useAnimatedPopUp();

  useEffect(() => {
    findDownloadedResources(toggleLoading);
  }, []);

  const handleFileData = (data: DownloadedFileInfo): void => {
    setFileData(data);
  };

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
        openPopUp={openPopUp}
        handleFileData={handleFileData}
        onPressFile={() => shareResource(resource.fileUri)}
        onDeleteFile={() => removeDownloadedResource(resource.fileUri)}
      />
    );
  };

  return {
    fileData,
    size,
    tabBarHeight,
    t,
    downloadedResources,
    handleFileData,
    keyExtrator,
    isLoading,
    message,
    renderItem,
    isMounted,
    animatedPopUpStyle,
    closePopUp,
  };
};
export default useDownloadsTemplateLogic;
