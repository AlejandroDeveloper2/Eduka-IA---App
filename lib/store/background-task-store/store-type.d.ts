export type TaskType = "generate" | "download" | "remove";

export interface Task {
  id: string;
  type: TaskType;
  name: string;
  progress: number; // between 0 - 100
  status: "pending" | "running" | "done" | "error";
}

export interface BackgroundTaskStoreState {
  tasks: Task[];
}

export interface BackgroundTaskStoreActions {
  addTask: (task: Task) => void;
  updateTaskProgress: (id: string, progress: number) => void;
  completeTask: (id: string) => void;
  failTask: (id: string) => void;
  removeTask: (id: string) => void;
}

export type BackgroundTaskStoreType = BackgroundTaskStoreState &
  BackgroundTaskStoreActions;
