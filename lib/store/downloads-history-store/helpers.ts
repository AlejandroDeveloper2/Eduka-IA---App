import { getInfoAsync, readDirectoryAsync } from "expo-file-system";

import { DownloadedFileInfo, FileExtensionType } from "@/lib/types/dataTypes";

export const getDownloadedFiles = async (
  documentDirectoryUri: string
): Promise<DownloadedFileInfo[]> => {
  const readFiles: string[] = await readDirectoryAsync(documentDirectoryUri);

  return await Promise.all(
    readFiles.map(async (fileName) => {
      const uri = `${documentDirectoryUri}/${fileName}`;
      const fileInfo = await getInfoAsync(uri);

      const fileParts = fileName.split(".");
      const extension = fileParts[1] as FileExtensionType;
      const name = fileParts[0] + "." + extension;

      const size = fileInfo.exists
        ? `${Math.ceil(fileInfo.size / 1024)} KB`
        : "0 KB";

      return {
        fileUri: fileName,
        name,
        extension,
        size,
      };
    })
  );
};
