import { EducativeResource, FormatOptionKey } from "../types/dataTypes";

export const getResourceFormatInfo = (
  generatedEducativeResource: EducativeResource | null
) => {
  const formatKey: FormatOptionKey = generatedEducativeResource
    ? generatedEducativeResource.formatOption.key
    : "Text";

  const formatText: string = generatedEducativeResource
    ? generatedEducativeResource.formatOption.name
    : "";

  return {
    formatKey,
    formatText,
  };
};
