import { Link, Stack } from "expo-router";
import { View, StyleSheet } from "react-native";

import { Colors } from "@/lib/constants/Colors";

import Typography from "@/components/atoms/typography/Typography";

export default function NotFoundScreen(): JSX.Element {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View style={styles.container}>
        <Typography
          size="Small"
          type="button"
          text="¡Upps pantalla no encontrada!"
          color={Colors.neutral[1000]}
          align="center"
          fontWeight="400Regular"
        />
        <Link href="/" style={styles.link}>
          <Typography
            size="Small"
            type="paragraph"
            text="Ir a la pantalla principal"
            color={Colors.neutral[900]}
            align="center"
            fontWeight="700Bold"
          />
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
