import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#f8fafc",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    paddingTop: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1e293b",
  },

  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
    borderWidth: 3,
    borderColor: "#e2e8f0",
  },
  userInfo: { flex: 1 },
  name: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 4,
    color: "#1e293b",
  },
  email: {
    fontSize: 16,
    color: "#64748b",
    fontWeight: "500",
    marginBottom: 4,
  },
  details: {
    fontSize: 14,
    color: "#94a3b8",
  },

  actionContainer: {
    marginBottom: 8,
  },
  actionBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 18,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  actionBoxExpanded: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomColor: "#cbd5e1",
    backgroundColor: "#f8fafc",
  },
  actionLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  actionIcon: {
    marginRight: 14,
  },
  actionText: {
    fontSize: 16,
    color: "#374151",
    fontWeight: "600",
  },
  logoutBox: {
    borderColor: "#fecaca",
    backgroundColor: "#fef2f2",
  },

  // Expanded Container Styles
  expandedContainer: {
    backgroundColor: "#ffffff",
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#e2e8f0",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  formContainer: {
    padding: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 20,
    textAlign: "center",
  },

  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    backgroundColor: "#ffffff",
    color: "#374151",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },

  // Button Styles
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    gap: 12,
  },

  saveButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    flex: 1,
    shadowColor: "#2563eb",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  saveButtonText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 16,
  },

  cancelButton: {
    backgroundColor: "#ffffff",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    flex: 1,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  cancelButtonText: {
    color: "#64748b",
    fontWeight: "600",
    fontSize: 16,
  },

  // Objectives placeholder
  objectivesPlaceholder: {
    alignItems: "center",
    paddingVertical: 40,
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#cbd5e1",
    marginBottom: 20,
  },
  placeholderText: {
    fontSize: 16,
    color: "#6b7280",
    marginTop: 12,
    textAlign: "center",
  },

  // User Management Styles
  userManagementContainer: {
    padding: 20,
  },

  filterContainer: {
    flexDirection: "row",
    marginBottom: 20,
    backgroundColor: "#f1f5f9",
    borderRadius: 12,
    padding: 4,
    gap: 4,
  },

  filterButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "transparent",
  },

  filterButtonActive: {
    backgroundColor: "#2563eb",
    shadowColor: "#2563eb",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  filterButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#64748b",
  },

  filterButtonTextActive: {
    color: "#ffffff",
    fontWeight: "700",
  },

  roleFilterContainer: {
    flexDirection: "row",
    marginBottom: 16,
    gap: 8,
    flexWrap: "wrap",
  },

  roleFilterButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },

  roleFilterButtonActive: {
    backgroundColor: "#2563eb",
    borderColor: "#2563eb",
    shadowColor: "#2563eb",
    shadowOpacity: 0.3,
  },

  roleFilterText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748b",
  },

  roleFilterTextActive: {
    color: "#ffffff",
    fontWeight: "700",
  },

  usersList: {
    maxHeight: 400,
  },

  userItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    marginBottom: 8,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  userItemInactive: {
    opacity: 0.6,
    backgroundColor: "#f8fafc",
  },

  userName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 4,
  },

  userRole: {
    fontSize: 14,
    color: "#64748b",
    fontWeight: "500",
    marginBottom: 2,
  },

  userStatus: {
    fontSize: 12,
    fontWeight: "600",
  },

  userStatusActive: {
    color: "#059669",
  },

  userStatusInactive: {
    color: "#dc2626",
  },

  menuButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },

  menuContainer: {
    position: "relative",
    zIndex: 9999,
  },

  // Menu Dropdown - CORREÇÃO AQUI
  menuDropdown: {
    position: "absolute",
    top: 40, // Posiciona abaixo do botão
    right: 0, // Alinha à direita
    backgroundColor: "#ffffff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 8 },
    elevation: 20,
    zIndex: 99999,
    minWidth: 160,
  },

  menuOption: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },

  menuOptionLast: {
    borderBottomWidth: 0,
  },

  menuOptionText: {
    fontSize: 14,
    color: "#374151",
    fontWeight: "500",
  },

  menuOptionDanger: {
    color: "#dc2626",
    fontWeight: "600",
  },

  emptyUsersContainer: {
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },

  emptyUsersText: {
    fontSize: 16,
    color: "#94a3b8",
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 12,
    lineHeight: 22,
  },

  // Notification Styles
  notificationDescription: {
    fontSize: 14,
    color: "#64748b",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 20,
  },

  copyDescription: {
    fontSize: 14,
    color: "#1e293b",
    textAlign: "center",
    lineHeight: 20,
  },

  notificationItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },

  notificationLabel: {
    fontSize: 16,
    color: "#374151",
    fontWeight: "500",
    flex: 1,
  },

  switch: {
    width: 52,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#e2e8f0",
    padding: 2,
    justifyContent: "center",
  },

  switchActive: {
    backgroundColor: "#2563eb",
  },

  switchThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },

  switchThumbActive: {
    transform: [{ translateX: 24 }],
  },

  // Contacts Styles
  contactsList: {
    maxHeight: 400,
  },

  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    marginBottom: 8,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  contactInfo: {
    flex: 1,
  },

  contactName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 4,
  },

  contactRole: {
    fontSize: 12,
    color: "#2563eb",
    fontWeight: "600",
    textTransform: "uppercase",
    marginBottom: 4,
  },

  contactPhone: {
    fontSize: 14,
    color: "#64748b",
    fontWeight: "500",
  },

  copyButton: {
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },

  emptyContactsContainer: {
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },

  emptyContactsText: {
    fontSize: 16,
    color: "#94a3b8",
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 12,
    lineHeight: 22,
  },
  overlayTouchable: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent",
    zIndex: 1, // para ficar por baixo do menu mas acima da lista
  },
  dayContainer: {
    marginBottom: 20,
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },

  dayHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  dayTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
  },

  workingDayToggle: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },

  workingDayText: {
    fontSize: 12,
    color: "#64748b",
    fontWeight: "500",
  },

  workingDayTextActive: {
    color: "#059669",
    fontWeight: "600",
  },

  timeRangesContainer: {
    gap: 8,
  },

  timeRangeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },

  timeInput: {
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 8,
    padding: 8,
    fontSize: 14,
    backgroundColor: "#ffffff",
    textAlign: "center",
    minWidth: 60,
  },

  timeSeparator: {
    fontSize: 14,
    color: "#64748b",
    fontWeight: "500",
  },

  removeTimeButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: "#fef2f2",
    borderWidth: 1,
    borderColor: "#fecaca",
  },

  addTimeButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderStyle: "dashed",
    gap: 6,
    marginTop: 8,
  },

  addTimeButtonText: {
    fontSize: 14,
    color: "#2563eb",
    fontWeight: "500",
  },
  dayContainerDisabled: {
    opacity: 1,
    backgroundColor: "#f1f5f9",
  },

  dayTitleDisabled: {
    color: "#9ca3af",
  },

  workingDayToggleActive: {
    backgroundColor: "#dbeafe",
    borderColor: "#93c5fd",
  },

  timeRangesContainerDisabled: {
    opacity: 0.7,
  },

  timeRangeRowDisabled: {
    opacity: 0.8,
  },

  timeInputDisabled: {
    backgroundColor: "#f3f4f6",
    color: "#9ca3af",
    borderColor: "#d1d5db",
  },

  timeSeparatorDisabled: {
    color: "#9ca3af",
  },

  removeTimeButtonDisabled: {
    backgroundColor: "#f9fafb",
    borderColor: "#e5e7eb",
    opacity: 0.5,
  },

  addTimeButtonDisabled: {
    backgroundColor: "#f9fafb",
    borderColor: "#e5e7eb",
    opacity: 0.6,
  },

  addTimeButtonTextDisabled: {
    color: "#9ca3af",
  },
  timeInputError: {
    borderColor: "#dc2626",
    borderWidth: 1,
  },
});
