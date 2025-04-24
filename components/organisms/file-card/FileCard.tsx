import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { GestureDetector } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

import { SizeType } from "@/lib/types";
import { DownloadedFileInfo } from "@/lib/types/dataTypes";

import { Colors } from "@/lib/constants/Colors";
import { Spacing } from "@/lib/constants/Spacing";

import { useAnimatedFileCard, useAnimatedPopUp } from "@/lib/hooks";

import { Typography } from "@/components/atoms";
import { IconOnlyButton } from "@/components/molecules";
import PopUp from "../pop-up/PopUp";
import EditResourceTitleForm from "../edit-resource-title-form/EditResourceTitleForm";

import { FileCardBody, FileCardBox, SizeIndicator } from "./FileCard.style";

interface FileCardProps {
  fileInfo: DownloadedFileInfo;
  size: SizeType;
  onPressFile: () => void;
  onDeleteFile: () => void;
}

const FileCard = ({
  fileInfo,
  size,
  onPressFile,
  onDeleteFile,
}: FileCardProps): JSX.Element => {
  const { swipeToLeftGesture, animatedCardStyle, animatedContainerStyle } =
    useAnimatedFileCard(onDeleteFile);

  const { isMounted, animatedPopUpStyle, openPopUp, closePopUp } =
    useAnimatedPopUp();

  return (
    <Animated.View
      style={[animatedContainerStyle, { width: "100%", height: "auto" }]}
    >
      <FileCardBox size={size} style={animatedCardStyle}>
        <GestureDetector gesture={swipeToLeftGesture}>
          <FileCardBody>
            <MaterialCommunityIcons
              name={
                fileInfo.extension === "txt"
                  ? "text-box-outline"
                  : fileInfo.extension === "pdf"
                  ? "file-pdf-box"
                  : "image-outline"
              }
              size={size === "Large" ? 24 : 20}
              color={Colors.primary[400]}
            />
            <View
              style={{
                display: "flex",
                width: 150,
                maxWidth: 150,
                flexDirection: "row",
                justifyContent: "flex-start",
              }}
            >
              <Typography
                size={size}
                type="paragraph"
                text={fileInfo.name}
                color={Colors.neutral[1000]}
                align="left"
                fontWeight="500Medium"
              />
            </View>
          </FileCardBody>
        </GestureDetector>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: Spacing.spacing_2xs,
          }}
        >
          <IconOnlyButton
            iconName="pencil-outline"
            size={size}
            width="auto"
            variant="neutral"
            onPress={openPopUp}
          />
          <IconOnlyButton
            iconName="share-social-outline"
            size={size}
            width="auto"
            variant="neutral"
            onPress={onPressFile}
          />
        </View>
        <SizeIndicator>
          <Typography
            size={size}
            type="caption"
            text={fileInfo.size}
            color={Colors.neutral[900]}
            align="left"
            fontWeight="700Bold"
          />
        </SizeIndicator>
      </FileCardBox>
      <PopUp
        title={fileInfo.name.split(".")[0]}
        size={size}
        isMounted={isMounted}
        animatedPopUpStyle={animatedPopUpStyle}
        closePopUp={closePopUp}
      >
        <EditResourceTitleForm
          resourceData={fileInfo}
          editionMode="Downloaded-file"
          closePopUp={closePopUp}
        />
      </PopUp>
    </Animated.View>
  );
};

export default FileCard;
