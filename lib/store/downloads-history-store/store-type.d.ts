export interface DownloadsHistoryStoreState {
  downloadedResources: DownloadedFileInfo[];
}

export interface DownloadsHistoryStoreActons {
  findDownloadedResources: (
    toggleLoading: (message: string | null, isLoading: boolean) => void
  ) => Promise<void>;
  shareResource: (resourceName: string) => Promise<void>;
  removeDownloadedResource: (resourceName: string) => Promise<void>;
}

export type DownloadsHistoryStoreType = DownloadsHistoryStoreState &
  DownloadsHistoryStoreActons;
