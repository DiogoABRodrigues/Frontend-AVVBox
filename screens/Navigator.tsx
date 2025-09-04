import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import TrainingScreen from "./TrainingScreen";
import MeasuresScreen from "./MeasurementsScreen";
import NotificationsScreen from "./NotificationsScreen";
import ProfileScreen from "./ProfileScreen";
import { styles } from "./styles/Navigator.styles";
import { getUserNotifications } from '../services/notificationService';
import { useAuth } from '../context/AuthContext';

const Tab = createBottomTabNavigator();

export default function AthleteTabs() {
  const { user } = useAuth();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const notifications = await getUserNotifications(user.id);
        const unread = notifications.filter((n) => !n.read).length;
        setUnreadCount(unread);
        console.log("Notificações buscadas:", notifications);
      } catch (error) {
        console.error("Erro ao buscar notificações:", error);
      }
    };

    fetchNotifications();
  }, []);
  
  return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
            headerShown: true,
            tabBarShowLabel: false,
            tabBarStyle: styles.tabBar,
            headerTitle: () => {
            let titleIcon = "home-outline";
            const titleText = route.name;

            switch (route.name) {
                case "Treino":
                titleIcon = "barbell-outline";
                break;
                case "Notificações":
                titleIcon = "notifications-outline";
                break;
                case "Medidas":
                titleIcon = "scale-outline";
                break;
                case "Perfil":
                titleIcon = "person-outline";
                break;
            }

            return (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name={titleIcon as keyof typeof Ionicons.glyphMap} size={26} color="#000000ff" />
                <Text style={{ fontSize: 26, fontWeight: "bold", marginLeft: 8 }}>
                    {titleText}
                </Text>
                </View>
            );
            },
            tabBarIcon: ({ focused }) => {
                let iconName: keyof typeof Ionicons.glyphMap = "home";
                const IconComponent = Ionicons;

                switch (route.name) {
                    case "Treino":
                    iconName = "barbell-outline";
                    break;
                    case "Notificações":
                    iconName = "notifications-outline";
                    break;
                    case "Medidas":
                    iconName = "scale-outline";
                    break;
                    case "Perfil":
                    iconName = "person-outline";
                    break;
                }

                return (
                    <View style={[styles.tabItem, focused && styles.tabItemFocused]}>
                    <View>
                        <IconComponent
                        name={iconName}
                        size={24}
                        color={focused ? "#000000ff" : "gray"}
                        />
                        {route.name === "Notificações" && unreadCount > 0 && (
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>{unreadCount}</Text>
                        </View>
                        )}
                    </View>
                    <Text style={[styles.tabLabel, focused && styles.tabLabelFocused]}>
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