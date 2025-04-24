import { SaveResource } from "@/lib/types/dataTypes";

import { i18n } from "@/lib/store/lang-store/Lang.store";

import { v } from "@/lib/utils";

export const validationSchema = v.object<SaveResource>({
  title: v
    .string()
    .required(
      i18n.t(
        "home-screen-translations.save-resource-form-error-messages.name-error-required-msg"
      )
    )
    .min(
      3,
      i18n.t(
        "home-screen-translations.save-resource-form-error-messages.name-error-min-msg"
      )
    ),
});
