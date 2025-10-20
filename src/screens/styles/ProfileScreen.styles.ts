/* eslint-disable @typescript-eslint/no-explicit-any */
import { StyleSheet } from "react-native";

export const profileStyles = (colors: any) =>
  StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 8,
    backgroundColor: colors.background,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.header,
  },

  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.greyLight,
    shadowColor: colors.black,
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
    borderColor: colors.greyLight,
  },
  userInfo: { flex: 1 },
  name: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 4,
    color: colors.header,
  },
  email: {
    fontSize: 16,
    color: colors.description,
    fontWeight: "500",
    marginBottom: 4,
  },
  details: {
    fontSize: 14,
    color: colors.greyMedium,
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
    borderColor: colors.greyLight,
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  actionBoxExpanded: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomColor: colors.greyLight,
    backgroundColor: colors.background,
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
    color: colors.darkGrey,
    fontWeight: "600",
  },
  logoutBox: {
    borderColor: colors.redMedium,
    backgroundColor: colors.redLight,
  },

  // Expanded Container Styles
  expandedContainer: {
    backgroundColor: colors.white,
    borderColor: colors.greyLight,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    shadowColor: colors.black,
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
    color: colors.header,
    marginBottom: 20,
    textAlign: "center",
  },

  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.darkGrey,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.greyLight,
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    backgroundColor: colors.white,
    color: colors.darkGrey,
    shadowColor: colors.black,
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
    backgroundColor: colors.blue,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    flex: 1,
    shadowColor: colors.blue,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  saveButtonText: {
    color: colors.white,
    fontWeight: "700",
    fontSize: 16,
  },

  cancelButton: {
    backgroundColor: colors.white,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.greyLight,
    flex: 1,
    shadowColor: colors.black,
    shadowOpacity: 0.04,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  cancelButtonText: {
    color: colors.description,
    fontWeight: "600",
    fontSize: 16,
  },

  // Objectives placeholder
  objectivesPlaceholder: {
    alignItems: "center",
    paddingVertical: 40,
    backgroundColor: colors.background,
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: colors.greyLight,
    marginBottom: 20,
  },
  placeholderText: {
    fontSize: 16,
    color: colors.greyMedium,
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
    backgroundColor: colors.blueSuperLight,
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
    backgroundColor: colors.blue,
    shadowColor: colors.blue,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  filterButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.description,
  },

  filterButtonTextActive: {
    color: colors.white,
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
    borderColor: colors.greyLight,
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOpacity: 0.04,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },

  roleFilterButtonActive: {
    backgroundColor: colors.blue,
    borderColor: colors.blue,
    shadowColor: colors.blue,
    shadowOpacity: 0.3,
  },

  roleFilterText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.description,
  },

  roleFilterTextActive: {
    color: colors.white,
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
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.greyLight,
    shadowColor: colors.black,
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  userItemInactive: {
    opacity: 0.6,
    backgroundColor: colors.background,
  },

  userName: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.header,
    marginBottom: 4,
  },

  userRole: {
    fontSize: 14,
    color: colors.description,
    fontWeight: "500",
    marginBottom: 2,
  },

  userStatus: {
    fontSize: 12,
    fontWeight: "600",
  },

  userStatusActive: {
    color: colors.darkgreen,
  },

  userStatusInactive: {
    color: colors.red,
  },

  menuButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.greyLight,
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
    backgroundColor: colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.greyLight,
    shadowColor: colors.black,
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
    borderBottomColor: colors.blueSuperLight,
  },

  menuOptionLast: {
    borderBottomWidth: 0,
  },

  menuOptionText: {
    fontSize: 14,
    color: colors.darkGrey,
    fontWeight: "500",
  },

  menuOptionDanger: {
    color: colors.red,
    fontWeight: "600",
  },

  emptyUsersContainer: {
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },

  emptyUsersText: {
    fontSize: 16,
    color: colors.greyMedium,
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 12,
    lineHeight: 22,
  },

  // Notification Styles
  notificationDescription: {
    fontSize: 14,
    color: colors.description,
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 20,
  },

  copyDescription: {
    fontSize: 14,
    color: colors.header,
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
    borderBottomColor: colors.blueSuperLight,
  },

  notificationLabel: {
    fontSize: 16,
    color: colors.darkGrey,
    fontWeight: "500",
    flex: 1,
    marginRight: 10,
  },

  switch: {
    width: 52,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.greyLight,
    padding: 2,
    justifyContent: "center",
  },

  switchActive: {
    backgroundColor: colors.blue,
  },

  switchThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.white,
    shadowColor: colors.black,
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
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.greyLight,
    shadowColor: colors.black,
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
    color: colors.header,
    marginBottom: 4,
  },

  contactRole: {
    fontSize: 12,
    color: colors.blue,
    fontWeight: "600",
    textTransform: "uppercase",
    marginBottom: 4,
  },

  contactPhone: {
    fontSize: 14,
    color: colors.description,
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
    color: colors.greyMedium,
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
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.greyLight,
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
    color: colors.header,
  },

  workingDayToggle: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.greyLight,
  },

  workingDayText: {
    fontSize: 12,
    color: colors.description,
    fontWeight: "500",
  },

  workingDayTextActive: {
    color: colors.darkgreen,
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
    borderColor: colors.greyLight,
    borderRadius: 8,
    padding: 8,
    fontSize: 14,
    backgroundColor: colors.white,
    textAlign: "center",
    minWidth: 60,
  },

  timeSeparator: {
    fontSize: 14,
    color: colors.description,
    fontWeight: "500",
  },

  removeTimeButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: colors.redLight,
    borderWidth: 1,
    borderColor: colors.redMedium,
  },

  addTimeButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 8,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.greyLight,
    borderStyle: "dashed",
    gap: 6,
    marginTop: 8,
  },

  addTimeButtonText: {
    fontSize: 14,
    color: colors.blue,
    fontWeight: "500",
  },
  dayContainerDisabled: {
    opacity: 1,
    backgroundColor: colors.blueSuperLight,
  },

  dayTitleDisabled: {
    color: colors.greyMedium,
  },

  workingDayToggleActive: {
    backgroundColor: colors.blueLight,
    borderColor:colors.blueMedium,
  },

  timeRangesContainerDisabled: {
    opacity: 0.7,
  },

  timeRangeRowDisabled: {
    opacity: 0.8,
  },

  timeInputDisabled: {
    backgroundColor: colors.blueSuperLight,
    color: colors.greyMedium,
    borderColor: colors.greyMidLight,
  },

  timeSeparatorDisabled: {
    color: colors.greyMedium,
  },

  removeTimeButtonDisabled: {
    backgroundColor: colors.background,
    borderColor: colors.greyLight,
    opacity: 0.5,
  },

  addTimeButtonDisabled: {
    backgroundColor: colors.background,
    borderColor: colors.greyLight,
    opacity: 0.6,
  },

  addTimeButtonTextDisabled: {
    color: colors.greyMedium,
  },
  timeInputError: {
    borderColor: colors.red,
    borderWidth: 1,
  },
});
