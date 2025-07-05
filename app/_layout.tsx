import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Slot, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import {
  useFonts,
  Roboto_700Bold,
  Roboto_500Medium,
  Roboto_400Regular,
} from "@expo-google-fonts/roboto";

import "../presentation/styles/global.css";

export const unstable_settings = {
  initialRouteName: "home",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Roboto_700Bold,
    Roboto_500Medium,
    Roboto_400Regular,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack>
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen name="analytics" options={{ title: "Resumo" }} />
        <Stack.Screen name="profile" options={{ title: "Perfil" }} />
        <Stack.Screen
          name="nutritionist-profile"
          options={{ title: "Nutricionista" }}
        />
        <Stack.Screen
          name="food-list"
          options={{ title: "Lista de Alimentos" }}
        />
        <Stack.Screen
          name="meal-history"
          options={{ title: "Histórico de Refeições" }}
        />
        <Stack.Screen
          name="meal-register"
          options={{ title: "Registrar Refeição" }}
        />
        <Stack.Screen
          name="water-register"
          options={{ title: "Registrar Água" }}
        />
      </Stack>
    </ThemeProvider>
  );
}
