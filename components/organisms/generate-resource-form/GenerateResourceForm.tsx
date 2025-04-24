import { ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import {
  AcademicResource,
  Country,
  Language,
  ResourceRequest,
} from "@/lib/types/dataTypes";

import { COUNTRIES } from "@/lib/constants/Countries";
import { ACADEMIC_RESOURCES } from "@/lib/constants/AcademicResources";
import { LANGUAGES } from "@/lib/constants/Languages";
import { Colors } from "@/lib/constants/Colors";

import useResourceFormLogic from "@/lib/hooks/core/useResourceFormLogic";

import Form from "../form/Form";
import { Subtitle } from "@/components/atoms";

interface GenerateResourceFormProps {
  scrollViewRef: React.RefObject<ScrollView>;
}

const GenerateResourceForm = ({
  scrollViewRef,
}: GenerateResourceFormProps): JSX.Element => {
  const {
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
  } = useResourceFormLogic(scrollViewRef);

  return (
    <Form
      size={size}
      submitButtonText={t(
        "home-screen-translations.request-resource-form-labels.form-button-label"
      )}
      buttonIconName="bulb-outline"
      handleSubmit={handleSubmit}
      isLoading={isProcessing}
    >
      <Subtitle
        subTitle={t(
          "home-screen-translations.request-resource-form-labels.form-subtitle"
        )}
        size="Small"
        Icon={() => (
          <Ionicons name="bulb-outline" size={28} color={Colors.primary[400]} />
        )}
      />
      <Form.Fields>
        <Form.Row>
          <Form.Col size={size} fill={false}>
            <Form.Input<ResourceRequest>
              inputRef={getInputRef("subject")}
              label={`${t(
                "home-screen-translations.request-resource-form-labels.form-input-subject-label"
              )} (*)`}
              value={data.subject}
              name="subject"
              size={size}
              placeholder={t(
                "home-screen-translations.request-resource-form-labels.form-input-subject-placeholder"
              )}
              iconName="book-outline"
              keyboardType="default"
              onChange={handleChange}
              onClearInput={() => handleChange("subject", "")}
              errorMessage={getInputError("subject")}
            />
          </Form.Col>
          <Form.Col size={size} fill={false}>
            <Form.Input<ResourceRequest>
              inputRef={getInputRef("grade")}
              label={`${t(
                "home-screen-translations.request-resource-form-labels.form-input-grade-label"
              )} (*)`}
              value={data.grade}
              name="grade"
              size={size}
              placeholder={t(
                "home-screen-translations.request-resource-form-labels.form-input-grade-placeholder"
              )}
              iconName="school-outline"
              keyboardType="default"
              onChange={handleChange}
              onClearInput={() => handleChange("grade", "")}
              errorMessage={getInputError("grade")}
            />
          </Form.Col>
        </Form.Row>
        <Form.Row>
          <Form.Col size={size} fill={false}>
            <Form.Dropdown<Country>
              dropdownRef={getDropdownRef("country")}
              label={`${t(
                "home-screen-translations.request-resource-form-labels.form-input-country-label"
              )} (*)`}
              defaultText={t(
                "home-screen-translations.request-resource-form-labels.form-input-country-placeholder"
              )}
              optionIdKey="countryId"
              optionValueKey="countryName"
              options={COUNTRIES[language]}
              selectedOption={countriesDropdown.selectedOption}
              onSelectOption={countriesDropdown.handleSelectOption}
              name="countryName"
              size={size}
              searchInputPlaceholder={t(
                "home-screen-translations.request-resource-form-labels.form-input-country-search"
              )}
              iconName="flag-outline"
              onClearOption={countriesDropdown.handleClearOption}
              errorMessage={getInputError("country")}
            />
          </Form.Col>
          <Form.Col size={size} fill={false}>
            <Form.Dropdown<AcademicResource>
              dropdownRef={getDropdownRef("resourceType")}
              label={`${t(
                "home-screen-translations.request-resource-form-labels.form-input-resource-type-label"
              )} (*)`}
              defaultText={t(
                "home-screen-translations.request-resource-form-labels.form-input-resource-type-placeholder"
              )}
              optionIdKey="resourceId"
              optionValueKey="resourceName"
              options={ACADEMIC_RESOURCES[language]}
              selectedOption={resourcesDropdown.selectedOption}
              onSelectOption={resourcesDropdown.handleSelectOption}
              name="resourceName"
              size={size}
              searchInputPlaceholder={t(
                "home-screen-translations.request-resource-form-labels.form-input-resource-type-search"
              )}
              iconName="shapes-outline"
              onClearOption={resourcesDropdown.handleClearOption}
              errorMessage={getInputError("resourceType")}
            />
          </Form.Col>
        </Form.Row>
        <Form.Row>
          {resourcesDropdown.selectedOption?.resourceId === "resource_12" && (
            <Form.Col size={size} fill={false}>
              <Form.Input<ResourceRequest>
                inputRef={getInputRef("otherResourceDescription")}
                label={t(
                  "home-screen-translations.request-resource-form-labels.form-input-other-label"
                )}
                value={data.otherResourceDescription}
                name="otherResourceDescription"
                size={size}
                placeholder={t(
                  "home-screen-translations.request-resource-form-labels.form-input-other-placeholder"
                )}
                iconName="shapes-outline"
                keyboardType="default"
                onChange={handleChange}
                onClearInput={() =>
                  handleChange("otherResourceDescription", "")
                }
                errorMessage={getInputError("otherResourceDescription")}
              />
            </Form.Col>
          )}

          <Form.Col size={size} fill={false}>
            <Form.Dropdown<Language>
              dropdownRef={getDropdownRef("language")}
              label={`${t(
                "home-screen-translations.request-resource-form-labels.form-input-language-label"
              )} (*)`}
              defaultText={t(
                "home-screen-translations.request-resource-form-labels.form-input-language-placeholder"
              )}
              optionIdKey="langId"
              optionValueKey="langName"
              options={LANGUAGES[language]}
              selectedOption={languagesDropdown.selectedOption}
              onSelectOption={languagesDropdown.handleSelectOption}
              name="langName"
              size={size}
              searchInputPlaceholder={t(
                "home-screen-translations.request-resource-form-labels.form-input-language-search"
              )}
              iconName="language-outline"
              onClearOption={languagesDropdown.handleClearOption}
              errorMessage={getInputError("language")}
            />
          </Form.Col>
        </Form.Row>
        <Form.Row>
          <Form.Col size={size} fill={true}>
            <Form.PromptPanel<ResourceRequest>
              inputRef={getInputRef("promptText")}
              name="promptText"
              value={data.promptText}
              size={size}
              placeholder={t(
                "home-screen-translations.request-resource-form-labels.form-input-prompt-placeholder"
              )}
              selectedOption={promptPanel.selectedOption}
              onChange={handleChange}
              onClearInput={() => handleChange("promptText", "")}
              onSelectOption={promptPanel.onSelectOption}
              errorMessage={getInputError("promptText")}
            />
          </Form.Col>
        </Form.Row>
      </Form.Fields>
    </Form>
  );
};

export default GenerateResourceForm;
