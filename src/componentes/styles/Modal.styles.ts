/* eslint-disable @typescript-eslint/no-explicit-any */
import { StyleSheet } from "react-native";

export const modalStyles = (colors: any) =>
  StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  container: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
    color: colors.header,
  },

  // Listas (roles, PTs, atletas)
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#374151",
  },
  scrollList: {
    maxHeight: 300,
    marginBottom: 16,
  },

  // Botões de ação
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  confirmButton: {
    backgroundColor: "#2563eb",
  },
  confirmText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  cancelButton: {
    backgroundColor: "#f8fafc",
    borderWidth: 2,
    borderColor: "#d1d5db",
  },
  cancelText: {
    color: "#6b7280",
    fontSize: 16,
    fontWeight: "600",
  },
  // Header
  titleHeader: {
    paddingVertical: 20,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.header,
    textAlign: "left",
  },

  // Ações Header
  actionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    flexWrap: "wrap",
    gap: 8,
  },
  actionButtonText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 14,
  },
  clearButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#ffffff",
    borderColor: "#ef4444",
    borderWidth: 2,
    borderRadius: 10,
    minWidth: 100,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  clearButtonText: {
    color: "#ef4444",
    fontWeight: "600",
    fontSize: 14,
  },

  // Separador
  separator: {
    height: 1,
    backgroundColor: "#e2e8f0",
    marginVertical: 16,
  },

  // Lista de Notificações
  notificationsList: {
    flex: 1,
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#ffffff",
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  notificationUnread: {
    backgroundColor: "#f0f9ff",
    borderColor: "#3b82f6",
    borderLeftWidth: 4,
    borderLeftColor: "#3b82f6",
  },
  notificationContent: {
    flex: 1,
    marginLeft: 12,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#64748b",
    marginBottom: 4,
  },
  notificationTitleUnread: {
    color: colors.header,
    fontWeight: "700",
  },
  notificationBody: {
    fontSize: 14,
    color: "#64748b",
    lineHeight: 20,
    marginBottom: 8,
  },
  notificationDate: {
    fontSize: 12,
    color: "#94a3b8",
    fontWeight: "500",
  },

  // Estado Vazio
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#64748b",
    marginTop: 16,
    marginBottom: 8,
    textAlign: "center",
  },
  emptyStateText: {
    fontSize: 16,
    color: "#94a3b8",
    textAlign: "center",
    lineHeight: 22,
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContainer: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
    color: colors.header,
  },

  // Form Inputs
  label: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: "#f9fafb",
    color: "#374151",
  },
  bodyInput: {
    height: 100,
    textAlignVertical: "top",
  },

  // Recipient Options
  recipientButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginBottom: 16,
    gap: 8,
  },
  recipientButton: {
    flex: 1,
    minWidth: 80,
    padding: 12,
    borderWidth: 2,
    borderColor: "#d1d5db",
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#f9fafb",
  },
  recipientSelected: {
    backgroundColor: "#dbeafe",
    borderColor: "#3b82f6",
  },
  recipientButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6b7280",
  },
  recipientButtonTextSelected: {
    color: "#1e40af",
  },

  // User List
  userListContainer: {
    maxHeight: 200,
    marginTop: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    backgroundColor: "#f9fafb",
  },
  userItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    flexDirection: "row",
    alignItems: "center",
  },
  userItemLast: {
    borderBottomWidth: 0,
  },
  userItemSelected: {
    backgroundColor: "#dbeafe",
  },
  userItemText: {
    fontSize: 14,
    color: "#374151",
    marginLeft: 8,
  },
  actionLeft: {
    flex: 1,
  },
  actionRight: {
    flex: 1,
  },
  modalActionButton: {
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  modalPrimaryButton: {
    backgroundColor: "#2563eb",
    shadowColor: "#2563eb",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  modalSecondaryButton: {
    backgroundColor: "#f8fafc",
    borderWidth: 2,
    borderColor: "#d1d5db",
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  modalPrimaryButtonText: {
    color: "#ffffff",
  },
  modalSecondaryButtonText: {
    color: "#6b7280",
  },

  // Swipe Actions
  swipeAction: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  deleteAction: {
    backgroundColor: "#ef4444",
    borderRadius: 12,
    minWidth: 80,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.header,
    alignItems: "center",
    justifyContent: "center",
  },
  radioSelected: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: colors.header,
  },
  radioText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#374151",
  },
  checkboxOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  checkboxBox: {
    height: 20,
    width: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.header,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxSelected: {
    backgroundColor: "#2563eb",
  },
  checkboxText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#374151",
  },
});
