import { SizeType } from "@/lib/types";

import { Colors } from "@/lib/constants/Colors";

import useIAResponseBoxLogic from "@/lib/hooks/core/useIAResponseBoxLogic";

import { copyToClipboard, generateUniqueId, getViewer } from "@/lib/utils";

import { Badge, Typography } from "@/components/atoms";
import { IconOnlyButton } from "@/components/molecules";
import PopUp from "../pop-up/PopUp";
import SaveResourceForm from "../save-resource-form/SaveResourceForm";

import {
  IaResponseContainer,
  IaResponseHeader,
  IaResponseOptions,
} from "./IaResponseBox.style";

interface IaResponseBoxProps {
  size: SizeType;
}

const IaResponseBox = ({ size }: IaResponseBoxProps): JSX.Element => {
  const {
    t,
    generatedEducativeResource,
    regenerateEducativeResource,
    downloadSingleResource,
    editResourceRequest,
    addTask,
    isProcessing,
    runTask,
    isLoading,
    toggleLoading,
    isMounted,
    animatedPopUpStyle,
    closePopUp,
    openPopUp,
    formatKey,
    formatText,
    generatedContent,
  } = useIAResponseBoxLogic();

  return (
    <IaResponseContainer size={size}>
      <IaResponseHeader>
        <Badge label={formatText} size={size} />
        <Typography
          size={size}
          type="caption"
          text={
            generatedEducativeResource
              ? generatedEducativeResource.creationDate
              : "yyyy-mm-dd"
          }
          color={Colors.neutral[500]}
          align="right"
          fontWeight="400Regular"
        />
      </IaResponseHeader>
      {getViewer(formatKey, size, generatedContent)}
      <IaResponseOptions>
        <IconOnlyButton
          iconName="save-outline"
          size={size}
          variant="neutral"
          width="auto"
          onPress={openPopUp}
        />
        <IconOnlyButton
          iconName="pencil-outline"
          size={size}
          variant="neutral"
          width="auto"
          onPress={editResourceRequest}
        />
        <IconOnlyButton
          iconName="reload-outline"
          size={size}
          variant="neutral"
          width="auto"
          onPress={() => {
            const taskId: string = generateUniqueId();
            addTask({
              id: taskId,
              name:
                t("background-task-messages.generate-task-name") +
                generatedEducativeResource?.title,
              type: "generate",
              progress: 0,
              status: "pending",
            });
            runTask(
              taskId,
              "generate",
              t("background-task-messages.generate-task-name") +
                generatedEducativeResource?.title,
              async () => await regenerateEducativeResource()
            );
          }}
          loading={isProcessing}
          disabled={isProcessing}
        />
        <IconOnlyButton
          iconName="download-outline"
          size="Small"
          variant="neutral"
          width="auto"
          onPress={() => downloadSingleResource(toggleLoading)}
          loading={isLoading}
        />
        {formatKey === "Text" && (
          <IconOnlyButton
            iconName="copy-outline"
            size="Small"
            variant="neutral"
            width="auto"
            onPress={async () =>
              await copyToClipboard(
                generatedEducativeResource
                  ? generatedEducativeResource.content
                  : "text"
              )
            }
          />
        )}
      </IaResponseOptions>
      <PopUp
        title={t(
          "home-screen-translations.save-resource-form-labels.form-title"
        )}
        size={size}
        isMounted={isMounted}
        animatedPopUpStyle={animatedPopUpStyle}
        closePopUp={closePopUp}
      >
        <SaveResourceForm closePopUp={closePopUp} />
      </PopUp>
    </IaResponseContainer>
  );
};

export default IaResponseBox;
