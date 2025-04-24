import { SaveResource } from "@/lib/types/dataTypes";

import useSaveResourceFormLogic from "@/lib/hooks/core/useSaveResourceFormLogic";

import Form from "../form/Form";

interface SaveResourceTemplateProps {
  closePopUp: () => void;
}

const SaveResourceForm = ({
  closePopUp,
}: SaveResourceTemplateProps): JSX.Element => {
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
  } = useSaveResourceFormLogic(closePopUp);

  return (
    <Form
      size={size}
      submitButtonText={t(
        "home-screen-translations.save-resource-form-labels.form-button-label"
      )}
      isLoading={isLoading}
      messageLoading={message ?? undefined}
      buttonIconName="save-outline"
      handleSubmit={handleSubmit}
    >
      <Form.Fields>
        <Form.Row>
          <Form.Col size={size} fill={true}>
            <Form.Input<SaveResource>
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

export default SaveResourceForm;
