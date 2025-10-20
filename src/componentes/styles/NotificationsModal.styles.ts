/* eslint-disable @typescript-eslint/no-explicit-any */
import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const notificationModalStyles = (colors: any) =>
  StyleSheet.create({
  // Modal Overlay
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.7)", // Darker, more modern overlay
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  // Modal Container
  modalContainer: {
    width: "100%",
    maxWidth: 420,
    maxHeight: height * 0.85, // Responsive height
    backgroundColor: colors.white,
    borderRadius: 20, // More rounded for modern feel
    padding: 24,
    shadowColor: colors.black,
    shadowOpacity: 0.3,
    shadowRadius: 25,
    shadowOffset: { width: 0, height: 15 },
    elevation: 15,
    borderWidth: 1,
    borderColor: colors.blueSuperLight,
  },

  // Modal Title
  modalTitle: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 24,
    textAlign: "center",
    color: colors.header,
    letterSpacing: -0.5,
  },

  // Form Labels
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.darkGrey,
    marginBottom: 8,
    marginTop: 4,
    letterSpacing: 0.5,
  },

  // Input Fields
  modalInput: {
    borderWidth: 2,
    borderColor: colors.greyLight,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: colors.background,
    color: colors.header,
    fontWeight: "500",
    shadowColor: colors.black,
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  modalInputFocused: {
    borderColor: colors.blue,
    backgroundColor: colors.background,
    shadowColor: colors.blue,
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  bodyInput: {
    height: 100,
    textAlignVertical: "top",
    paddingTop: 14,
  },

  // Recipient Selection
  recipientButtons: {
    flexDirection: "row",
    marginBottom: 20,
    backgroundColor: colors.blueSuperLight,
    borderRadius: 14,
    padding: 4,
    gap: 4,
  },
  recipientButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    borderWidth: 0,
    minHeight: 44,
  },
  recipientSelected: {
    backgroundColor: colors.blueLight,
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  recipientButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.description,
    textAlign: "center",
  },
  recipientButtonTextSelected: {
    color: colors.white,
    fontWeight: "700",
  },

  // User List Container
  userListContainer: {
    maxHeight: 180,
    marginBottom: 24,
    borderRadius: 14,
    backgroundColor: colors.background,
    borderWidth: 2,
    borderColor: colors.greyLight,
    overflow: "hidden",
  },

  // Individual User Items in FlatList
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.blueSuperLight,
    backgroundColor: colors.white,
  },
  userItemLast: {
    borderBottomWidth: 0,
  },
  userItemSelected: {
    backgroundColor: colors.blueLight,
    borderLeftWidth: 4,
    borderLeftColor: colors.blue,
  },
  userItemText: {
    fontSize: 15,
    color: colors.darkGrey,
    fontWeight: "500",
    marginLeft: 12,
  },
  userItemTextSelected: {
    color: colors.darkBlue,
    fontWeight: "600",
  },

  // Selection Indicator
  selectionIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.greyMidLight,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  selectionIndicatorSelected: {
    backgroundColor: colors.blue,
    borderColor: colors.blue,
  },
  selectionDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.white,
  },

  // Action Buttons Row
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    gap: 12,
  },

  // Action Buttons
  actionLeft: {
    flex: 1,
  },
  actionRight: {
    flex: 1,
  },
  actionButton: {
    flex: 1,
    backgroundColor: colors.blue,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginRight: 8,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.white,
    letterSpacing: 0.3,
  },
  clearButton: {
    flex: 1,
    backgroundColor: colors.greyLight,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  clearButtonText: {
    color: colors.darkGrey,
    fontWeight: "bold",
    fontSize: 16,
  },

  // Disabled States
  actionButtonDisabled: {
    backgroundColor: colors.greyLight,
    shadowOpacity: 0,
    elevation: 0,
  },
  actionButtonTextDisabled: {
    color: colors.greyMedium,
  },

  // Loading State
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },

  // Responsive Design for Smaller Screens
  ...(width < 350 && {
    modalContainer: {
      margin: 16,
      padding: 20,
    },
    modalTitle: {
      fontSize: 20,
      marginBottom: 20,
    },
    recipientButtons: {
      flexDirection: "column",
      gap: 8,
      backgroundColor: "transparent",
      padding: 0,
    },
    recipientButton: {
      backgroundColor: colors.background,
      borderWidth: 2,
      borderColor: colors.greyLight,
      borderRadius: 12,
    },
    actionRow: {
      flexDirection: "column",
      gap: 12,
    },
  }),

  // Animation Preparation Classes
  modalEntering: {
    transform: [{ scale: 0.9 }],
    opacity: 0,
  },
  modalEntered: {
    transform: [{ scale: 1 }],
    opacity: 1,
  },

  // Additional Utility Styles
  textCenter: {
    textAlign: "center",
  },
  textBold: {
    fontWeight: "700",
  },
  textSemiBold: {
    fontWeight: "600",
  },

  // Counter Badge (for selected users)
  counterBadge: {
    backgroundColor: colors.red,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    position: "absolute",
    top: -6,
    right: -6,
    minWidth: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  counterBadgeText: {
    color: colors.white,
    fontSize: 11,
    fontWeight: "700",
  },

  // Success/Error States
  successBorder: {
    borderColor: colors.green,
  },
  errorBorder: {
    borderColor: colors.red,
  },

  // Header for User List
  userListHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.blueSuperLight,
    borderBottomWidth: 1,
    borderBottomColor: colors.greyLight,
  },
  userListHeaderText: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.description,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
});
