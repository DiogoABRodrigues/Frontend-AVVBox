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
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 24,
    shadowColor: colors.black,
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
    borderBottomColor: colors.greyLight,
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
    color: colors.darkGrey,
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
    backgroundColor: colors.blue,
  },
  confirmText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
  cancelButton: {
    backgroundColor: colors.background,
    borderWidth: 2,
    borderColor: colors.greyMidLight,
  },
  cancelText: {
    color: colors.greyMedium,
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
    color: colors.white,
    fontWeight: "600",
    fontSize: 14,
  },
  clearButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: colors.white,
    borderColor: colors.red,
    borderWidth: 2,
    borderRadius: 10,
    minWidth: 100,
    alignItems: "center",
    shadowColor: colors.black,
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  clearButtonText: {
    color: colors.red,
    fontWeight: "600",
    fontSize: 14,
  },

  // Separador
  separator: {
    height: 1,
    backgroundColor: colors.greyLight,
    marginVertical: 16,
  },

  // Lista de Notificações
  notificationsList: {
    flex: 1,
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: colors.white,
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.greyLight,
    shadowColor: colors.black,
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  notificationUnread: {
    backgroundColor: colors.background,
    borderColor: colors.blue,
    borderLeftWidth: 4,
    borderLeftColor: colors.blue,
  },
  notificationContent: {
    flex: 1,
    marginLeft: 12,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.description,
    marginBottom: 4,
  },
  notificationTitleUnread: {
    color: colors.header,
    fontWeight: "700",
  },
  notificationBody: {
    fontSize: 14,
    color: colors.description,
    lineHeight: 20,
    marginBottom: 8,
  },
  notificationDate: {
    fontSize: 12,
    color: colors.greyMedium,
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
    color: colors.description,
    marginTop: 16,
    marginBottom: 8,
    textAlign: "center",
  },
  emptyStateText: {
    fontSize: 16,
    color: colors.greyMedium,
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
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 24,
    shadowColor: colors.black,
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
    color: colors.darkGrey,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: colors.greyMidLight,
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: colors.background,
    color: colors.darkGrey,
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
    borderColor: colors.greyMidLight,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: colors.background,
  },
  recipientSelected: {
    backgroundColor: colors.blueLight,
    borderColor: colors.blue,
  },
  recipientButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.greyMedium,
  },
  recipientButtonTextSelected: {
    color: colors.blue,
  },

  // User List
  userListContainer: {
    maxHeight: 200,
    marginTop: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.greyLight,
    borderRadius: 10,
    backgroundColor: colors.background,
  },
  userItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.greyLight,
    flexDirection: "row",
    alignItems: "center",
  },
  userItemLast: {
    borderBottomWidth: 0,
  },
  userItemSelected: {
    backgroundColor: colors.blueLight,
  },
  userItemText: {
    fontSize: 14,
    color: colors.darkGrey,
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
    backgroundColor: colors.blue,
    shadowColor: colors.blue,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  modalSecondaryButton: {
    backgroundColor: colors.background,
    borderWidth: 2,
    borderColor: colors.greyMidLight,
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  modalPrimaryButtonText: {
    color: colors.white,
  },
  modalSecondaryButtonText: {
    color: colors.greyMedium,
  },

  // Swipe Actions
  swipeAction: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  deleteAction: {
    backgroundColor: colors.red,
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
    borderBottomColor: colors.greyLight,
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
    color: colors.darkGrey,
  },
  checkboxOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.greyLight,
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
    backgroundColor: colors.blue,
  },
  checkboxText: {
    marginLeft: 10,
    fontSize: 16,
    color: colors.darkGrey,
  },
});
