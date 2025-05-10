import { Ionicons } from "@expo/vector-icons";

import { FilterOptionKey } from "@/lib/types/dataTypes";
import { SizeType } from "@/lib/types";

import { Colors } from "@/lib/constants/Colors";
import { FILTER_OPTIONS } from "@/lib/constants/FilterOptions";

import {
  useCanAccessResources,
  useLangStore,
  useTranslations,
} from "@/lib/hooks";

import { InfoCard, PanelOption, ScreenSection } from "@/components/molecules";
import { Subtitle } from "@/components/atoms";

import { FilterList, ListHeader } from "./MyResourcesHeader.style";

interface MyResourcesHeaderProps {
  size: SizeType;
  selectedFilter: FilterOptionKey;
  onSelectFilter: (filter: FilterOptionKey) => void;
}

const MyResourcesHeader = ({
  selectedFilter,
  onSelectFilter,
  size,
}: MyResourcesHeaderProps): JSX.Element => {
  const { language } = useLangStore();
  const { t } = useTranslations();
  const { remaningExpirationDays } = useCanAccessResources();

  return (
    <ListHeader>
      {remaningExpirationDays > 0 && (
        <InfoCard
          description={`${t(
            "my-resources-screen-translations.can-access-info"
          )} ${remaningExpirationDays} ${t(
            "my-resources-screen-translations.can-access-remaning-time"
          )}`}
          size={size}
        />
      )}
      <ScreenSection
        title={t("my-resources-screen-translations.screen-title")}
        description={t("my-resources-screen-translations.screen-description")}
        Icon={() => (
          <Ionicons
            name="folder-outline"
            size={32}
            color={Colors.primary[400]}
          />
        )}
        size="Small"
      />
      <Subtitle
        subTitle={t("my-resources-screen-translations.list-filters-title")}
        Icon={() => (
          <Ionicons
            name="filter-outline"
            color={Colors.primary[400]}
            size={28}
          />
        )}
        size={size}
      />
      <FilterList>
        {FILTER_OPTIONS[language].map((filter) => (
          <PanelOption
            key={filter.optionLabel}
            optionValue={filter.optionLabel}
            iconName={filter.iconName}
            size={size}
            selected={filter.key === selectedFilter}
            onPress={() => {
              onSelectFilter(filter.key);
            }}
          />
        ))}
      </FilterList>
    </ListHeader>
  );
};

export default MyResourcesHeader;
