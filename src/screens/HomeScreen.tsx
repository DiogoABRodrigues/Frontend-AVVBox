import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../context/AuthContext";

export default function HomeScreen() {
  const { user, logout } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {user?.role === "PT" ? "Área do Personal Trainer" : "Área do Atleta"}
      </Text>
      <Text style={styles.subtitle}>Bem-vindo(a), {user?.name}!</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  subtitle: { fontSize: 18, marginBottom: 20 },
});
