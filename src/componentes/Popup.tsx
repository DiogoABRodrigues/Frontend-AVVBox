import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles/Popup.styles";

interface PopupProps {
  visible: boolean;
  title?: string;
  message: string;
  type?: "success" | "error" | "confirm";
  onConfirm?: () => void;
  onCancel?: () => void;
  onClose?: () => void; // usado para success/error
}

export default function Popup({
  visible,
  title,
  message,
  type = "success",
  onConfirm,
  onCancel,
  onClose,
}: PopupProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          {title && <Text style={styles.title}>{title}</Text>}
          <Text style={styles.message}>{message}</Text>

          <View style={styles.buttons}>
            {type === "confirm" ? (
              <>
                <TouchableOpacity style={styles.cancelBtn} onPress={onCancel}>
                  <Text style={styles.cancelText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.confirmBtn} onPress={onConfirm}>
                  <Text style={styles.confirmText}>Confirmar</Text>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity
                style={styles.confirmBtn}
                onPress={onClose}
              >
                <Text style={styles.confirmText}>
                  {type === "success" ? "OK" : "Fechar"}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}

