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
import registerNNPushToken, { NativeNotify } from "native-notify";
import Toast from "react-native-toast-message";
import toastConfig from "./src/componentes/toastConfig";
import * as SplashScreen from "expo-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

const setupDataNotifications = () => {
  NativeNotify.setDataNotificationHandler(async (data) => {
    console.log("📱 Notificação de dados recebida:", data);

    try {
      // 1. Salvar no storage local
      const notificationKey = `msg_${Date.now()}`;
      const notificationData = {
        ...data,
        id: data.message_id || notificationKey,
        received_at: new Date().toISOString(),
        read: false,
      };

      await AsyncStorage.setItem(
        notificationKey,
        JSON.stringify(notificationData)
      );
      console.log("💾 Notificação salva localmente:", notificationKey);

      // 2. Criar notificação local com ID único
      const notificationId = data.message_id
        ? parseInt(data.message_id.replace(/\D/g, "").slice(-9))
        : Date.now();

      await NativeNotify.createLocalNotification({
        title: data.title || "Nova Mensagem",
        message: data.message || "Você tem uma nova mensagem",
        id: notificationId,
        largeIcon: "ic_launcher",
        smallIcon: "ic_notification",
      });
    } catch (error) {
      console.log("❌ Erro ao processar notificação:", error);
    }
  });
};

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
      setupDataNotifications();
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
