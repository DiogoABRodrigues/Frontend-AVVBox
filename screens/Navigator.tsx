import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Ionicons } from "@expo/vector-icons";
import TrainingScreen from "./TrainingScreen";
import MeasuresScreen from "./MeasurementsScreen";
import NotificationsScreen from "./NotificationsScreen";
import ProfileScreen from "./ProfileScreen";
import { styles } from "./styles/Navigator.styles";
import { getUserNotifications } from "../services/notificationService";
import { useAuth } from "../context/AuthContext";

const Tab = createMaterialTopTabNavigator();

export default function AthleteTabs() {
  const { user } = useAuth();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const notifications = await getUserNotifications(user.id);
        const unread = notifications.filter((n) => !(n.readBy?.includes(user.id))).length;
        setUnreadCount(unread);
      } catch (error) {
        console.error("Erro ao buscar notificações:", error);
      }
    };

    fetchNotifications();
  }, []);

  const renderIcon = (routeName: string) => {
    switch (routeName) {
      case "Treino": return "barbell-outline";
      case "Notificações": return "notifications-outline";
      case "Medidas": return "scale-outline";
      case "Perfil": return "person-outline";
      default: return "home-outline";
    }
  };

  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      screenOptions={({ route }) => ({
        swipeEnabled: true, // permite swipe entre tabs
        tabBarShowIcon: true,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarIndicatorStyle: { backgroundColor: "transparent" },
        headerShown: true,
        headerTitle: () => {
          const titleIcon = renderIcon(route.name);
          return (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name={titleIcon as keyof typeof Ionicons.glyphMap} size={26} color="#000000ff" />
              <Text style={{ fontSize: 26, fontWeight: "bold", marginLeft: 8 }}>
                {route.name}
              </Text>
            </View>
          );
        },
        tabBarIcon: ({ focused }) => {
          const iconName = renderIcon(route.name);
          return (
            <View style={{ alignItems: 'center' }}>
              <Ionicons
                name={iconName as keyof typeof Ionicons.glyphMap}
                size={24}
                color={focused ? '#000000' : 'gray'}
              />
              <Text style={{ color: focused ? '#000000' : 'gray', fontSize: 12 }}>
                {route.name}
              </Text>
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Treino" component={TrainingScreen} />
      <Tab.Screen name="Notificações" component={NotificationsScreen} />
      <Tab.Screen name="Medidas" component={MeasuresScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
