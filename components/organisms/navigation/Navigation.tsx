import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { SizeType } from "@/lib/types";
import { NavOption } from "@/lib/types/dataTypes";

import { NavItems } from "@/lib/constants/NavItems";

import { useTranslations } from "@/lib/hooks";

import { NavItem } from "@/components/molecules";

import { NavigationBox } from "./Navigation.style";

interface NavigationProps extends BottomTabBarProps {
  size: SizeType;
  myResourcesActions: NavOption[];
}

const Navigation = ({
  size,
  myResourcesActions,
  state,
  descriptors,
  navigation,
}: NavigationProps): JSX.Element => {
  const insets = useSafeAreaInsets();

  const { language } = useTranslations();

  const sortedRoutes = [state.routes[0], state.routes[1], state.routes[2]];

  return (
    <NavigationBox size={size} insetsBottom={insets.bottom}>
      {myResourcesActions.length > 0
        ? myResourcesActions.map((navItem) => (
            <NavItem
              key={navItem.label}
              label={navItem.label}
              size={size}
              iconName={navItem.iconName}
              active={navItem.active}
              disabled={navItem.disabled}
              onPress={navItem.onPress}
            />
          ))
        : sortedRoutes.map((route, index) => {
            const isFocused =
              state.index ===
              state.routes.findIndex((r) => r.key === route.key);

            const { options } = descriptors[route.key];

            options.title = NavItems[language][index].label;

            return (
              <NavItem
                key={route.key}
                label={options.title}
                size={size}
                iconName={NavItems[language][index].iconName}
                active={isFocused}
                onPress={() => navigation.navigate(route.name)}
              />
            );
          })}
    </NavigationBox>
  );
};

export default Navigation;
