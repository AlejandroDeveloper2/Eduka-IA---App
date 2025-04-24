import { useCallback, useMemo } from "react";

import { MyResourcesActions } from "@/lib/constants/NavItems";

import {
  useAnimatedPopUp,
  useBackgroundTaskStore,
  useEducativeResourcesStore,
  useScreenDimensions,
  useTaskRunner,
  useTranslations,
} from "@/lib/hooks";

import { generateUniqueId } from "@/lib/utils";

const useTabLayoutLogic = () => {
  const { t, language } = useTranslations();

  const size = useScreenDimensions();

  const {
    selectedResources,
    downloadEducativeResources,
    removeEducativeResources,
  } = useEducativeResourcesStore();

  const { isMounted, animatedPopUpStyle, openPopUp, closePopUp } =
    useAnimatedPopUp();

  const { addTask } = useBackgroundTaskStore();
  const { isProcessing, runTask } = useTaskRunner();
  const { isProcessing: isRemovingProcessing, runTask: runRemoveTask } =
    useTaskRunner();

  const handleDownloadResources = useCallback(() => {
    const taskId = generateUniqueId();
    addTask({
      id: taskId,
      name: t("background-task-messages.download-resources-task-name"),
      type: "download",
      progress: 0,
      status: "pending",
    });
    runTask(
      taskId,
      "download",
      t("background-task-messages.download-resources-task-name"),
      downloadEducativeResources
    );
  }, [addTask, runTask, downloadEducativeResources, t]);

  const handleRemoveResources = useCallback(() => {
    const taskId = generateUniqueId();
    addTask({
      id: taskId,
      name: t("background-task-messages.remove-task-name"),
      type: "remove",
      progress: 0,
      status: "pending",
    });
    runRemoveTask(
      taskId,
      "remove",
      t("background-task-messages.remove-task-name"),
      removeEducativeResources
    );
  }, [addTask, runRemoveTask, removeEducativeResources, t]);

  const dynamicNavItems = useMemo(() => {
    return MyResourcesActions[language].map((navAction, i) => ({
      ...navAction,
      disabled: isProcessing || isRemovingProcessing,
      onPress: i === 0 ? handleDownloadResources : openPopUp,
    }));
  }, [
    language,
    isProcessing,
    isRemovingProcessing,
    handleDownloadResources,
    openPopUp,
  ]);

  return {
    size,
    selectedResources,
    isMounted,
    animatedPopUpStyle,
    openPopUp,
    closePopUp,
    dynamicNavItems,
    isRemovingProcessing,
    handleRemoveResources,
    t,
  };
};

export default useTabLayoutLogic;
