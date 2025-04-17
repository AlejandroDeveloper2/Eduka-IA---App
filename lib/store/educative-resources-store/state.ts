import { StoreStateProps } from "./store-type";

export const initialState: StoreStateProps = {
  isGenerating: false,
  generatedEducativeResource: null,
  requestFormData: undefined,
  educativeResources: [],
  selectedResources: [],
  selectionMode: false,
  duration: 0,
  isEditing: false,
  isDownloading: false,
};
