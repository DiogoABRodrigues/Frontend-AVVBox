import React, { useState, useEffect } from "react";
import { Modal, View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { User } from "../models/User";
import { styles } from "./styles/Modal.styles";

interface Props {
  visible: boolean;
  onClose: () => void;
  onConfirm: (selectedAthletes: string[]) => void;
  users: User[];
  selected: string[];
}

export default function ChangeAthletesModal({
  visible,
  onClose,
  onConfirm,
  users,
  selected,
}: Props) {
  const [selectedAthletes, setSelectedAthletes] = useState<string[]>(selected);
  const toggleSelection = (id: string) => {
    setSelectedAthletes((prev) =>
      prev.includes(id)
        ? prev.filter((athlete) => athlete !== id)
        : [...prev, id]
    );
  };

  // Atualiza os selecionados sempre que o modal abre
  useEffect(() => {
    if (visible) {
      setSelectedAthletes(selected);
    }
  }, [selected, visible]);

  return (
    <Modal visible={visible} transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Alterar Atletas</Text>

          <ScrollView style={styles.scrollList}>
            {users.map((athlete) => (
              <TouchableOpacity
                key={athlete._id}
                style={styles.checkboxOption}
                onPress={() => toggleSelection(athlete._id)}
              >
                <View
                  style={[
                    styles.checkboxBox,
                    selectedAthletes.includes(athlete._id) &&
                      styles.checkboxSelected,
                  ]}
                >
                  {selectedAthletes.includes(athlete._id) && (
                    <Ionicons name="checkmark" size={12} color="white" />
                  )}
                </View>
                <Text style={styles.checkboxText}>{athlete.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.actionRow}>
            <TouchableOpacity
              style={[styles.actionButton, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.confirmButton]}
              onPress={() => {
                onConfirm(selectedAthletes);
                onClose();
              }}
            >
              <Text style={styles.confirmText}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
