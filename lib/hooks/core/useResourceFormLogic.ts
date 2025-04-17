import { ScrollView } from "react-native";

import { SizeType } from "@/lib/types";
import {
  FormatOption,
  Country,
  AcademicResource,
  Language,
  ResourceRequest,
} from "@/lib/types/dataTypes";

import { PROMPT_PANEL_OPTIONS } from "@/lib/constants/PromptPanelOptions";
import { ACADEMIC_RESOURCES } from "@/lib/constants/AcademicResources";
import { COUNTRIES } from "@/lib/constants/Countries";
import { LANGUAGES } from "@/lib/constants/Languages";

import {
  useBackgroundTaskStore,
  useDropdown,
  useEducativeResourcesStore,
  useForm,
  usePromptPanel,
  useScreenDimensions,
  useTaskRunner,
  useTranslations,
} from "..";

import { resourceRequestSchema } from "@/components/templates/request-resource-template/validationSchema";

import { generateUniqueId, setDropdownSelectedOption } from "@/lib/utils";

const initialData: ResourceRequest = {
  subject: "",
  grade: "",
  country: "",
  resourceType: "",
  promptText: "",
  formatOption: {
    key: "Text",
    name: "",
  },
  language: "",
  otherResourceDescription: "",
};

const useResourceFormLogic = (scrollViewRef: React.RefObject<ScrollView>) => {
  const size: SizeType = useScreenDimensions();

  const { t, language } = useTranslations();

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
    // clearFormData,
  } = useForm(
    requestFormData ? requestFormData : initialData,
    resourceRequestSchema(language),
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

  // useEffect(() => {
  //   clearFormData();
  // }, [language]);

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
    countriesDropdown,
    resourcesDropdown,
    languagesDropdown,
    promptPanel,
  };
};

export default useResourceFormLogic;
