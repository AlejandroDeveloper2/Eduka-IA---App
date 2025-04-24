import { EducativeResource } from "@/lib/types/dataTypes";

import {
  useAnimatedResourceCard,
  useEducativeResourcesStore,
  useTranslations,
} from "..";

const useSourceCardLogic = (
  resourceData: EducativeResource,
  openPopUp: () => void,
  handleResourceData: (data: EducativeResource) => void,
  toggleEditionMode: (mode: boolean) => void
) => {
  const { t } = useTranslations();

  const format = resourceData.formatOption.key;

  const { selectionMode, activeSelectionMode, selectEducativeResource } =
    useEducativeResourcesStore();

  const animatedCardStyle =
    useAnimatedResourceCard(resourceData).animatedCardStyle;

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
    handleResourceData(resourceData);
    toggleEditionMode(false);
    openPopUp();
  };

  const activeEditionMode = (): void => {
    handleResourceData(resourceData);
    openPopUp();
    toggleEditionMode(true);
  };

  return {
    t,
    format,
    animatedCardStyle,
    toggleActiveSelectionMode,
    onSelectResource,
    activeEditionMode,
  };
};

export default useSourceCardLogic;
