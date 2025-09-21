import React, { useState, useEffect } from "react";
import { Modal, View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { User } from "../models/User";
import { styles } from "./styles/Modal.styles";

interface Props {
  visible: boolean;
  onClose: () => void;
  onConfirm: (selectedPts: string[]) => void;
  users: User[];
  selected: string[];
}

export default function ChangePtsModal({
  visible,
  onClose,
  onConfirm,
  users,
  selected,
}: Props) {
  const [selectedPt, setSelectedPt] = useState<string | null>(
    selected[0] || null,
  ); // apenas 1 coach

  const toggleSelection = (id: string) => {
    setSelectedPt((prev) => (prev === id ? null : id)); // seleciona ou desmarca
  };

  useEffect(() => {
    if (visible) {
      setSelectedPt(selected[0] || null);
    }
  }, [selected, visible]);
  return (
    <Modal visible={visible} transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Alterar PT</Text>

          <ScrollView style={styles.scrollList}>
            {users.map((pt) => (
              <TouchableOpacity
                key={pt._id}
                style={styles.checkboxOption}
                onPress={() => toggleSelection(pt._id)}
              >
                <View
                  style={[
                    styles.checkboxBox,
                    selectedPt === pt._id && styles.checkboxSelected,
                  ]}
                >
                  {selectedPt === pt._id && (
                    <Ionicons name="checkmark" size={12} color="white" />
                  )}
                </View>
                <Text style={styles.checkboxText}>{pt.name}</Text>
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
                onConfirm(selectedPt ? [selectedPt] : []); // envia como array
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
