import { StateCreator } from "zustand";
import { Toast } from "toastify-react-native";

import { EducativeResourceStoreType, ManagementActions } from "../store-type";
import { EducativeResource, ListFilter } from "@/lib/types/dataTypes";

import { i18n } from "@/lib/store/lang-store/Lang.store";

import { AsyncStorageService } from "@/services/AsyncStorage.service";

import { zipImageBase64 } from "@/lib/utils";

const storageKey: string = "educative-resources";

export const managementActions: StateCreator<
  EducativeResourceStoreType,
  [],
  [],
  ManagementActions
> = (set, get) => ({
  saveEducativeResource: async (
    newEducativeResource: EducativeResource,
    toggleLoading: (message: string | null, isLoading: boolean) => void
  ): Promise<void> => {
    try {
      const format = newEducativeResource.formatOption.key;
      let compressedBase64Image: string = "";

      toggleLoading(i18n.t("operations-messages.saving-resource-msg"), true);

      if (format === "Image") {
        compressedBase64Image = await zipImageBase64(
          newEducativeResource.content.split(",")[1]
        );
      }

      const educativeResources = await AsyncStorageService.getItem<
        EducativeResource[]
      >(storageKey);

      if (!educativeResources) {
        await AsyncStorageService.setItem(storageKey, [
          format === "Image"
            ? { ...newEducativeResource, content: compressedBase64Image }
            : newEducativeResource,
        ]);
        return;
      }

      const updatedEducativeResources: EducativeResource[] = [
        ...educativeResources,
        format === "Image"
          ? { ...newEducativeResource, content: compressedBase64Image }
          : newEducativeResource,
      ];

      await AsyncStorageService.setItem(storageKey, updatedEducativeResources);

      await get().findEducativeResources("All", () => {});

      Toast.success(
        i18n.t("operations-messages.resource-saved-success-msg"),
        "bottom"
      );
    } catch (e) {
      const error = e as Error;
      Toast.error(error.message, "bottom");
    } finally {
      toggleLoading(null, false);
    }
  },

  findEducativeResources: async (
    filter: ListFilter,
    toggleLoading: (message: string | null, isLoading: boolean) => void
  ): Promise<void> => {
    try {
      toggleLoading(i18n.t("operations-messages.listing-resources-msg"), true);

      const educativeResources = await AsyncStorageService.getItem<
        EducativeResource[]
      >(storageKey);

      if (!educativeResources) {
        return;
      }

      if (filter === "All") {
        set({ educativeResources });
        return;
      }

      set({
        educativeResources: educativeResources.filter(
          (resource) => resource.formatOption.key === filter
        ),
      });
    } catch (e) {
      const error = e as Error;
      Toast.error(error.message, "bottom");
    } finally {
      toggleLoading(null, false);
    }
  },
  removeEducativeResources: async (): Promise<void> => {
    try {
      const educativeResources = await AsyncStorageService.getItem<
        EducativeResource[]
      >(storageKey);

      if (!educativeResources) {
        Toast.error(
          i18n.t("operations-messages.remove-key-not-found-error-msg"),
          "bottom"
        );
        return;
      }

      const selectedResources = get().selectedResources;

      const resourcesIdsToDelete = selectedResources.map(
        (resource) => resource.resourceId
      );

      const updatedEducativeResources = educativeResources.filter(
        (educativeResource) => {
          const filter: boolean = resourcesIdsToDelete.includes(
            educativeResource.resourceId
          );
          return !filter;
        }
      );

      await AsyncStorageService.setItem(storageKey, updatedEducativeResources);

      set({
        educativeResources: updatedEducativeResources,
        selectedResources: [],
      });

      Toast.success(
        i18n.t("operations-messages.remove-resource-success-msg"),
        "bottom"
      );
    } catch (e) {
      const error = e as Error;
      Toast.error(error.message, "bottom");
    }
  },
});
