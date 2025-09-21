import React, { useState, useEffect } from "react";
import { Modal, View, Text, TouchableOpacity, ScrollView } from "react-native";
import { styles } from "./styles/Modal.styles";

interface Props {
  visible: boolean;
  onClose: () => void;
  onConfirm: (newRole: "atleta" | "PT" | "Admin") => void;
  currentRole: "atleta" | "PT" | "Admin";
}

export default function ChangeRoleModal({
  visible,
  onClose,
  onConfirm,
  currentRole,
}: Props) {
  const [selectedRole, setSelectedRole] = useState<"atleta" | "PT" | "Admin">(
    currentRole,
  );

  useEffect(() => {
    if (visible) {
      setSelectedRole(currentRole);
    }
  }, [currentRole]);

  const roles: ("atleta" | "PT" | "Admin")[] = ["atleta", "PT", "Admin"];

  return (
    <Modal visible={visible} transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Alterar Role</Text>

          <ScrollView style={styles.scrollList}>
            {roles.map((role) => (
              <TouchableOpacity
                key={role}
                style={styles.radioOption}
                onPress={() => setSelectedRole(role)}
              >
                <View style={styles.radioCircle}>
                  {selectedRole === role && (
                    <View style={styles.radioSelected} />
                  )}
                </View>
                <Text style={styles.radioText}>{role}</Text>
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
                onConfirm(selectedRole);
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
