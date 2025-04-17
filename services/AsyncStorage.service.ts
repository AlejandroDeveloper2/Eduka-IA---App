import AsyncStorage from "@react-native-async-storage/async-storage";

import { i18n } from "@/lib/store/lang-store/Lang.store";

export class AsyncStorageService {
  public static async setItem<T>(storageKey: string, item: T): Promise<void> {
    try {
      await AsyncStorage.setItem(storageKey, JSON.stringify(item));
    } catch (error: unknown) {
      console.error(error);
      throw new Error(
        i18n.t("operations-messages.async-storage-set-error-msg")
      );
    }
  }

  public static async getItem<T>(storageKey: string): Promise<T | null> {
    try {
      const item = await AsyncStorage.getItem(storageKey);
      if (!item) return null;
      return JSON.parse(item);
    } catch (error: unknown) {
      console.error(error);
      throw new Error(
        i18n.t("operations-messages.async-storage-get-error-msg")
      );
    }
  }
  public static async deleteItem(storageKey: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(storageKey);
    } catch (error: unknown) {
      console.error(error);
      throw new Error(
        i18n.t("operations-messages.async-storage-remove-error-msg") +
          ": " +
          storageKey
      );
    }
  }
}
