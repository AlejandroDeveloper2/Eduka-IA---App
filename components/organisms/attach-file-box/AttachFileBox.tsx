import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { SizeType } from "@/lib/types";

import { Colors } from "@/lib/constants/Colors";

import { useTranslations } from "@/lib/hooks";

import { ErrorMessage, Typography } from "@/components/atoms";
import { IconOnlyButton } from "@/components/molecules";

import {
  AttachedFileBox,
  AttachFileContainer,
  AttachFileInput,
  AttachLabel,
} from "./AttachFile.style";

interface AttachFileBoxProps {
  size: SizeType;
  label: string;
  file: string | null;
  icon: keyof typeof Ionicons.glyphMap;
  errorMessage?: string;
  onAttach: () => void;
  onClearFile: () => void;
}

function AttachFileBox({
  size,
  label,
  file,
  icon,
  errorMessage,
  onAttach,
  onClearFile,
}: AttachFileBoxProps): JSX.Element {
  const { t } = useTranslations();

  return (
    <AttachFileContainer>
      <AttachLabel>
        <Ionicons
          name={icon}
          color={Colors.neutral[400]}
          size={size === "Large" ? 24 : 20}
        />
        <Typography
          size={size}
          type="paragraph"
          text={label}
          color={Colors.neutral[1000]}
          align="left"
          fontWeight="400Regular"
        />
      </AttachLabel>
      <AttachFileInput>
        {!file ? (
          <View style={{ width: "65%" }}>
            <Typography
              size={size}
              type="caption"
              text={t(
                "home-screen-translations.request-resource-form-labels.form-input-file-placeholder"
              )}
              color={Colors.neutral[1000]}
              align="left"
              fontWeight="300Light"
            />
          </View>
        ) : (
          <AttachedFileBox>
            <Ionicons
              name="close-outline"
              color={Colors.neutral[700]}
              size={size === "Large" ? 24 : 20}
              onPress={onClearFile}
            />
            <Typography
              size={size}
              type="paragraph"
              text={file}
              color={Colors.neutral[900]}
              align="left"
              fontWeight="400Regular"
            />
          </AttachedFileBox>
        )}

        <IconOnlyButton
          iconName="attach-outline"
          size={size}
          width="auto"
          onPress={onAttach}
          variant="neutral"
          disabled={file !== null}
        />
      </AttachFileInput>
      {errorMessage && <ErrorMessage message={errorMessage} size={size} />}
    </AttachFileContainer>
  );
}

export default AttachFileBox;
