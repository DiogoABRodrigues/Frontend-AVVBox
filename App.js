import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider, useAuth } from "./src/context/AuthContext";
import AthleteTabs from "./src/screens/Navigator";
import LoginScreen from "./src/screens/LoginScreen";
import { NotificationsProvider } from "./src/context/NotificationsContext";
import { Provider as PaperProvider } from "react-native-paper";
import { StatusBar } from "react-native";
import registerNNPushToken from "native-notify";
import Toast from "react-native-toast-message";
import toastConfig from "./src/componentes/toastConfig";
import * as SplashScreen from 'expo-splash-screen';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  const { user, loadingUser } = useAuth();

  if (loadingUser) {
    return null; // ou um ActivityIndicator
  }
  
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

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  useEffect(() => {
    async function loadFonts() {
      await SplashScreen.preventAutoHideAsync();
      setFontsLoaded(true);
      registerNNPushToken(32298, "FJv06dvuLO2xdBkaBSxXog");
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) return null;

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar backgroundColor="#f8fafc" barStyle="dark-content" />
      <AuthProvider>
        <NotificationsProvider>
          <NavigationContainer>
            <PaperProvider>
              <AppNavigator />
              <Toast config={toastConfig} />
            </PaperProvider>
          </NavigationContainer>
        </NotificationsProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
