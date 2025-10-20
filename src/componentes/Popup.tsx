import React from "react";
import { Modal, View, Text, TouchableOpacity, ViewStyle } from "react-native";
import { popupStyles } from "./styles/Popup.styles";
import { useThemeContext } from "@/context/ThemeContext";

interface PopupProps {
  visible: boolean;
  title?: string;
  message: string;
  type?: "success" | "error" | "confirm";
  onConfirm?: () => void;
  onCancel?: () => void;
  onClose?: () => void; // usado para success/error
  style?: ViewStyle; // novo prop opcional para customizar o container
}




export default function Popup({
  visible,
  title,
  message,
  type = "success",
  onConfirm,
  onCancel,
  onClose,
  style,
}: PopupProps) {
    const { colors } = useThemeContext();
  const styles = popupStyles(colors);
  return (
    <Modal visible={visible} transparent>
      <View style={styles.overlay}>
        <View style={[styles.container]}>
          {title && <Text style={styles.title}>{title}</Text>}
          <Text style={[styles.message, style]}>{message}</Text>

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
              <TouchableOpacity style={styles.confirmBtn} onPress={onClose}>
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
