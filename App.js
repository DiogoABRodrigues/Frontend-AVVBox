import React, { useEffect, useState } from "react";
import { StyleSheet, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider, useAuth } from "./src/context/AuthContext";
import AthleteTabs from "./src/screens/Navigator";
import LoginScreen from "./src/screens/LoginScreen";
import { NotificationsProvider } from "./src/context/NotificationsContext";
import registerNNPushToken from "native-notify";
import Toast from "react-native-toast-message";
import toastConfig from "./src/componentes/toastConfig";
import * as SplashScreen from "expo-splash-screen";
import { ThemeProvider, useThemeContext } from "./src/context/ThemeContext";
import { Provider as PaperProvider } from "react-native-paper";

const Stack = createNativeStackNavigator();

function AppNavigator() {
  const { user, loadingUser } = useAuth();

  if (loadingUser) return null;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name="Athlete" component={AthleteTabs} />
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
}

// 🔹 Este componente vai usar o tema atual do contexto
function ThemedApp() {
  const { theme, isDarkMode } = useThemeContext();
const { colors } = useThemeContext();
  return (
    <PaperProvider theme={theme}>
      <StatusBar
        backgroundColor={isDarkMode ? colors.black : colors.background}
        barStyle={isDarkMode ? "light-content" : "dark-content"}
      />
      <AuthProvider>
        <NotificationsProvider>
          <NavigationContainer>
            <AppNavigator />
            <Toast config={toastConfig} />
          </NavigationContainer>
        </NotificationsProvider>
      </AuthProvider>
    </PaperProvider>
  );
}

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await SplashScreen.preventAutoHideAsync();
      setFontsLoaded(true);
      registerNNPushToken(32298, "FJv06dvuLO2xdBkaBSxXog");
      // podes adicionar setup de notificações aqui se quiseres
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) return null;

  return (
    <GestureHandlerRootView style={styles.container}>
      {/* 🌓 Envolves tudo com o ThemeProvider */}
      <ThemeProvider>
        <ThemedApp />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
