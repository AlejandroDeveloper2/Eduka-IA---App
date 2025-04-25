import { getDocumentAsync } from "expo-document-picker";
import { Toast } from "toastify-react-native";

import { AttachedFile } from "../types/dataTypes";

export const attachFile = async (): Promise<AttachedFile | undefined> => {
  const result = await getDocumentAsync();

  if (result.canceled) {
    Toast.warn("Se ha cancelado la operación", "bottom");
    return;
  }

  const asset = result.assets[0];

  const { size, name, uri } = asset;

  const sizeInKB = (size ?? 0) / 1024;
  const sizeInMB: number = parseFloat((sizeInKB / 1024).toFixed(3));

  return {
    fileUri: uri,
    fileSize: sizeInMB,
    extension: name.split(".")[1],
    fileName: name,
  };
};
