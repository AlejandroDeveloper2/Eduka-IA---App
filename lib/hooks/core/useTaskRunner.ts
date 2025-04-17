import { useEffect, useRef, useState } from "react";
import { AppState, AppStateStatus } from "react-native";
import { scheduleNotificationAsync } from "expo-notifications";

import useBackgroundTaskStore from "../store/useBackgroundTaskStore";

import useTranslations from "./useTranslations";

const useTaskRunner = () => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const appState = useRef<AppStateStatus>(AppState.currentState);

  const { t } = useTranslations();

  const { tasks, updateTaskProgress, completeTask, failTask } =
    useBackgroundTaskStore();

  // Monitorea si se minimiza la app mientras hay tareas activas
  useEffect(() => {
    const sub = AppState.addEventListener("change", async (next) => {
      appState.current = next;

      if (next !== "active") {
        const runningTasks = tasks.filter((t) => t.status === "running");
        for (const task of runningTasks) {
          await scheduleNotificationAsync({
            content: {
              title: `🔄 ${task.name} ${t(
                "background-task-messages.in-progress-task-message"
              )}`,
              body: `${t("background-task-messages.task-type-label")} ${
                task.type
              }`,
            },
            trigger: null,
          });
        }
      }
    });

    return () => sub.remove();
  }, [tasks]);

  const runTask = async (
    taskId: string,
    type: "generate" | "download" | "remove",
    name: string,
    action: () => Promise<void>
  ) => {
    try {
      setIsProcessing(true);
      for (let i = 1; i <= 3; i++) {
        await new Promise((res) => setTimeout(res, 1000));
        updateTaskProgress(taskId, i * 33);
      }

      await action();
      completeTask(taskId);

      await scheduleNotificationAsync({
        content: {
          title: `✅ ${name} ${t(
            "background-task-messages.task-completed-msg"
          )}`,
          body: `${t("background-task-messages.task-type-label")} ${type}`,
        },
        trigger: null,
      });
    } catch (e) {
      console.log(e);
      failTask(taskId);
      await scheduleNotificationAsync({
        content: {
          title: `❌ ${t(
            "background-task-messages.task-error-msg-title"
          )} ${name}`,
          body: t("background-task-messages.task-error-msg"),
        },
        trigger: null,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return { isProcessing, runTask };
};

export default useTaskRunner;
