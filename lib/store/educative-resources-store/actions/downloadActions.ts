import { StateCreator } from "zustand";
import { Toast } from "toastify-react-native";

import { DownloadActions, EducativeResourceStoreType } from "../store-type";

import { i18n } from "@/lib/store/lang-store/Lang.store";

import { DownloadResourceManager, downloadConcurrently } from "@/lib/utils";
// import { filterTextResources } from "../helpers";

import { DownloadsHistoryStore } from "../../downloads-history-store";
import { AsyncStorageService } from "@/services/AsyncStorage.service";

export const downloadActions: StateCreator<
  EducativeResourceStoreType,
  [],
  [],
  DownloadActions
> = (set, get) => ({
  downloadSingleResource: async (
    toggleLoading: (message: string | null, isLoading: boolean) => void
  ): Promise<void> => {
    try {
      toggleLoading("..", true);

      const generatedEducativeResource = get().generatedEducativeResource;

      if (generatedEducativeResource === null) {
        Toast.warn(
          i18n.t("operations-messages.download-resource-warning-msg"),
          "bottom"
        );
        return;
      }

      await DownloadResourceManager.downloadResource(
        generatedEducativeResource
      );

      DownloadsHistoryStore.getState().findDownloadedResources(toggleLoading);

      Toast.success(
        i18n.t("operations-messages.resource-downloaded-success-msg"),
        "bottom"
      );
    } catch (e) {
      const error = e as Error;
      Toast.error(error.message, "bottom");
    } finally {
      toggleLoading(null, false);
    }
  },
  downloadEducativeResources: async (): Promise<void> => {
    try {
      const estimatedDuration: number =
        (await AsyncStorageService.getItem<number>(
          "downloading-average-duration"
        )) ?? 1000;

      set({ isDownloading: true, duration: estimatedDuration });

      const selectedEducativeResources = get().selectedResources;

      if (selectedEducativeResources.length === 0) {
        Toast.warn(
          i18n.t("operations-messages.select-resources-warn-msg"),
          "bottom"
        );
        return;
      }

      const start = performance.now();

      await downloadConcurrently(
        selectedEducativeResources,
        async (resource) =>
          await DownloadResourceManager.downloadResource(resource)
      );

      const end = performance.now();

      Toast.success(
        i18n.t("operations-messages.resources-downloaded-success-msg"),
        "bottom"
      );

      DownloadsHistoryStore.getState().findDownloadedResources(() => {});

      await AsyncStorageService.setItem(
        "downloading-average-duration",
        end - start
      );

      set({ duration: end - start });
    } catch (e) {
      const error = e as Error;
      Toast.error(error.message, "bottom");
    } finally {
      set({
        isDownloading: false,
        selectedResources: [],
        selectionMode: false,
      });
    }
  },
});
