import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles/NotificationsScreen.styles';

interface Notification {
  id: string;
  title: string;
  body: string;
  date: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  { id: '1', title: 'Treino marcado', body: 'Seu treino de hoje está confirmado', date: '2025-09-03 10:00', read: false },
  { id: '2', title: 'Nova mensagem', body: 'O PT enviou uma mensagem', date: '2025-09-02 15:30', read: true },
  { id: '3', title: 'Alteração de horário', body: 'O horário do treino foi alterado', date: '2025-09-01 12:00', read: false },
];

export default function NotificationsScreen() {
  const unreadCount = mockNotifications.filter(n => !n.read).length;

  const handleClearAll = () => {
    console.log('Limpar todas notificações');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => console.log("Marcar como lidas")}
          style={styles.markAsReadButton}
        >
      <Text style={styles.markAsReadText}>Marcar como lidas</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleClearAll}
        style={styles.clearButton}
      >
        <Text style={styles.clearButtonText}>Eliminar todas</Text>
      </TouchableOpacity>
      </View>
      {/* Lista de notificações */}
      <ScrollView style={styles.notificationsList}>
        {mockNotifications.map(notification => (
          <View
            key={notification.id}
            style={[
              styles.notificationItem,
              !notification.read && styles.notificationUnread
            ]}
          >
            <Ionicons
              name="notifications-circle-outline"
              size={24}
              color={!notification.read ? 'black' : 'gray'}
            />
            <View style={styles.notificationContent}>
              <Text style={[styles.notificationTitle, !notification.read && styles.notificationTitleUnread]}>
                {notification.title}
              </Text>
              <Text style={styles.notificationBody}>{notification.body}</Text>
              <Text style={styles.notificationDate}>{notification.date}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
