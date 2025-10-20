import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { styles } from "./styles/NotificationsModal.styles";
import { userService } from "../services/usersService";
import { useAuth } from "../context/AuthContext";

interface User {
  id: string;
  name: string;
}

interface Notification {
  title: string;
  body: string;
  target: string[];
}

interface Props {
  visible: boolean;
  onClose: () => void;
  onCreate: (title: string, body: string, target: string[]) => void;
  recipientOption: "all" | "my" | "individual";
  setRecipientOption: (option: "all" | "my" | "individual") => void;
}

export default function NotificationModal({
  visible,
  onClose,
  onCreate,
  recipientOption,
  setRecipientOption,
}: Props) {
  const [users, setUsers] = useState<User[]>([]);
  const { user } = useAuth();

  const [notification, setNotification] = useState<Notification>({
    title: "",
    body: "",
    target: [],
  });

  useEffect(() => {
    const fetchUsers = async () => {
      if (user.role === "atleta") return;
      try {
        const usersFromApi = await userService.getAll();
        const usersToShow = usersFromApi.map(
          (u: { _id: string; name: string }) => ({
            id: u._id,
            name: u.name,
          })
        );
        usersToShow.sort((a, b) => a.name.localeCompare(b.name));
        setUsers(usersToShow);
      } catch (error) {
        console.error("Erro ao buscar users:", error);
      }
    };

    fetchUsers();
  }, []);

  const toggleUserSelection = (userId: string) => {
    setNotification((prev) => {
      const alreadySelected = prev.target.includes(userId);
      return {
        ...prev,
        target: alreadySelected
          ? prev.target.filter((id) => id !== userId)
          : [...prev.target, userId],
      };
    });
  };

  const resetNotification = () => {
    setNotification({
      title: "",
      body: "",
      target: [],
    });
    setRecipientOption("all");
  };

  return (
    <Modal visible={visible} transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Nova Notificação</Text>

          <TextInput
            placeholder="Título"
            placeholderTextColor={colors.placeHolder}
            value={notification.title}
            onChangeText={(text) =>
              setNotification((prev) => ({ ...prev, title: text }))
            }
            style={styles.modalInput}
          />
          <TextInput
            placeholder="Corpo"
            placeholderTextColor={colors.placeHolder}
            value={notification.body}
            onChangeText={(text) =>
              setNotification((prev) => ({ ...prev, body: text }))
            }
            style={[styles.modalInput, styles.bodyInput]}
            multiline
          />

          <Text style={styles.label}>Destinatário:</Text>
          <View style={styles.recipientButtons}>
            <TouchableOpacity
              onPress={() => setRecipientOption("all")}
              style={[
                styles.recipientButton,
                recipientOption === "all" && styles.recipientSelected,
              ]}
            >
              <Text>Todos</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setRecipientOption("my")}
              style={[
                styles.recipientButton,
                recipientOption === "my" && styles.recipientSelected,
              ]}
            >
              <Text>Meus atletas</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setRecipientOption("individual")}
              style={[
                styles.recipientButton,
                recipientOption === "individual" && styles.recipientSelected,
              ]}
            >
              <Text>Individual</Text>
            </TouchableOpacity>
          </View>

          {recipientOption === "individual" && (
            <View style={styles.userListContainer}>
              <FlatList
                data={users}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.recipientButton,
                      notification.target.includes(item.id) &&
                        styles.recipientSelected,
                    ]}
                    onPress={() => toggleUserSelection(item.id)}
                  >
                    <Text>{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}

          <View style={styles.actionRow}>
            <TouchableOpacity
              onPress={() => {
                onCreate(
                  notification.title,
                  notification.body,
                  recipientOption === "individual"
                    ? notification.target
                    : [recipientOption]
                );
                resetNotification();
                onClose();
              }}
              style={[styles.actionButton, styles.actionLeft]}
            >
              <Text style={styles.actionButtonText}>Enviar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                resetNotification();
                onClose();
              }}
              style={[styles.clearButton, styles.actionRight]}
            >
              <Text style={styles.clearButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
