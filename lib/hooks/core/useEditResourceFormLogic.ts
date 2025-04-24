import { SizeType } from "@/lib/types";
import {
  DownloadedFileInfo,
  EditResource,
  EducativeResource,
} from "@/lib/types/dataTypes";

import {
  useDownloadsHistoryStore,
  useEducativeResourcesStore,
  useForm,
  useLoading,
  useScreenDimensions,
  useTranslations,
} from "..";

import { validationSchema } from "@/components/organisms/edit-resource-title-form/validationSchema";

const useEditResourceFormLogic = (
  resourceData: EducativeResource | DownloadedFileInfo,
  editionMode: "Preview" | "Downloaded-file",
  closePopUp: () => void
) => {
  const resourceInfo: EducativeResource = resourceData as EducativeResource;
  const fileInfo: DownloadedFileInfo = resourceData as DownloadedFileInfo;

  const size: SizeType = useScreenDimensions();
  const { t } = useTranslations();

  const { editEducativeResourceTitle } = useEducativeResourcesStore();
  const { renameDownloadedResource } = useDownloadsHistoryStore();

  const { isLoading, message, toggleLoading } = useLoading();

  const { data, getInputRef, getInputError, handleChange, handleSubmit } =
    useForm<EditResource>(
      {
        title:
          editionMode === "Preview"
            ? resourceInfo.title
            : fileInfo.name.split(".")[0],
      },
      validationSchema,
      () => {
        if (editionMode === "Preview") {
          editEducativeResourceTitle(
            resourceInfo.resourceId,
            data.title,
            toggleLoading
          ).then(() => {
            closePopUp();
          });
        } else {
          renameDownloadedResource(
            fileInfo.name.split(".")[0],
            data.title,
            fileInfo.extension,
            toggleLoading
          ).then(() => {
            closePopUp();
          });
        }
      }
    );

  return {
    size,
    t,
    data,
    isLoading,
    message,
    getInputRef,
    getInputError,
    handleChange,
    handleSubmit,
  };
};

export default useEditResourceFormLogic;
