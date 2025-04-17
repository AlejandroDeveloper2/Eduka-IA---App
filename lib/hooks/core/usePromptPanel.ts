import { useEffect, useState } from "react";

import { FormatOption } from "@/lib/types/dataTypes";

const usePromptPanel = (
  defaultOption: FormatOption,
  updateData: (value: FormatOption) => void
) => {
  const [selectedOption, setSelectedOption] =
    useState<FormatOption>(defaultOption);

  const onSelectOption = (option: FormatOption): void => {
    setSelectedOption(option);
  };

  useEffect(() => {
    updateData(selectedOption);
  }, [selectedOption]);

  return {
    selectedOption,
    onSelectOption,
  };
};

export default usePromptPanel;
