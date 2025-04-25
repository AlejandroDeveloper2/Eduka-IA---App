import { Ionicons } from "@expo/vector-icons";

interface AcademicResource {
  resourceId: string;
  resourceName: string;
}

interface Lang<T> {
  es: T[];
  en: T[];
  pt: T[];
}

interface NavOption {
  label: string;
  iconName: keyof typeof Ionicons.glyphMap;
  active: boolean;
  disabled?: boolean;
  onPress: () => void;
}

interface NavItemData {
  label: string;
  iconName: keyof typeof Ionicons.glyphMap;
}

interface PanelOptionData {
  optionValue: string;
  formatOptionKey: FormatOptionKey;
  iconName: keyof typeof Ionicons.glyphMap;
}

type FormatOption = {
  key: FormatOptionKey;
  name: string;
};

interface ResourceRequest {
  subject: string;
  grade: string;
  country: string;
  resourceType: string;
  otherResourceDescription: string;
  promptText: string;
  formatOption: FormatOption;
  language: string;
  attachedFile: AttachedFile;
}

interface Country {
  countryId: string;
  countryName: string;
}

interface Language {
  langId: string;
  langName: string;
}

type FormatOptionKey = "Text" | "Table" | "Image" | "Chart";
type ListFilter = FormatOptionKey | "All";

interface EducativeResource {
  resourceId: string;
  title: string;
  formatOption: FormatOption;
  content: string;
  creationDate: string;
}

interface SaveResource {
  title: string;
}

type EditResource = SaveResource;

type FileExtensionType = "txt" | "pdf" | "webp";

interface DownloadedFileInfo {
  name: string;
  extension: FileExtensionType;
  size: string;
  fileUri: string;
}
type FilterOptionKey = FormatOptionKey | "All";

interface FilterOption {
  key: FilterOptionKey;
  optionLabel: string;
  iconName: keyof typeof Ionicons.glyphMap;
}

interface GradeLevel {
  gradeLevelId: string;
  gradeLevelName: string;
}

interface AttachedFile {
  fileUri: string;
  fileSize: number;
  extension: string;
  fileName: string;
}

export type {
  AcademicResource,
  Lang,
  NavItemData,
  NavOption,
  PanelOptionData,
  FormatOption,
  ResourceRequest,
  Country,
  Language,
  ListFilter,
  FormatOptionKey,
  EducativeResource,
  SaveResource,
  EditResource,
  FileExtensionType,
  DownloadedFileInfo,
  FilterOption,
  FilterOptionKey,
  GradeLevel,
  AttachedFile,
};
