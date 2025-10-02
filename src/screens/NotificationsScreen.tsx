/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Swipeable } from "react-native-gesture-handler";
import NotificationModal from "../componentes/NotificationsModal";
import { useAuth } from "../context/AuthContext";
import { useNotifications } from "../context/NotificationsContext";
import { notificationService } from "../services/notificationService";
import { styles } from "./styles/NotificationsScreen.styles";
import { User } from "../models/User";
import Toast from "react-native-toast-message";
interface Notification {
  id: string;
  title: string;
  body: string;
  date: string;
  read: boolean;
  readBy: string[];
}

export default function NotificationsScreen() {
  const emptyUser: User = {
    _id: "",
    name: "",
    email: "",
    phoneNumber: "123456789",
    role: "atleta",
    active: true,
    coach: [],
    atheletes: [],
  };

  let { user } = useAuth();

  if (!user) {
    user = emptyUser; // Garantir que user nunca é null
  }
  const isPT = user?.role === "PT" || user?.role === "Admin";

  const [modalVisible, setModalVisible] = useState(false);
  const [recipientOption, setRecipientOption] = useState<
    "all" | "my" | "individual"
  >("all");

  const { notifications, refreshNotifications, markAsRead } =
    useNotifications();

  // FETCH
  const fetchNotifications = async () => {
    try {
      const fetched = await notificationService.getUserNotifications(user._id);
      refreshNotifications(fetched, user._id);
    } catch (err) {
      console.error("Erro ao buscar notificações:", err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // MARCAR TODAS COMO LIDAS
  const handleMarkAllAsRead = async (animation: boolean) => {
    try {
      await Promise.all(
        notifications
          .filter((n) => !n.read)
          .map((n) =>
            notificationService.markNotificationAsRead(n.id, user._id)
          )
      );
      if(animation){
      notifications.forEach((n) => {
        if (!n.read) markAsRead(user._id, n.id);
      });
    }
    } catch {
      console.error(
        "An error occurred while marking all notifications as read."
      );
    }
  };

  // LIMPAR TODAS
  const handleClearAll = async () => {
    try {
      handleMarkAllAsRead(false);
      await Promise.all(
        notifications.map((n) =>
          notificationService.deleteNotificationForUser(n.id, user._id)
        )
      );
      fetchNotifications();
    } catch (err) {
      console.error(err);
    }
  };

  // ENVIAR
  const handleSendNotification = async (
    title: string,
    body: string,
    target: string[]
  ) => {
    try {
      const res = await notificationService.createNotification(user._id, {
        title,
        body,
        target,
      });
      if (res && res.notification && res.notification._id) {
        Toast.hide();
Toast.show({
 topOffset: 10,
 type: "success",
 text2: "Notificação enviada com sucesso!",
 position: "top",
 visibilityTime: 2500,
 autoHide: true,
});

      }
      fetchNotifications();
      setModalVisible(false);
    } catch (err: any) {
      Toast.hide();
      Toast.show({
      topOffset: 10,
      type: "success",
      text2: `Ocorreu um erro ao enviar a notificação: ${
                err.response?.data?.message || err.message || err
              }`,
      position: "top",
      visibilityTime: 2500,
      autoHide: true,
      });
    }
  };

  // MARCAR INDIVIDUAL COMO LIDA
  const handleMarkAsRead = async (notification: Notification) => {
    if (!notification.read) {
      await notificationService.markNotificationAsRead(
        notification.id,
        user._id
      );
      markAsRead(user._id, notification.id);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.titleHeader}>
        <Text style={styles.headerTitle}>Notificações</Text>
      </View>

      {/* Ações */}
      <View style={styles.actionHeader}>
        <TouchableOpacity
          onPress={() => handleMarkAllAsRead(true)}
          style={styles.actionButton}
        >
          <Text style={styles.actionButtonText}>Marcar como lidas</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleClearAll} style={styles.clearButton}>
          <Text style={styles.clearButtonText}>Limpar todas</Text>
        </TouchableOpacity>
        {isPT && (
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.actionButton}
          >
            <Text style={styles.actionButtonText}>Criar Notificação</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.separator} />

      {/* Lista */}
      <ScrollView
        style={styles.notificationsList}
        showsVerticalScrollIndicator={false}
      >
        {notifications.length === 0 ? (
          <View style={styles.emptyStateContainer}>
            <Ionicons name="notifications-off-outline" size={64} color="#ccc" />
            <Text style={styles.emptyStateTitle}>Sem notificações</Text>
            <Text style={styles.emptyStateText}>
              Não tem notificações por ler.
            </Text>
          </View>
        ) : (
          notifications.map((n) => (
            <Swipeable
              key={n.id}
              renderRightActions={() => (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    paddingHorizontal: 10,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      backgroundColor: "red",
                      borderRadius: 8,
                      padding: 12,
                    }}
                    onPress={async () => {
                      await notificationService.deleteNotificationForUser(
                        n.id,
                        user._id
                      );
                      fetchNotifications();
                    }}
                  >
                    <Ionicons name="trash" size={22} color="white" />
                  </TouchableOpacity>
                </View>
              )}
            >
              <TouchableOpacity
                style={[
                  styles.notificationItem,
                  !n.read && styles.notificationUnread,
                ]}
                onPress={() => handleMarkAsRead(n)}
                activeOpacity={0.8}
              >
                <Ionicons
                  name="notifications-circle-outline"
                  size={24}
                  color={!n.read ? "black" : "gray"}
                />
                <View style={styles.notificationContent}>
                  <Text
                    style={[
                      styles.notificationTitle,
                      !n.read && styles.notificationTitleUnread,
                    ]}
                  >
                    {n.title}
                  </Text>
                  <Text style={styles.notificationBody}>{n.body}</Text>
                  <Text style={styles.notificationDate}>{n.date}</Text>
                </View>
              </TouchableOpacity>
            </Swipeable>
          ))
        )}
      </ScrollView>

      {/* Modal */}
      <NotificationModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onCreate={handleSendNotification}
        recipientOption={recipientOption}
        setRecipientOption={setRecipientOption}
      />
    </View>
  );
}
