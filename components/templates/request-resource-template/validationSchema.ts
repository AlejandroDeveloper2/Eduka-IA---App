import { v } from "@/lib/utils";

import { FormatOption, ResourceRequest } from "@/lib/types/dataTypes";
import { COUNTRIES } from "@/lib/constants/Countries";
import { ACADEMIC_RESOURCES } from "@/lib/constants/AcademicResources";
import { PROMPT_PANEL_OPTIONS } from "@/lib/constants/PromptPanelOptions";
import { LANGUAGES } from "@/lib/constants/Languages";

import { i18n, LangTag } from "@/lib/store/lang-store/Lang.store";

export const resourceRequestSchema = (currentLang: LangTag) =>
  v.object<ResourceRequest>({
    subject: v
      .string()
      .required(
        i18n.t(
          "home-screen-translations.request-resource-form-error-messages.subject-error-required-msg"
        )
      )
      .min(
        3,
        i18n.t(
          "home-screen-translations.request-resource-form-error-messages.subject-error-min-msg"
        )
      ),
    grade: v
      .string()
      .required(
        i18n.t(
          "home-screen-translations.request-resource-form-error-messages.grade-error-required-msg"
        )
      )
      .min(
        3,
        i18n.t(
          "home-screen-translations.request-resource-form-error-messages.grade-error-min-msg"
        )
      ),
    country: v
      .string()
      .required(
        i18n.t(
          "home-screen-translations.request-resource-form-error-messages.country-error-required-msg"
        )
      )
      .custom((value) =>
        COUNTRIES[currentLang].find(
          (country) => country.countryName === (value as string)
        ) || value === ""
          ? null
          : i18n.t(
              "home-screen-translations.request-resource-form-error-messages.country-error-invalid-msg"
            )
      ),
    resourceType: v
      .string()
      .required(
        i18n.t(
          "home-screen-translations.request-resource-form-error-messages.resource-type-error-required-msg"
        )
      )
      .custom((value) =>
        ACADEMIC_RESOURCES[currentLang].find(
          (resource) => resource.resourceName === (value as string)
        ) || value === ""
          ? null
          : i18n.t(
              "home-screen-translations.request-resource-form-error-messages.resource-type-invalid-msg"
            )
      ),
    otherResourceDescription: v.string().optional(),
    promptText: v
      .string()
      .required(
        i18n.t(
          "home-screen-translations.request-resource-form-error-messages.prompt-error-required-msg"
        )
      ),
    formatOption: v.object<FormatOption>({
      key: v.string(),
      name: v
        .string()
        .required(
          i18n.t(
            "home-screen-translations.request-resource-form-error-messages.resource-format-error-required-msg"
          )
        )
        .custom((value) =>
          PROMPT_PANEL_OPTIONS[currentLang].find(
            (option) => option.optionValue === (value as string)
          ) || value === ""
            ? null
            : i18n.t(
                "home-screen-translations.request-resource-form-error-messages.resource-format-error-invalid-msg"
              )
        ),
    }),

    language: v
      .string()
      .required(
        i18n.t(
          "home-screen-translations.request-resource-form-error-messages.language-error-required-msg"
        )
      )
      .custom((value) =>
        LANGUAGES[currentLang].find(
          (language) => language.langName === (value as string)
        ) || value === ""
          ? null
          : i18n.t(
              "home-screen-translations.request-resource-form-error-messages.language-error-invalid-msg"
            )
      ),
  });
