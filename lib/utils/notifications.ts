import {
  requestPermissionsAsync,
  setNotificationHandler,
} from "expo-notifications";

export async function setupNotifications(): Promise<void> {
  const { status } = await requestPermissionsAsync();
  if (status !== "granted") {
    console.warn("🔕 Permisos de notificación no concedidos");
  }

  setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
}
