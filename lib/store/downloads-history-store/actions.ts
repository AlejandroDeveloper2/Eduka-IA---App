import { StateCreator } from "zustand";
import {
  documentDirectory,
  getInfoAsync,
  deleteAsync,
  moveAsync,
} from "expo-file-system";
import { isAvailableAsync, shareAsync } from "expo-sharing";
import { Toast } from "toastify-react-native";

import {
  DownloadsHistoryStoreActons,
  DownloadsHistoryStoreType,
} from "./store-type";
import { DownloadedFileInfo, FileExtensionType } from "@/lib/types/dataTypes";

import { DOWNLOADS_FOLDER } from "@/lib/constants/DownloadsFolder";

import { i18n } from "@/lib/store/lang-store/Lang.store";

import { getDownloadedFiles } from "./helpers";

export const createActions: StateCreator<
  DownloadsHistoryStoreType,
  [],
  [],
  DownloadsHistoryStoreActons
> = (set, get) => ({
  findDownloadedResources: async (
    toggleLoading: (message: string | null, isLoading: boolean) => void
  ): Promise<void> => {
    try {
      toggleLoading(
        i18n.t("operations-messages.listing-downloaded-files-msg"),
        true
      );

      const documentDirectoryUri = documentDirectory + DOWNLOADS_FOLDER;

      const folderInfo = await getInfoAsync(documentDirectoryUri);

      if (!folderInfo.exists) return;

      const downloadedResources: DownloadedFileInfo[] =
        await getDownloadedFiles(documentDirectoryUri);

      set({ downloadedResources });
    } catch (e) {
      console.error(e);
      Toast.error(
        i18n.t("operations-messages.list-download-files-error-msg"),
        "bottom"
      );
    } finally {
      toggleLoading(null, false);
    }
  },

  renameDownloadedResource: async (
    oldName: string,
    newName: string,
    extension: FileExtensionType,
    toggleLoading: (message: string | null, isLoading: boolean) => void
  ): Promise<void> => {
    try {
      toggleLoading(i18n.t("operations-messages.editing-resource-msg"), true);

      const oldFileUri = `${
        documentDirectory + DOWNLOADS_FOLDER
      }/${oldName}.${extension}`;

      const newFileUri = `${
        documentDirectory + DOWNLOADS_FOLDER
      }/${newName}.${extension}`;

      await moveAsync({ from: oldFileUri, to: newFileUri });

      await get().findDownloadedResources(() => {});

      Toast.success(
        i18n.t("operations-messages.resource-edited-success-msg"),
        "bottom"
      );
    } catch (e) {
      console.error(e);
      Toast.error(
        i18n.t("operations-messages.resource-edited-error-msg"),
        "bottom"
      );
    } finally {
      toggleLoading(null, false);
    }
  },
  shareResource: async (resourceName: string): Promise<void> => {
    try {
      const fileUri = `${documentDirectory}${DOWNLOADS_FOLDER}/${resourceName}`;

      if (await isAvailableAsync()) {
        await shareAsync(fileUri);
      } else {
        Toast.warn(i18n.t("operations-messages.share-file-warn-msg"), "bottom");
      }
    } catch (e) {
      console.error(e);
      Toast.error(i18n.t("operations-messages.share-file-error-msg"), "bottom");
    }
  },

  removeDownloadedResource: async (resourceName: string): Promise<void> => {
    try {
      const fileUri = `${documentDirectory}${DOWNLOADS_FOLDER}/${resourceName}`;

      await deleteAsync(fileUri, { idempotent: true });

      const updatedDownloadedResources = get().downloadedResources.filter(
        (resource) => resource.fileUri !== resourceName
      );

      set({ downloadedResources: updatedDownloadedResources });

      Toast.success(
        i18n.t("operations-messages.remove-file-success-msg"),
        "bottom"
      );
    } catch (e) {
      console.error(e);
      Toast.error(
        i18n.t("operations-messages.remove-file-error-msg"),
        "bottom"
      );
    }
  },
});
