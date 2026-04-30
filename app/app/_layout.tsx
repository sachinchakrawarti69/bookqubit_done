import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import themes from "@/src/themes";
import { useThemeStore } from "@/store/themeStore";

export default function RootLayout() {
  const { currentTheme } = useThemeStore();
  const theme = themes[currentTheme];

  return (
    <SafeAreaProvider>
      {/* STATUS BAR */}
      <StatusBar
        style={currentTheme === "dark" ? "light" : "dark"}
        backgroundColor={theme.background}
        translucent={Platform.OS === "android"}
      />

      {/* ROUTER */}
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "fade",
          contentStyle: {
            backgroundColor: theme.background,
          },
        }}
      >
        {/* Splash screen (optional) */}
        <Stack.Screen name="splash" />

        {/* Main app */}
        <Stack.Screen name="(drawer)" />
      </Stack>
    </SafeAreaProvider>
  );
}