import { StateCreator } from "zustand";

import {
  BackgroundTaskStoreActions,
  BackgroundTaskStoreType,
} from "./store-type";

export const createActions: StateCreator<
  BackgroundTaskStoreType,
  [],
  [],
  BackgroundTaskStoreActions
> = (set, get) => ({
  addTask: (task) => set({ tasks: [...get().tasks, task] }),

  updateTaskProgress: (id, progress) =>
    set({
      tasks: get().tasks.map((t) =>
        t.id === id ? { ...t, progress, status: "running" } : t
      ),
    }),

  completeTask: (id) =>
    set({
      tasks: get().tasks.map((t) =>
        t.id === id ? { ...t, progress: 100, status: "done" } : t
      ),
    }),

  failTask: (id) =>
    set({
      tasks: get().tasks.map((t) =>
        t.id === id ? { ...t, status: "error" } : t
      ),
    }),

  removeTask: (id) => set({ tasks: get().tasks.filter((t) => t.id !== id) }),
});
