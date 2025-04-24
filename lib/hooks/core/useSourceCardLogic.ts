import { useState } from "react";

import { EducativeResource } from "@/lib/types/dataTypes";

import {
  useAnimatedPopUp,
  useAnimatedResourceCard,
  useEducativeResourcesStore,
  useTranslations,
} from "..";

const useSourceCardLogic = (resourceData: EducativeResource) => {
  const [editionMode, setEditionMode] = useState<boolean>(false);
  const { t } = useTranslations();

  const format = resourceData.formatOption.key;

  const { selectionMode, activeSelectionMode, selectEducativeResource } =
    useEducativeResourcesStore();

  const animatedCardStyle =
    useAnimatedResourceCard(resourceData).animatedCardStyle;

  const { isMounted, animatedPopUpStyle, openPopUp, closePopUp } =
    useAnimatedPopUp();

  const toggleActiveSelectionMode = (): void => {
    if (!selectionMode) {
      activeSelectionMode();

      setTimeout(() => {
        selectEducativeResource(resourceData);
      }, 0);
    }
  };

  const onSelectResource = (): void => {
    if (selectionMode) {
      selectEducativeResource(resourceData);
      return;
    }
    setEditionMode(false);
    openPopUp();
  };

  const activeEditionMode = (): void => {
    openPopUp();
    setEditionMode(true);
  };

  return {
    editionMode,
    t,
    format,
    animatedCardStyle,
    isMounted,
    animatedPopUpStyle,
    closePopUp,
    toggleActiveSelectionMode,
    onSelectResource,
    activeEditionMode,
    setEditionMode,
  };
};

export default useSourceCardLogic;
