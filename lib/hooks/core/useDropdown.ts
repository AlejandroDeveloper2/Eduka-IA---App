import { useState, useEffect } from "react";

const useDropdown = <T>(
  optionKey: keyof T,
  defaultOption: T | null,
  updateData: (value: string) => void
) => {
  const [selectedOption, setSelectedOption] = useState<T | null>(null);

  useEffect(() => {
    setSelectedOption(defaultOption);
  }, [defaultOption]);

  useEffect(() => {
    if (selectedOption) updateData(selectedOption[optionKey] as string);
    else updateData("");
  }, [selectedOption]);

  const handleSelectOption = (option: T) => {
    setSelectedOption(option);
  };

  const handleClearOption = (): void => {
    setSelectedOption(null);
  };

  return {
    selectedOption,
    handleSelectOption,
    handleClearOption,
  };
};

export default useDropdown;
