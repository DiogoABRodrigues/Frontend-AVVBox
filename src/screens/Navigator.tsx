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
  const unreadCount = notifications.filter((n) => !n.read).length;

  const renderIcon = (routeName: string) => {
    switch (routeName) {
      case "Treino":
        return "barbell-outline";
      case "Notificações":
        return "notifications-outline";
      case "Medidas":
        return "scale-outline";
      case "Definições":
        return "settings-outline";
      default:
        return "home-outline";
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
        tabBarPressColor: "transparent",
        headerTitle: () => {
          const titleIcon = renderIcon(route.name);
          return (
            <View style={styles.headerContainer}>
              <Ionicons
                name={titleIcon as keyof typeof Ionicons}
                size={24}
                style={styles.headerIcon}
              />
              <Text style={styles.headerTitle}>{route.name}</Text>
            </View>
          );
        },
        tabBarIcon: ({ focused }) => {
          const iconName = renderIcon(route.name);
          return (
            <View
              style={[
                styles.iconContainer,
                focused ? styles.tabItemFocused : styles.tabItem,
              ]}
            >
              <Ionicons
                name={iconName as keyof typeof Ionicons}
                size={24}
                color={focused ? "#1E293B" : "#64748b"}
              />
              <Text
                style={[styles.tabLabel, focused && styles.tabLabelFocused]}
              >
                {route.name}
              </Text>

              {/* Badge apenas na aba de notificações */}
              {route.name === "Notificações" && unreadCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </Text>
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
      <Tab.Screen name="Definições" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
