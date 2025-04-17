import { EducativeResource } from "@/lib/types/dataTypes";

import {
  useAnimatedPopUp,
  useAnimatedResourceCard,
  useEducativeResourcesStore,
  useTranslations,
} from "..";

const useSourceCardLogic = (resourceData: EducativeResource) => {
  const { t } = useTranslations();

  const format = resourceData.formatOption.key;

  const { selectionMode, activeSelectionMode, selectEducativeResource } =
    useEducativeResourcesStore();

  const animatedCardStyle =
    useAnimatedResourceCard(resourceData).animatedCardStyle;

  const { isMounted, animatedPopUpStyle, openPopUp, closePopUp } =
    useAnimatedPopUp();

  return {
    t,
    format,
    selectionMode,
    activeSelectionMode,
    selectEducativeResource,
    animatedCardStyle,
    isMounted,
    animatedPopUpStyle,
    openPopUp,
    closePopUp,
  };
};

export default useSourceCardLogic;
