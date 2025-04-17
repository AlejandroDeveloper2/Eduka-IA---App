import {
  cacheDirectory,
  deleteAsync,
  EncodingType,
  writeAsStringAsync,
} from "expo-file-system";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";

export const zipImageBase64 = async (base64: string, quality: number = 0.5) => {
  const tempUri = cacheDirectory + `temp_${Date.now()}.webp`;

  // Save the base64 as temporal file
  await writeAsStringAsync(tempUri, base64, {
    encoding: EncodingType.Base64,
  });

  // zip it with ImageMalipulator
  const compressionResult = await manipulateAsync(
    tempUri,
    [{ resize: { width: 800 } }],
    {
      compress: quality,
      format: SaveFormat.WEBP,
      base64: true,
    }
  );

  // Clean temporal file
  await deleteAsync(tempUri, { idempotent: true });

  return `data:image/png;base64,${compressionResult.base64}`;
};
