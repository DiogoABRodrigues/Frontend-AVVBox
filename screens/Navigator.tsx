import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import TrainingScreen from "./TrainingScreen";
import MeasuresScreen from "./MeasurementsScreen";
import NotificationsScreen from "./NotificationsScreen";
import ProfileScreen from "./ProfileScreen";
import { styles } from "./styles/AthleteTabs.styles";

const Tab = createBottomTabNavigator();

export default function AthleteTabs() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [fontError, setFontError] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      try {
        // Aguarda um pouco antes de carregar as fontes
        await new Promise(resolve => setTimeout(resolve, 100));
        
        setFontsLoaded(true);
      } catch (error) {
        console.log('Erro ao carregar fontes:', error);
        setFontError(true);
        // Mesmo com erro, continua (os ícones podem funcionar sem carregamento explícito)
        setFontsLoaded(true);
      }
    }
    
    loadFonts();
  }, []);

  // Loading screen enquanto as fontes carregam
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={{ marginTop: 10 }}>A carregar...</Text>
      </View>
    );
  }

  return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
            headerShown: true,
            tabBarShowLabel: false,
            tabBarStyle: styles.tabBar,
            headerTitle: () => {
            let titleIcon = "home-outline";
            let titleText = route.name;

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

            // Mock só para testar
            const unreadCount = 2;

            return (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name={titleIcon as any} size={26} color="#000000ff" />
                <Text style={{ fontSize: 26, fontWeight: "bold", marginLeft: 8 }}>
                    {titleText}
                </Text>
                </View>
            );
            },
            tabBarIcon: ({ focused }) => {
                let iconName: keyof typeof Ionicons.glyphMap = "home";
                let IconComponent = Ionicons;

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

                // Mock do número de notificações não lidas
                const unreadCount = 2;

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