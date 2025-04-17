import { setStringAsync } from "expo-clipboard";
import { Toast } from "toastify-react-native";

import { i18n } from "@/lib/store/lang-store/Lang.store";

export const copyToClipboard = async (textToCopy: string) => {
  try {
    await setStringAsync(textToCopy);
    Toast.success(
      i18n.t("operations-messages.copy-ia-result-success-msg"),
      "bottom"
    );
  } catch (e) {
    console.log(e);
    throw new Error(i18n.t("operations-messages.copy-ia-result-error-msg"));
  }
};
