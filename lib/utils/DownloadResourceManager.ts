import {
  documentDirectory,
  EncodingType,
  getInfoAsync,
  makeDirectoryAsync,
  writeAsStringAsync,
} from "expo-file-system";

import { EducativeResource, FileExtensionType } from "../types/dataTypes";

import { DOWNLOADS_FOLDER } from "../constants/DownloadsFolder";

import { i18n } from "@/lib/store/lang-store/Lang.store";

export class DownloadResourceManager {
  private static async ensureDirectoryExists(
    folderName: string
  ): Promise<string> {
    const directoryUri = documentDirectory + folderName;

    const dirInfo = await getInfoAsync(directoryUri);
    if (!dirInfo.exists) {
      await makeDirectoryAsync(directoryUri, {
        intermediates: true,
      });
    }

    return directoryUri;
  }

  private static async generateUniqueFileName(
    directoryUri: string,
    baseName: string,
    extension: FileExtensionType
  ): Promise<string> {
    let fileName: string = `${baseName}.${extension}`;
    let counter = 1;

    while (
      await getInfoAsync(`${directoryUri}/${fileName}`).then((f) => f.exists)
    ) {
      fileName = `${baseName}_${counter}.${extension}`;
      counter++;
    }

    return fileName;
  }

  public static async buildFileNameUri(
    resource: EducativeResource,
    fileExtension: FileExtensionType
  ): Promise<string> {
    const baseName: string =
      resource.title.length > 0 ? resource.title : resource.resourceId;

    const directoryUri = await this.ensureDirectoryExists(DOWNLOADS_FOLDER);

    const fileName = await this.generateUniqueFileName(
      directoryUri,
      baseName,
      fileExtension
    );

    const fileUri: string = `${directoryUri}/${fileName}`;

    return fileUri;
  }

  public static async downloadResource(
    resource: EducativeResource
  ): Promise<void> {
    try {
      const format = resource.formatOption.key;

      const fileExtension: FileExtensionType =
        format === "Text"
          ? "txt"
          : format === "Table" || format === "Chart"
          ? "pdf"
          : "webp";

      const fileUri: string = await this.buildFileNameUri(
        resource,
        fileExtension
      );

      if (fileExtension === "txt") {
        await writeAsStringAsync(fileUri, resource.content, {
          encoding: EncodingType.UTF8,
        });
        return;
      }

      if (fileExtension === "pdf") {
        await writeAsStringAsync(fileUri, resource.content, {
          encoding: EncodingType.Base64,
        });
        return;
      }

      if (fileExtension === "webp") {
        await writeAsStringAsync(fileUri, resource.content.split(",")[1], {
          encoding: EncodingType.Base64,
        });
        return;
      }
    } catch (e) {
      console.log(e);
      throw new Error(
        i18n.t("operations-messages.download-resource-error-msg")
      );
    }
  }
}
