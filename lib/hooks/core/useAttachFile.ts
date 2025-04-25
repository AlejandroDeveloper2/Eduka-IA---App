import { useEffect, useState } from "react";

import { AttachedFile } from "@/lib/types/dataTypes";

import { attachFile } from "@/lib/utils";

const useAttachFile = (updateData: (value: AttachedFile) => void) => {
  const [file, setFile] = useState<AttachedFile | null>(null);

  useEffect(() => {
    if (file) updateData(file);
    else
      updateData({
        fileSize: 0,
        fileUri: "",
        extension: "",
        fileName: "",
      });
  }, [file]);

  const handleAttachFile = async () => {
    const fileAttached = await attachFile();
    setFile(fileAttached ?? null);
  };

  const handleClearFile = (): void => {
    setFile(null);
  };

  return {
    file,
    handleAttachFile,
    handleClearFile,
  };
};
export default useAttachFile;
