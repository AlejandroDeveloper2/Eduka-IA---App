import { memo } from "react";
import { View } from "react-native";

import { SizeType } from "@/lib/types";
import { EducativeResource } from "@/lib/types/dataTypes";

import { Colors } from "@/lib/constants/Colors";

import useSourceCardLogic from "@/lib/hooks/core/useSourceCardLogic";

import { getViewer } from "@/lib/utils";

import { Badge, Typography } from "@/components/atoms";
import { IconOnlyButton } from "@/components/molecules";
import PopUp from "../pop-up/PopUp";
import EditResourceTitleForm from "../edit-resource-title-form/EditResourceTitleForm";

import { CardBox, CardHeader, TitleContainer } from "./SourceCard.style";

interface SourceCardProps {
  size: SizeType;
  resourceData: EducativeResource;
}

const SourceCard = ({ size, resourceData }: SourceCardProps): JSX.Element => {
  const {
    editionMode,
    t,
    format,
    animatedCardStyle,
    isMounted,
    animatedPopUpStyle,
    closePopUp,
    toggleActiveSelectionMode,
    onSelectResource,
    activeEditionMode,
  } = useSourceCardLogic(resourceData);

  return (
    <CardBox
      size={size}
      style={animatedCardStyle}
      onLongPress={toggleActiveSelectionMode}
      onPress={onSelectResource}
    >
      <CardHeader>
        <Badge
          size={size}
          label={t(`${format.toLowerCase()}-format-option-label`)}
        />
        <TitleContainer>
          <Typography
            size={size}
            type="button"
            text={resourceData.title}
            color={Colors.neutral[1000]}
            align="center"
            fontWeight="500Medium"
          />
        </TitleContainer>
        <View style={{ position: "absolute", bottom: -15, left: 0 }}>
          <Typography
            size={size}
            type="caption"
            text={resourceData.creationDate}
            color={Colors.neutral[800]}
            align="center"
            fontWeight="300Light"
          />
        </View>
        <IconOnlyButton
          iconName="pencil-outline"
          size={size}
          onPress={activeEditionMode}
          width="auto"
          variant="neutral"
        />
      </CardHeader>
      <PopUp
        title={resourceData.title}
        size={size}
        isMounted={isMounted}
        animatedPopUpStyle={animatedPopUpStyle}
        closePopUp={closePopUp}
      >
        {editionMode ? (
          <EditResourceTitleForm
            resourceData={resourceData}
            editionMode="Preview"
            closePopUp={closePopUp}
          />
        ) : (
          getViewer(resourceData.formatOption.key, size, resourceData.content)
        )}
      </PopUp>
    </CardBox>
  );
};

function areEqual(prev: SourceCardProps, next: SourceCardProps) {
  return (
    prev.resourceData.resourceId === next.resourceData.resourceId &&
    prev.resourceData.title === next.resourceData.title &&
    prev.size === next.size
  );
}

export default memo(SourceCard, areEqual);
