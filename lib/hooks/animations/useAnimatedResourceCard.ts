import { useMemo } from "react";
import { useAnimatedStyle, withTiming } from "react-native-reanimated";

import { EducativeResource } from "@/lib/types/dataTypes";

import { Colors } from "@/lib/constants/Colors";

import useEducativeResourcesStore from "../store/useEducativeResourcesStore";

const useAnimatedResourceCard = (resourceData: EducativeResource) => {
  const { selectedResources } = useEducativeResourcesStore();

  const isResourceSelected = useMemo(() => {
    return selectedResources.some(
      (resource) => resource.resourceId === resourceData.resourceId
    );
  }, [selectedResources, resourceData.resourceId]);

  const animatedCardStyle = useAnimatedStyle(() => {
    return {
      borderColor: withTiming(
        isResourceSelected ? Colors.primary[400] : Colors.neutral[50],
        { duration: 300 }
      ),
      borderWidth: withTiming(isResourceSelected ? 2 : 1, { duration: 300 }),
      backgroundColor: withTiming(
        isResourceSelected ? Colors.neutral[0] : Colors.basic.white,
        { duration: 300 }
      ),
    };
  }, [isResourceSelected]);

  return {
    animatedCardStyle,
  };
};

export default useAnimatedResourceCard;
