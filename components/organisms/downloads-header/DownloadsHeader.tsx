import { Ionicons } from "@expo/vector-icons";

import { SizeType } from "@/lib/types";

import { Colors } from "@/lib/constants/Colors";

import { useCanAccessResources, useTranslations } from "@/lib/hooks";

import { InfoCard, ScreenSection } from "@/components/molecules";
import { Subtitle } from "@/components/atoms";

import { ListHeader } from "./DownloadsHeader.style";

interface DownloadsHeaderProps {
  size: SizeType;
  downloadedResources: number;
}

const DownloadsHeader = ({
  size,
  downloadedResources,
}: DownloadsHeaderProps): JSX.Element => {
  const { t } = useTranslations();
  const { remaningExpirationDays } = useCanAccessResources();

  return (
    <ListHeader>
      {remaningExpirationDays > 0 && (
        <InfoCard
          description={`${t(
            "download-history-screen-translations.can-access-info"
          )} ${remaningExpirationDays} ${t(
            "download-history-screen-translations.can-access-remaning-time"
          )}`}
          size={size}
        />
      )}
      <ScreenSection
        title={t("download-history-screen-translations.screen-title")}
        description={t(
          "download-history-screen-translations.screen-description"
        )}
        Icon={() => (
          <Ionicons
            name="download-outline"
            size={32}
            color={Colors.primary[400]}
          />
        )}
        size={size}
      />
      <Subtitle
        subTitle={
          t("download-history-screen-translations.file-list-title") +
          `(${downloadedResources})`
        }
        size={size}
        Icon={() => (
          <Ionicons
            name="folder-outline"
            size={28}
            color={Colors.primary[400]}
          />
        )}
      />
    </ListHeader>
  );
};

export default DownloadsHeader;
