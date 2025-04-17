import { EducativeResource, ResourceRequest } from "@/lib/types/dataTypes";

import { generateUniqueId } from "@/lib/utils";
import { EncodingType, readAsStringAsync } from "expo-file-system";
import { printToFileAsync } from "expo-print";

export const buildPromptTemplate = (
  resourceRequest: ResourceRequest
): string => {
  return `
  Materia: ${resourceRequest.subject} 
  Grado: ${resourceRequest.grade}
  País:${resourceRequest.country}
  Tipo de recurso:${
    resourceRequest.otherResourceDescription.length > 0
      ? resourceRequest.otherResourceDescription
      : resourceRequest.resourceType
  }
  Idioma: ${resourceRequest.language}
  Descripción del recurso: ${resourceRequest.promptText}
  Formato: ${resourceRequest.formatOption.name}  
  `;
};

const generateAndLoadPDF = async (htmlContent: string) => {
  const { uri } = await printToFileAsync({
    html: htmlContent.replace(/^```html\s*([\s\S]*?)\s*```$/gm, "$1").trim(),
  });
  const b64 = await readAsStringAsync(uri, {
    encoding: EncodingType.Base64,
  });

  return b64;
};

export const getGeneratedResourceTemplate = async (
  resourceRequest: ResourceRequest,
  generatedIaContent: string
): Promise<EducativeResource> => {
  const format = resourceRequest.formatOption.key;

  return {
    resourceId: generateUniqueId(),
    title: "",
    formatOption: resourceRequest.formatOption,
    content:
      format === "Table" || format === "Chart"
        ? await generateAndLoadPDF(generatedIaContent)
        : generatedIaContent,
    creationDate: new Date().toLocaleDateString(),
  };
};

export const filterTextResources = (
  selectedEducativeResources: EducativeResource[]
): EducativeResource[] => {
  return selectedEducativeResources.filter(
    (resource) =>
      resource.formatOption.key === "Table" ||
      resource.formatOption.key === "Chart" ||
      resource.formatOption.key === "Text"
  );
};

export const checkSelectedResources = (
  selectedResource: EducativeResource,
  selectedResources: EducativeResource[]
): boolean => {
  return selectedResources.some(
    (resource) => resource.resourceId === selectedResource.resourceId
  );
};

export const updateSelectedResources = (
  selectedResource: EducativeResource,
  selectedResources: EducativeResource[]
): EducativeResource[] => {
  return selectedResources.filter(
    (resource) => resource.resourceId !== selectedResource.resourceId
  );
};

export const getSelectionResult = (
  isAlreadySelected: boolean,
  selectedResource: EducativeResource,
  selectedResources: EducativeResource[],
  updatedSelectedResources: EducativeResource[]
) => {
  const selectionResult = isAlreadySelected
    ? updatedSelectedResources.length === 0
      ? { selectedResources: updatedSelectedResources, selectionMode: false }
      : { selectedResources: updatedSelectedResources }
    : { selectedResources: [...selectedResources, selectedResource] };

  return selectionResult;
};
