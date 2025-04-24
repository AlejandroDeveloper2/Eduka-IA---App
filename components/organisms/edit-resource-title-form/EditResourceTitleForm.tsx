import {
  DownloadedFileInfo,
  EditResource,
  EducativeResource,
} from "@/lib/types/dataTypes";

import useEditResourceFormLogic from "@/lib/hooks/core/useEditResourceFormLogic";

import Form from "../form/Form";

interface EditResourceTitleTemplateProps {
  resourceData: EducativeResource | DownloadedFileInfo;
  editionMode: "Preview" | "Downloaded-file";
  closePopUp: () => void;
}

const EditResourceTitleForm = ({
  resourceData,
  editionMode,
  closePopUp,
}: EditResourceTitleTemplateProps): JSX.Element => {
  const {
    size,
    t,
    isLoading,
    message,
    data,
    getInputRef,
    getInputError,
    handleChange,
    handleSubmit,
  } = useEditResourceFormLogic(resourceData, editionMode, closePopUp);

  return (
    <Form
      size={size}
      submitButtonText={"Guardar Cambios"}
      isLoading={isLoading}
      messageLoading={message ?? undefined}
      buttonIconName="pencil-outline"
      handleSubmit={handleSubmit}
    >
      <Form.Fields>
        <Form.Row>
          <Form.Col size={size} fill={true}>
            <Form.Input<EditResource>
              inputRef={getInputRef("title")}
              label={`${t(
                "home-screen-translations.save-resource-form-labels.form-input-name-label"
              )} (*)`}
              value={data.title}
              name="title"
              size={size}
              placeholder={t(
                "home-screen-translations.save-resource-form-labels.form-input-name-placeholder"
              )}
              iconName="book-outline"
              keyboardType="default"
              onChange={handleChange}
              onClearInput={() => handleChange("title", "")}
              errorMessage={getInputError("title")}
            />
          </Form.Col>
        </Form.Row>
      </Form.Fields>
    </Form>
  );
};

export default EditResourceTitleForm;
