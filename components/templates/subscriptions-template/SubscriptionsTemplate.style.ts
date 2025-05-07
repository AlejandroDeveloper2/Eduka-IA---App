import { StyleSheet } from "react-native";

import { Spacing } from "@/lib/constants/Spacing";

const ScrollViewStyles = StyleSheet.create({
  ScrollHomeContent: {
    width: "100%",
    height: "auto",
    display: "flex",
    flexDirection: "column",
    paddingTop: Spacing.spacing_lg,
  },
});

export { ScrollViewStyles };
