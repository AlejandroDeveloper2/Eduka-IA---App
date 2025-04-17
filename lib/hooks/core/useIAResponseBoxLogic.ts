import { getResourceFormatInfo } from "@/lib/utils";

import {
  useAnimatedPopUp,
  useBackgroundTaskStore,
  useEducativeResourcesStore,
  useLoading,
  useTaskRunner,
  useTranslations,
} from "..";

const useIAResponseBoxLogic = () => {
  const { t } = useTranslations();

  const {
    generatedEducativeResource,
    regenerateEducativeResource,
    downloadSingleResource,
    editResourceRequest,
  } = useEducativeResourcesStore();

  const { addTask } = useBackgroundTaskStore();
  const { isProcessing, runTask } = useTaskRunner();

  const { isLoading, toggleLoading } = useLoading();

  const {
    isMounted,
    // gesture,
    animatedPopUpStyle,
    closePopUp,
    openPopUp,
  } = useAnimatedPopUp();

  const { formatKey, formatText } = getResourceFormatInfo(
    generatedEducativeResource
  );

  const generatedContent: string = generatedEducativeResource
    ? generatedEducativeResource.content
    : t("home-screen-translations.ia-result-no-content-generated-text");

  return {
    t,
    generatedEducativeResource,
    regenerateEducativeResource,
    downloadSingleResource,
    editResourceRequest,
    addTask,
    isProcessing,
    runTask,
    isLoading,
    toggleLoading,
    isMounted,
    animatedPopUpStyle,
    closePopUp,
    openPopUp,
    formatKey,
    formatText,
    generatedContent,
  };
};

export default useIAResponseBoxLogic;
