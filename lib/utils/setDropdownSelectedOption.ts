export const setDropdownSelectedOption = <T>(
  options: T[],
  optionNameKey: keyof T,
  setValue: string
): T => {
  return options.filter((c) => c[optionNameKey] === setValue)[0];
};
