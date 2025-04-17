import { useState } from "react";

const useLoading = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);

  const toggleLoading = (message: string | null, isLoading: boolean): void => {
    setMessage(message);
    setIsLoading(isLoading);
  };

  return {
    isLoading,
    message,
    toggleLoading,
  };
};

export default useLoading;
