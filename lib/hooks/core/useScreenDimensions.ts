import { useEffect } from "react";
import { Dimensions } from "react-native";

import { SizeType } from "@/lib/types";

import useScreenSizeStore from "../store/useScreenSizeStore";

const useScreenDimensions = (): SizeType => {
  const { size, getScreenSize } = useScreenSizeStore();

  useEffect(() => {
    Dimensions.addEventListener("change", ({ screen }) =>
      getScreenSize(screen.width)
    );
  }, []);

  return size;
};

export default useScreenDimensions;
