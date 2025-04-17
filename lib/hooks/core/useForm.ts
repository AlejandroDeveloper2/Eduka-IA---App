import { createRef, useEffect, useRef, useState } from "react";
import { ScrollView, TextInput, View } from "react-native";

import { ValidationSchema } from "@/lib/utils";

const useForm = <T>(
  initialData: T,
  validationSchema: ValidationSchema,
  action: () => void,
  scrollViewRef?: React.RefObject<ScrollView>,
  updatedInitialData?: T
) => {
  const [data, setData] = useState<T>(initialData);
  const [errors, setErrors] = useState<Record<keyof T, string[]>>(Object({}));

  const inputRefs = useRef<Record<string, React.RefObject<TextInput>>>({});
  const dropdownRefs = useRef<Record<string, React.RefObject<View>>>({});

  const getInputRef = (name: keyof T): React.RefObject<TextInput> => {
    if (!inputRefs.current[name as string]) {
      inputRefs.current[name as string] = createRef<TextInput>();
    }
    return inputRefs.current[name as string];
  };

  const getDropdownRef = (name: keyof T): React.RefObject<View> => {
    if (!dropdownRefs.current[name as string]) {
      dropdownRefs.current[name as string] = createRef<View>();
    }
    return dropdownRefs.current[name as string];
  };

  const handleChange = (name: keyof T, text: string): void => {
    setData({ ...data, [name]: text });
  };

  const scrollToField = (key: keyof T) => {
    const dropdownRef = dropdownRefs.current[key as string];
    const inputRef = inputRefs.current[key as string];

    if (inputRef?.current?.focus) {
      inputRef.current.focus();
      return;
    }
    if (dropdownRef?.current && scrollViewRef && scrollViewRef.current) {
      dropdownRef.current.measure((x, y, width, height, pageX, pageY) => {
        scrollViewRef.current?.scrollTo({
          y: pageY,
          animated: true,
        });
      });
      return;
    }
  };

  const handleSubmit = (): void => {
    const validationResult = validationSchema.validate(data);
    // console.log(validationResult.errors);
    if (validationResult.valid) {
      setErrors(Object({}));
      action();
      return;
    }
    const firstErrorKey = Object.keys(validationResult.errors)[0] as keyof T;
    scrollToField(firstErrorKey);
    setErrors(validationResult.errors);
  };

  const updateData = <D>(fieldKey: keyof T, value: D): void => {
    setData({ ...data, [fieldKey]: value });
  };

  const getInputError = (fieldName: keyof T): string | undefined => {
    return errors[fieldName]?.length > 0
      ? errors[fieldName].join("; ")
      : undefined;
  };

  const clearFormData = (): void => {
    setData(initialData);
  };

  useEffect(() => {
    if (updatedInitialData) {
      setData(updatedInitialData);
      return;
    }
  }, [updatedInitialData]);

  return {
    data,
    getInputRef,
    getDropdownRef,
    getInputError,
    updateData,
    handleChange,
    handleSubmit,
    clearFormData,
  };
};

export default useForm;
