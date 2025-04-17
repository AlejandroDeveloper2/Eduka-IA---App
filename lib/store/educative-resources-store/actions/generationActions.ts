import { StateCreator } from "zustand";
import { Toast } from "toastify-react-native";

import { EducativeResourceStoreType, GenerationActions } from "../store-type";
import { ResourceRequest } from "@/lib/types/dataTypes";

import { i18n } from "@/lib/store/lang-store/Lang.store";

import { AsyncStorageService } from "@/services/AsyncStorage.service";
import { AxiosOpenIAService } from "@/services/AxiosOpenIA.service";

import { buildPromptTemplate, getGeneratedResourceTemplate } from "../helpers";

const storageKey: string = "form-request";

export const generationActions: StateCreator<
  EducativeResourceStoreType,
  [],
  [],
  GenerationActions
> = (set, get) => ({
  generateEducativeResource: async (
    resourceRequest: ResourceRequest
  ): Promise<void> => {
    try {
      let iaContent: string = "";
      let iaImage: string = "";

      const estimatedDuration: number =
        (await AsyncStorageService.getItem<number>(
          "generation-average-duration"
        )) ?? 15000;

      set({
        duration: estimatedDuration,
        isGenerating: true,
        isEditing: false,
      });

      await AsyncStorageService.setItem(storageKey, resourceRequest);

      set({ requestFormData: resourceRequest });

      const prompt: string = buildPromptTemplate(resourceRequest);

      const start = performance.now();

      if (resourceRequest.formatOption.key === "Image") {
        iaImage = await AxiosOpenIAService.postImageEducativeResourceRequest(
          resourceRequest
        );
      } else {
        iaContent = await AxiosOpenIAService.postEducativeResourceRequest(
          prompt
        );
      }

      const end = performance.now();

      const generatedEducativeResource = await getGeneratedResourceTemplate(
        resourceRequest,
        resourceRequest.formatOption.key === "Image" ? iaImage : iaContent
      );

      await AsyncStorageService.setItem(
        "generation-average-duration",
        end - start
      );

      set({
        generatedEducativeResource,
        duration: end - start,
        isGenerating: false,
      });
    } catch (e) {
      const error = e as Error;
      Toast.error(error.message, "bottom");
    } finally {
      set({
        isGenerating: false,
      });
    }
  },
  regenerateEducativeResource: async (): Promise<void> => {
    try {
      const formRequestData =
        await AsyncStorageService.getItem<ResourceRequest>(storageKey);

      if (!formRequestData) {
        Toast.warn(i18n.t("operations-messages.no-info-warn-msg"));
        return;
      }

      await get().generateEducativeResource(formRequestData);
    } catch (e) {
      const error = e as Error;
      Toast.error(error.message, "bottom");
    }
  },

  editResourceRequest: async (): Promise<void> => {
    try {
      set({ isEditing: true });

      const requestFormData =
        await AsyncStorageService.getItem<ResourceRequest>(storageKey);

      if (!requestFormData) return;

      set({ requestFormData });
    } catch (e) {
      const error = e as Error;
      Toast.error(error.message, "bottom");
    }
  },

  cleanGeneratedResponse: async (): Promise<void> => {
    try {
      const formRequestData =
        await AsyncStorageService.getItem<ResourceRequest>(storageKey);

      if (!formRequestData) {
        Toast.warn(i18n.t("operations-messages.no-info-warn-msg"));
        return;
      }

      await AsyncStorageService.deleteItem(storageKey);

      set({ generatedEducativeResource: null, requestFormData: undefined });
    } catch (e) {
      const error = e as Error;
      Toast.error(error.message, "bottom");
    }
  },
});
