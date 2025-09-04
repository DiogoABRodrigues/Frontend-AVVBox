import React from "react";
import { View, Text } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Ionicons } from "@expo/vector-icons";

import TrainingScreen from "./TrainingScreen";
import MeasuresScreen from "./MeasurementsScreen";
import NotificationsScreen from "./NotificationsScreen";
import ProfileScreen from "./ProfileScreen";

import { styles } from "./styles/Navigator.styles";
import { useNotifications } from "../context/NotificationsContext";

const Tab = createMaterialTopTabNavigator();

export default function AthleteTabs() {
  const { notifications } = useNotifications();

  // Badge: quantidade de notificações não lidas
  const unreadCount = notifications.filter(n => !n.read).length;

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
        swipeEnabled: true,
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
              <Text style={{ fontSize: 26, fontWeight: "bold", marginLeft: 8 }}>{route.name}</Text>
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

              {/* Badge apenas na aba de notificações */}
              {route.name === "Notificações" && unreadCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{unreadCount}</Text>
                </View>
              )}
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
