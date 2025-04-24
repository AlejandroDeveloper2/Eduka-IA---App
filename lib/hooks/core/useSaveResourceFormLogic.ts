import { useRouter } from "expo-router";

import { SizeType } from "@/lib/types";
import { SaveResource } from "@/lib/types/dataTypes";

import { validationSchema } from "@/components/organisms/save-resource-form/validationSchema";

import {
  useEducativeResourcesStore,
  useForm,
  useLoading,
  useScreenDimensions,
  useTranslations,
} from "..";

const initialData: SaveResource = {
  title: "",
};

const useSaveResourceFormLogic = (closePopUp: () => void) => {
  const size: SizeType = useScreenDimensions();

  const router = useRouter();

  const { t } = useTranslations();

  const {
    saveEducativeResource,
    generatedEducativeResource,
    cleanGeneratedResponse,
  } = useEducativeResourcesStore();

  const { isLoading, message, toggleLoading } = useLoading();

  const { data, getInputRef, getInputError, handleChange, handleSubmit } =
    useForm(initialData, validationSchema, () => {
      if (generatedEducativeResource)
        saveEducativeResource(
          { ...generatedEducativeResource, ...data },
          toggleLoading
        ).then(() => {
          cleanGeneratedResponse();
          router.navigate("/resources");
          closePopUp();
        });
    });

  return {
    size,
    t,
    isLoading,
    message,
    data,
    getInputRef,
    getInputError,
    handleChange,
    handleSubmit,
  };
};

export default useSaveResourceFormLogic;
