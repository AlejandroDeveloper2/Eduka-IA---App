import { SizeType } from "../types";
import { FormatOptionKey } from "../types/dataTypes";

import TextViewer from "@/components/molecules/text-viewer/TextViewer";
import WebViewer from "@/components/molecules/web-viewer/WebViewer";
import ImageViewer from "@/components/molecules/image-viewer/ImageViewer";

export const getViewer = (
  formatKey: FormatOptionKey,
  size: SizeType,
  content: string
): JSX.Element => {
  switch (formatKey) {
    case "Text":
      return <TextViewer content={content} />;
    case "Image":
      return <ImageViewer imageUri={content} />;
    case "Table":
    case "Chart":
      return <WebViewer base64Content={content} />;
    default:
      return <TextViewer content={content} />;
  }
};
