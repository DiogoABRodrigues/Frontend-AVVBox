import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles/NotificationsScreen.styles';
import { getUserNotifications, deleteNotificationForUser, markNotificationAsRead, createNotification } from '../services/notificationService';
import { useAuth } from '../context/AuthContext';
import { Swipeable } from "react-native-gesture-handler";
import NotificationModal from '../componentes/NotificationsModal';

interface Notification {
  id: string;
  title: string;
  body: string;
  date: string;
  read: boolean;
}

export default function NotificationsScreen() {
  const { user } = useAuth();
  const isPT = user?.role === 'PT';

  const [modalVisible, setModalVisible] = useState(false);
  const [recipientOption, setRecipientOption] = useState<'all' | 'my' | 'individual'>('all');
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const handleClearAll = async () => {
    try {
      await Promise.all(
        notifications.map(n =>
          deleteNotificationForUser(n.id, user.id) // remove o user da lista de target
        )
      );
      setNotifications([]); // limpa localmente
    } catch (err) {
      console.error(err);
    }
  };

  const fetchNotifications = async () => {
    try {
      const notifications = await getUserNotifications(user.id);

      setNotifications(notifications.map(n => ({
        id: n._id,
        title: n.title,
        body: n.body,
        date: new Date(n.date).toLocaleDateString(),
        read: n.readBy?.includes(user.id) ?? false, // true se user já leu
      })));

      console.log("Notificações da bd:", notifications);
    } catch (error) {
      console.error("Erro ao buscar notificações:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

    const handleMarkAllAsRead = async () => {
      try {
        await Promise.all(
          notifications.map(n =>
            markNotificationAsRead(n.id, user.id) // marca como lida no backend
          )
        );
        // Atualiza localmente
        setNotifications(notifications.map(n => ({ ...n, read: true })));
      } catch (err) {
        console.error(err);
      }
  };

  const handleSendNotification = async (title: string, body: string, target: string[]) => {
    try {
      console.log("Enviando notificação:", { title, body, target });

      await createNotification(user.id, { title, body, target });
      fetchNotifications();
      setModalVisible(false);
    } catch (err) {
      console.error("Erro ao enviar notificação", err);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header com título */}
      <View style={styles.titleHeader}>
        <Text style={styles.headerTitle}>Notificações</Text>
      </View>

      {/* Botões de ação */}
      <View style={styles.actionHeader}>
        <TouchableOpacity onPress={handleMarkAllAsRead} style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Marcar como lidas</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleClearAll} style={styles.clearButton}>
          <Text style={styles.clearButtonText}>Limpar todas</Text>
        </TouchableOpacity>

        {isPT && (
          <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Criar Notificação</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Separador */}
      <View style={styles.separator} />

      {/* Lista de notificações ou mensagem vazia */}
      <ScrollView style={styles.notificationsList} showsVerticalScrollIndicator={false}>
        {notifications.length === 0 ? (
          <View style={styles.emptyStateContainer}>
            <Ionicons name="notifications-off-outline" size={64} color="#ccc" />
            <Text style={styles.emptyStateTitle}>Sem notificações</Text>
            <Text style={styles.emptyStateText}>
              {"Não tem notificações por ler."}
            </Text>
          </View>
        ) : (
          notifications.map(notification => (
            <Swipeable
                key={notification.id}
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
                await deleteNotificationForUser(notification.id, user.id);
                setNotifications(notifications.filter((n) => n.id !== notification.id));
              }}
            >
          <Ionicons name="trash" size={22} color="white" />
        </TouchableOpacity>
      </View>
    )}
    renderLeftActions={() => (
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
            await deleteNotificationForUser(notification.id, user.id);
            setNotifications(notifications.filter((n) => n.id !== notification.id));
          }}
        >
          <Ionicons name="trash" size={22} color="white" />
        </TouchableOpacity>
      </View>
    )}
  >
              <TouchableOpacity
                style={[styles.notificationItem, !notification.read && styles.notificationUnread]}
                onPress={() => {
                  if (!notification.read) {
                    markNotificationAsRead(notification.id, user.id);
                    setNotifications(
                      notifications.map(n =>
                        n.id === notification.id ? { ...n, read: true } : n
                      )
                    );
                  }
                }}
                activeOpacity={0.8}
              >
                <Ionicons
                  name="notifications-circle-outline"
                  size={24}
                  color={!notification.read ? "black" : "gray"}
                />
                <View style={styles.notificationContent}>
                  <Text style={[styles.notificationTitle, !notification.read && styles.notificationTitleUnread]}>
                    {notification.title}
                  </Text>
                  <Text style={styles.notificationBody}>{notification.body}</Text>
                  <Text style={styles.notificationDate}>{notification.date}</Text>
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