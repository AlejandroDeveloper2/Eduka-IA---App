import { memo } from "react";

import { SizeType } from "@/lib/types";
import { EducativeResource } from "@/lib/types/dataTypes";

import { Colors } from "@/lib/constants/Colors";

import useSourceCardLogic from "@/lib/hooks/core/useSourceCardLogic";

import { getViewer } from "@/lib/utils";

import { Badge, Typography } from "@/components/atoms";
import PopUp from "../pop-up/PopUp";

import { CardBox, CardHeader, TitleContainer } from "./SourceCard.style";

interface SourceCardProps {
  size: SizeType;
  resourceData: EducativeResource;
}

const SourceCard = ({ size, resourceData }: SourceCardProps): JSX.Element => {
  const {
    t,
    format,
    selectionMode,
    activeSelectionMode,
    selectEducativeResource,
    animatedCardStyle,
    isMounted,
    animatedPopUpStyle,
    openPopUp,
    closePopUp,
  } = useSourceCardLogic(resourceData);

  return (
    <CardBox
      size={size}
      style={animatedCardStyle}
      onLongPress={() => {
        if (!selectionMode) {
          activeSelectionMode();

          setTimeout(() => {
            selectEducativeResource(resourceData);
          }, 0);
        }
      }}
      onPress={() => {
        if (selectionMode) {
          selectEducativeResource(resourceData);
          return;
        }
        openPopUp();
      }}
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
        <Typography
          size={size}
          type="caption"
          text={resourceData.creationDate}
          color={Colors.neutral[800]}
          align="center"
          fontWeight="300Light"
        />
      </CardHeader>
      <PopUp
        title={resourceData.title}
        size={size}
        isMounted={isMounted}
        animatedPopUpStyle={animatedPopUpStyle}
        closePopUp={closePopUp}
      >
        {getViewer(resourceData.formatOption.key, size, resourceData.content)}
      </PopUp>
    </CardBox>
  );
};

function areEqual(prev: SourceCardProps, next: SourceCardProps) {
  return (
    prev.resourceData.resourceId === next.resourceData.resourceId &&
    prev.size === next.size
  );
}

export default memo(SourceCard, areEqual);
