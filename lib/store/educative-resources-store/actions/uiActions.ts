import { StateCreator } from "zustand";

import { EducativeResourceStoreType, UIActions } from "../store-type";
import { EducativeResource } from "@/lib/types/dataTypes";

import {
  checkSelectedResources,
  getSelectionResult,
  updateSelectedResources,
} from "../helpers";

export const uiActions: StateCreator<
  EducativeResourceStoreType,
  [],
  [],
  UIActions
> = (set) => ({
  selectEducativeResource: (educativeResource: EducativeResource): void => {
    set(({ selectedResources }) => {
      const isAlreadySelected = checkSelectedResources(
        educativeResource,
        selectedResources
      );

      const updatedSelectedResources = updateSelectedResources(
        educativeResource,
        selectedResources
      );

      return getSelectionResult(
        isAlreadySelected,
        educativeResource,
        selectedResources,
        updatedSelectedResources
      );
    });
  },

  selectAllEducativeResource: (selectAll: boolean): void => {
    set(({ educativeResources }) =>
      selectAll
        ? { selectedResources: educativeResources }
        : { selectedResources: [] }
    );
  },

  activeSelectionMode: (): void => {
    set({ selectionMode: true });
  },

  exitSelectionMode: (): void => {
    set({ selectionMode: false, selectedResources: [] });
  },
});
