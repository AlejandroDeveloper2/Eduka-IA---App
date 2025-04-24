import {
  EducativeResource,
  ListFilter,
  ResourceRequest,
} from "@/lib/types/dataTypes";

export interface StoreStateProps {
  isGenerating: boolean;
  generatedEducativeResource: EducativeResource | null;
  requestFormData: ResourceRequest | undefined;
  educativeResources: EducativeResource[];
  selectedResources: EducativeResource[];
  selectionMode: boolean;
  duration: number;
  isEditing: boolean;
  isDownloading: boolean;
}

export interface GenerationActions {
  generateEducativeResource: (
    resourceRequest: ResourceRequest
  ) => Promise<void>;
  regenerateEducativeResource: () => Promise<void>;
  editResourceRequest: () => Promise<void>;
  cleanGeneratedResponse: () => Promise<void>;
}

export interface ManagementActions {
  saveEducativeResource: (
    newEducativeResource: EducativeResource,
    toggleLoading: (message: string | null, isLoading: boolean) => void
  ) => Promise<void>;
  editEducativeResourceTitle: (
    resourceId: string,
    updatedTitle: string,
    toggleLoading: (message: string | null, isLoading: boolean) => void
  ) => Promise<void>;
  findEducativeResources: (
    filter: ListFilter,
    toggleLoading: (message: string | null, isLoading: boolean) => void
  ) => Promise<void>;
  removeEducativeResources: () => Promise<void>;
}

export interface DownloadActions {
  downloadSingleResource: (
    toggleLoading: (message: string | null, isLoading: boolean) => void
  ) => Promise<void>;
  downloadEducativeResources: () => Promise<void>;
}

export interface UIActions {
  activeSelectionMode: () => void;
  exitSelectionMode: () => void;
  selectEducativeResource: (educativeResource: EducativeResource) => void;
  selectAllEducativeResource: (selectAll: boolean) => void;
}

export type EducativeResourceStoreType = StoreStateProps &
  GenerationActions &
  ManagementActions &
  DownloadActions &
  UIActions;
