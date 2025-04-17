import { useEffect, useState } from "react";

const useLoader = (isGenerating: boolean, duration: number): number => {
  const [loadPercentage, setLoadPercentage] = useState<number>(0);

  useEffect(() => {
    if (!isGenerating || duration <= 0) return;

    setLoadPercentage(0);

    const delay: number = duration / 100;
    const interval = setInterval(() => {
      setLoadPercentage((previousLoadPercentage) => {
        if (previousLoadPercentage < 100) {
          return previousLoadPercentage + 1;
        }
        clearInterval(interval);
        return previousLoadPercentage;
      });
    }, delay);

    return () => clearInterval(interval);
  }, [isGenerating, duration]);

  return loadPercentage;
};

export default useLoader;
