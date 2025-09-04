import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, TextInput, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles/NotificationsScreen.styles';
import { getUserNotifications, deleteNotificationForUser, markNotificationAsRead } from '../services/notificationService';
import { useAuth } from '../context/AuthContext';

interface Notification {
  id: string;
  title: string;
  body: string;
  date: string;
  read: boolean;
}

const allUsers = ['João', 'Maria', 'Pedro', 'Ana', 'Luís'];

export default function NotificationsScreen() {
  const { user } = useAuth();
  const isPT = user?.role === 'PT';

  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [recipientOption, setRecipientOption] = useState<'all' | 'my' | 'individual'>('all');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
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

  const toggleUserSelection = (user: string) => {
    if (selectedUsers.includes(user)) {
      setSelectedUsers(selectedUsers.filter(u => u !== user));
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  useEffect(() => {
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

  const handleCreateNotification = () => {
    console.log({ title, body, recipientOption, selectedUsers });
    setModalVisible(false);
    setTitle('');
    setBody('');
    setRecipientOption('all');
    setSelectedUsers([]);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleMarkAllAsRead} style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Marcar como lidas</Text>
        </TouchableOpacity>

        {isPT && (
          <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Criar Notificação</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={handleClearAll} style={styles.clearButton}>
          <Text style={styles.clearButtonText}>Eliminar todas</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de notificações */}
      <ScrollView style={styles.notificationsList}>
        {notifications.map(notification => (
          <View
            key={notification.id}
            style={[styles.notificationItem, !notification.read && styles.notificationUnread]}
          >
            <Ionicons
              name="notifications-circle-outline"
              size={24}
              color={!notification.read ? 'black' : 'gray'}
            />
            <View style={styles.notificationContent}>
              <Text style={[styles.notificationTitle,  !notification.read && styles.notificationTitleUnread]}>
                {notification.title}
              </Text>
              <Text style={styles.notificationBody}>{notification.body}</Text>
              <Text style={styles.notificationDate}>{notification.date}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Modal */}
      <Modal visible={modalVisible} transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Nova Notificação</Text>

            <TextInput
              placeholder="Título"
              value={title}
              onChangeText={setTitle}
              style={styles.modalInput}
            />

            <TextInput
              placeholder="Corpo"
              value={body}
              onChangeText={setBody}
              style={[styles.modalInput, { height: 100 }]}
              multiline
            />

            <Text style={{ marginBottom: 4 }}>Destinatário:</Text>
            <View style={styles.recipientButtons}>
              <TouchableOpacity onPress={() => setRecipientOption('all')} style={[styles.recipientButton, recipientOption === 'all' && styles.recipientSelected]}>
                <Text>Todos</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setRecipientOption('my')} style={[styles.recipientButton, recipientOption === 'my' && styles.recipientSelected]}>
                <Text>Meus atletas</Text>
              </TouchableOpacity>
            </View>

            {recipientOption === 'individual' && (
              <FlatList
                data={allUsers}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[styles.recipientButton, selectedUsers.includes(item) && styles.recipientSelected]}
                    onPress={() => toggleUserSelection(item)}
                  >
                    <Text>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            )}

            <TouchableOpacity onPress={handleCreateNotification} style={[styles.actionButton, { marginTop: 8 }]}>
              <Text style={styles.actionButtonText}>Criar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(false)} style={[styles.clearButton, { marginTop: 8 }]}>
              <Text style={styles.clearButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
