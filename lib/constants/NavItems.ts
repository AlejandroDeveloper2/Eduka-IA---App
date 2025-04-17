import { Lang, NavItemData, NavOption } from "@/lib/types/dataTypes";

export const NavItems: Lang<NavItemData> = {
  es: [
    {
      label: "Inicio",
      iconName: "home-outline",
    },
    {
      label: "Mis Recursos",
      iconName: "folder-outline",
    },
    {
      label: "Descargas",
      iconName: "download-outline",
    },
  ],
  en: [
    {
      label: "Home",
      iconName: "home-outline",
    },
    {
      label: "My Resources",
      iconName: "folder-outline",
    },
    {
      label: "Downloads",
      iconName: "download-outline",
    },
  ],
  pt: [
    {
      label: "Início",
      iconName: "home-outline",
    },
    {
      label: "Meus Recursos",
      iconName: "folder-outline",
    },
    {
      label: "Descarregamentos",
      iconName: "download-outline",
    },
  ],
};

export const MyResourcesActions: Lang<NavOption> = {
  es: [
    {
      label: "Descargar",
      iconName: "download-outline",
      active: false,
      onPress: () => {},
    },
    {
      label: "Eliminar",
      iconName: "trash-outline",
      active: false,
      onPress: () => {},
    },
  ],
  en: [
    {
      label: "Download",
      iconName: "download-outline",
      active: false,
      onPress: () => {},
    },
    {
      label: "Delete",
      iconName: "trash-outline",
      active: false,
      onPress: () => {},
    },
  ],
  pt: [
    {
      label: "Baixar",
      iconName: "download-outline",
      active: false,
      onPress: () => {},
    },
    {
      label: "Excluir",
      iconName: "trash-outline",
      active: false,
      onPress: () => {},
    },
  ],
};
