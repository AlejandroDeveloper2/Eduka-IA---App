import { BackHandler, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { usePathname, useRouter } from "expo-router";

import { SizeType } from "@/lib/types";

import { Spacing } from "@/lib/constants/Spacing";

import { useEducativeResourcesStore, useTranslations } from "@/lib/hooks";

import { Logo } from "@/components/atoms";
import { NavItem, ToolBar } from "@/components/molecules";

import { HeaderBox, HeaderOptions } from "./Header.style";

interface HeaderProps {
  size: SizeType;
}

const Header = ({ size }: HeaderProps): JSX.Element => {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  const router = useRouter();

  const { t } = useTranslations();

  const { isGenerating, selectedResources, selectionMode } =
    useEducativeResourcesStore();

  return (
    <HeaderBox style={{ paddingTop: insets.top + Spacing.spacing_md }}>
      {selectionMode ? (
        <ToolBar
          size={size}
          text={`${t("my-resources-screen-translations.tool-bar-label")} (${
            selectedResources.length
          })`}
        />
      ) : (
        <>
          <HeaderOptions>
            <NavItem
              size={size}
              iconName="arrow-back-outline"
              active={false}
              onPress={() => router.back()}
              disabled={pathname === "/" || isGenerating}
            />
          </HeaderOptions>
          <Logo size={size} />
          <HeaderOptions>
            <NavItem
              size={size}
              iconName="download-outline"
              active={isGenerating ? false : pathname === "/download-history"}
              disabled={isGenerating}
              onPress={() => router.navigate("/download-history")}
            />
            {Platform.OS === "android" && (
              <NavItem
                size={size}
                iconName="power-outline"
                active={false}
                onPress={() => BackHandler.exitApp()}
              />
            )}
          </HeaderOptions>
        </>
      )}
    </HeaderBox>
  );
};

export default Header;
