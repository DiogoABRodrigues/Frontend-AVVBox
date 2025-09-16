import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
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
    backgroundColor: "#ffffff",
    borderRadius: 20, // More rounded for modern feel
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 25,
    shadowOffset: { width: 0, height: 15 },
    elevation: 15,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },

  // Modal Title
  modalTitle: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 24,
    textAlign: "center",
    color: '#1e293b',
    letterSpacing: -0.5,
  },

  // Form Labels
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: '#374151',
    marginBottom: 8,
    marginTop: 4,
    letterSpacing: 0.5,
  },

  // Input Fields
  modalInput: {
    borderWidth: 2,
    borderColor: "#e2e8f0",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: "#f8fafc",
    color: '#1e293b',
    fontWeight: '500',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  modalInputFocused: {
    borderColor: "#2563eb",
    backgroundColor: "#f0f9ff",
    shadowColor: '#2563eb',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  bodyInput: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 14,
  },

  // Recipient Selection
  recipientButtons: {
    flexDirection: "row",
    marginBottom: 20,
    backgroundColor: '#f1f5f9',
    borderRadius: 14,
    padding: 4,
    gap: 4,
  },
  recipientButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderWidth: 0,
    minHeight: 44,
  },
  recipientSelected: {
    backgroundColor: "#dbeafe",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  recipientButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748b',
    textAlign: 'center',
  },
  recipientButtonTextSelected: {
    color: '#ffffff',
    fontWeight: '700',
  },

  // User List Container
  userListContainer: {
    maxHeight: 220,
    marginBottom: 24,
    borderRadius: 14,
    backgroundColor: '#f8fafc',
    borderWidth: 2,
    borderColor: '#e2e8f0',
    overflow: 'hidden',
  },
  
  // Individual User Items in FlatList
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    backgroundColor: '#ffffff',
  },
  userItemLast: {
    borderBottomWidth: 0,
  },
  userItemSelected: {
    backgroundColor: '#dbeafe',
    borderLeftWidth: 4,
    borderLeftColor: '#2563eb',
  },
  userItemText: {
    fontSize: 15,
    color: '#374151',
    fontWeight: '500',
    marginLeft: 12,
  },
  userItemTextSelected: {
    color: '#1e40af',
    fontWeight: '600',
  },
  
  // Selection Indicator
  selectionIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#d1d5db',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectionIndicatorSelected: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  selectionDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ffffff',
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
    backgroundColor: "#2563eb",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginRight: 8,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#ffffff",
    letterSpacing: 0.3,
  },
  clearButton: {
    flex: 1,
    backgroundColor: "#e5e7eb",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  clearButtonText: {
    color: "#374151",
    fontWeight: "bold",
    fontSize: 16,
  },

  // Disabled States
  actionButtonDisabled: {
    backgroundColor: '#e2e8f0',
    shadowOpacity: 0,
    elevation: 0,
  },
  actionButtonTextDisabled: {
    color: '#94a3b8',
  },

  // Loading State
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
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
      flexDirection: 'column',
      gap: 8,
      backgroundColor: 'transparent',
      padding: 0,
    },
    recipientButton: {
      backgroundColor: '#f8fafc',
      borderWidth: 2,
      borderColor: '#e2e8f0',
      borderRadius: 12,
    },
    actionRow: {
      flexDirection: 'column',
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
    textAlign: 'center',
  },
  textBold: {
    fontWeight: '700',
  },
  textSemiBold: {
    fontWeight: '600',
  },
  
  // Counter Badge (for selected users)
  counterBadge: {
    backgroundColor: '#ef4444',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    position: 'absolute',
    top: -6,
    right: -6,
    minWidth: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterBadgeText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '700',
  },

  // Success/Error States
  successBorder: {
    borderColor: '#10b981',
  },
  errorBorder: {
    borderColor: '#ef4444',
  },
  
  // Header for User List
  userListHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f1f5f9',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  userListHeaderText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});