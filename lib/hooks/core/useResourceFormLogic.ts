import { ScrollView } from "react-native";

import { SizeType } from "@/lib/types";
import {
  FormatOption,
  Country,
  AcademicResource,
  Language,
  ResourceRequest,
  GradeLevel,
} from "@/lib/types/dataTypes";

import { PROMPT_PANEL_OPTIONS } from "@/lib/constants/PromptPanelOptions";
import { ACADEMIC_RESOURCES } from "@/lib/constants/AcademicResources";
import { COUNTRIES } from "@/lib/constants/Countries";
import { LANGUAGES } from "@/lib/constants/Languages";
import { GRADE_LEVELS } from "@/lib/constants/GradeLevels";

import {
  useAttachFile,
  useBackgroundTaskStore,
  useDropdown,
  useEducativeResourcesStore,
  useForm,
  usePromptPanel,
  useScreenDimensions,
  useTaskRunner,
  useTranslations,
} from "..";

import { validationSchema } from "@/components/organisms/generate-resource-form/validationSchema";

import { generateUniqueId, setDropdownSelectedOption } from "@/lib/utils";

const useResourceFormLogic = (scrollViewRef: React.RefObject<ScrollView>) => {
  const size: SizeType = useScreenDimensions();

  const { t, language } = useTranslations();

  const initialData: ResourceRequest = {
    subject: "",
    grade: "",
    country: "",
    resourceType: "",
    promptText: "",
    formatOption: {
      key: "Text",
      name: t("text-format-option-label"),
    },
    language: "",
    otherResourceDescription: "",
    attachedFile: {
      fileUri: "",
      fileSize: 0,
      extension: "",
      fileName: "",
    },
  };

  const defaultFormatOption: FormatOption = {
    key: PROMPT_PANEL_OPTIONS[language][0].formatOptionKey,
    name: PROMPT_PANEL_OPTIONS[language][0].optionValue,
  };

  const { addTask } = useBackgroundTaskStore();
  const { isProcessing, runTask } = useTaskRunner();

  const { requestFormData, generateEducativeResource } =
    useEducativeResourcesStore();

  const {
    data,
    getInputRef,
    getDropdownRef,
    getInputError,
    updateData,
    handleChange,
    handleSubmit,
  } = useForm(
    requestFormData ? requestFormData : initialData,
    validationSchema(language),
    () => {
      const taskId: string = generateUniqueId();
      addTask({
        id: taskId,
        name:
          t("background-task-messages.generate-task-name") + data.resourceType,
        type: "generate",
        progress: 0,
        status: "pending",
      });
      runTask(
        taskId,
        "generate",
        t("background-task-messages.generate-task-name") + data.resourceType,
        async () => await generateEducativeResource(data)
      );
    },
    scrollViewRef,
    requestFormData
  );

  const gradeDropdown = useDropdown<GradeLevel>(
    "gradeLevelName",
    requestFormData
      ? setDropdownSelectedOption(
          GRADE_LEVELS[language],
          "gradeLevelName",
          requestFormData.grade
        )
      : null,
    (value) => updateData("grade", value)
  );

  const countriesDropdown = useDropdown<Country>(
    "countryName",
    requestFormData
      ? setDropdownSelectedOption(
          COUNTRIES[language],
          "countryName",
          requestFormData.country
        )
      : null,
    (value) => updateData("country", value)
  );
  const resourcesDropdown = useDropdown<AcademicResource>(
    "resourceName",
    requestFormData
      ? setDropdownSelectedOption(
          ACADEMIC_RESOURCES[language],
          "resourceName",
          requestFormData.resourceType
        )
      : null,
    (value) => updateData("resourceType", value)
  );
  const languagesDropdown = useDropdown<Language>(
    "langName",
    requestFormData
      ? setDropdownSelectedOption(
          LANGUAGES[language],
          "langName",
          requestFormData.language
        )
      : null,
    (value) => updateData("language", value)
  );

  const promptPanel = usePromptPanel(defaultFormatOption, (value) =>
    updateData("formatOption", value)
  );

  const { file, handleAttachFile, handleClearFile } = useAttachFile((value) =>
    updateData("attachedFile", value)
  );

  return {
    size,
    isProcessing,
    t,
    language,
    data,
    getInputRef,
    getDropdownRef,
    getInputError,
    handleChange,
    handleSubmit,
    gradeDropdown,
    countriesDropdown,
    resourcesDropdown,
    languagesDropdown,
    promptPanel,
    file,
    handleAttachFile,
    handleClearFile,
  };
};

export default useResourceFormLogic;
