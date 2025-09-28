import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingBottom: 24,
    backgroundColor: "#f8fafc",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 28, // Mudança: fonte maior e mais consistente
    fontWeight: "700", // Mudança: peso de fonte mais específico
    color: "#1e293b", // Mudança: cor mais escura e moderna
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 20,
    marginTop: 8,
  },

  // Calendar Styles
  calendar: {
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 20,
    backgroundColor: "#ffffff",
    shadowColor: "#1e293b",
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
    marginBottom: 16,
    overflow: "hidden",
  },

  // Hours Selection Styles
  hoursContainer: {
    marginVertical: 24,
    backgroundColor: "#ffffff",
    padding: 24,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    shadowColor: "#1e293b",
    shadowOpacity: 0.1,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    zIndex: 1001,
    elevation: 1001,
  },

  // Time Section Styles
  timeSection: {
    marginBottom: 20,
  },

  timeSectionHeader: {
    fontSize: 18,
    fontWeight: "700",
    color: "#475569",
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  timeRow: {
    flexDirection: "row",
    paddingVertical: 4,
  },

  hourBox: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#e2e8f0",
    backgroundColor: "#ffffff",
    marginRight: 12,
    marginBottom: 8,
    minWidth: 85,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#64748b",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },

  hourBoxSelected: {
    backgroundColor: "#2563eb",
    borderColor: "#1d4ed8",
    shadowColor: "#2563eb",
    shadowOpacity: 0.4,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
    transform: [{ scale: 1.02 }],
  },

  hourText: {
    fontSize: 15,
    color: "#475569",
    fontWeight: "600",
  },

  hourTextSelected: {
    color: "#ffffff",
    fontWeight: "700",
  },

  // Action Button Styles
  actionButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 24,
    shadowColor: "#2563eb",
    shadowOpacity: 0.4,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 12,
  },
  actionButtonText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 17,
    letterSpacing: 0.3,
  },

  // No Availability Text
  noAvailabilityText: {
    textAlign: "center",
    color: "#64748b",
    fontSize: 16,
    marginVertical: 24,
    fontStyle: "italic",
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },

  // Loading and Error States
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8fafc",
  },

  noTrainerText: {
    textAlign: "center",
    fontSize: 18,
    color: "#64748b",
    marginTop: 40,
    padding: 24,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
    lineHeight: 26,
  },

  noTrainingText: {
    fontSize: 16,
    color: "#94a3b8",
    fontStyle: "italic",
    textAlign: "center",
    paddingVertical: 32,
    paddingHorizontal: 24,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    lineHeight: 24,
  },

  // Statistics (if you want to keep them)
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 8,
    gap: 16,
  },

  statBox: {
    width: "47%",
    backgroundColor: "#ffffff",
    padding: 24,
    borderRadius: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    shadowColor: "#1e293b",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },

  statValue: {
    fontSize: 28,
    fontWeight: "800",
    color: "#2563eb",
    marginBottom: 6,
  },

  statLabel: {
    fontSize: 14,
    color: "#64748b",
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 20,
  },

  // Additional utility styles
  otherTrainingsContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
    padding: 8,
    marginBottom: 16,
  },

  trainingCard: {
    backgroundColor: "#f8fafc",
    padding: 20,
    borderRadius: 16,
    marginVertical: 6,
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    shadowColor: "#64748b",
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  secondaryButton: {
    backgroundColor: "#ffffff",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#e2e8f0",
    marginTop: 12,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },

  secondaryButtonText: {
    color: "#475569",
    fontWeight: "600",
    fontSize: 16,
  },

  trainerInfo: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },

  trainerLabel: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 6,
    fontWeight: "500",
  },

  trainerName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1e293b",
  },

  sectionListContent: {
    paddingHorizontal: 8,
  },
  // Dropdown Styles
  dropdownSection: {
    marginBottom: 20,
    zIndex: 1001,
    elevation: 1001,
  },

  dropdownLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: "#475569",
    marginBottom: 8,
    zIndex: 1001,
    elevation: 1001,
  },

  dropdownButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderWidth: 2,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    shadowColor: "#64748b",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },

  dropdownButtonText: {
    fontSize: 15,
    color: "#374151",
    fontWeight: "500",
    flex: 1,
  },

  dropdownArrow: {
    fontSize: 12,
    color: "#64748b",
    fontWeight: "600",
  },

  dropdownList: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    marginTop: 4,
    shadowColor: "#1e293b",
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
    maxHeight: 200,
    zIndex: 1001,
  },

  dropdownItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },

  dropdownItemSelected: {
    backgroundColor: "#eff6ff",
  },

  dropdownItemText: {
    fontSize: 15,
    color: "#374151",
    fontWeight: "500",
    flex: 1,
  },

  dropdownItemTextSelected: {
    color: "#2563eb",
    fontWeight: "600",
  },

  checkmark: {
    fontSize: 14,
    color: "#2563eb",
    fontWeight: "700",
  },
  deleteButton: {
    marginTop: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "#ef4444", // vermelho
    borderRadius: 5,
    alignSelf: "flex-start",
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  emptyStateText: {
    fontSize: 16,
    color: "#94a3b8", // Mudança: cor mais suave e consistente
    fontStyle: "italic",
    textAlign: "center",
    lineHeight: 22,
  },

  actionNeededContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    padding: 16,
    marginBottom: 20,
    shadowColor: "#1e293b",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },

  actionNeededCard: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#f59e0b", // Apenas uma linha amarela à esquerda
    borderWidth: 1,
    borderColor: "#f1f5f9",
    marginBottom: 12,
    shadowColor: "#64748b",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    position: "relative",
  },

  // Confirmed Section - Clean e moderno
  confirmedContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    padding: 16,
    marginBottom: 20,
    shadowColor: "#1e293b",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },

  confirmedCard: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#f1f5f9",
    borderLeftWidth: 4,
    borderLeftColor: "#10b981", // Linha verde à esquerda
    shadowColor: "#64748b",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    position: "relative",
  },

  canceledCard: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#f1f5f9",
    borderLeftWidth: 4,
    borderLeftColor: "#2e2e2eff", // Linha cinza à esquerda
    shadowColor: "#64748b",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    position: "relative",
  },

  // Pending Section - Consistente com o resto
  pendingContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    padding: 16,
    marginBottom: 20,
    shadowColor: "#1e293b",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },

  pendingCard: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#f1f5f9",
    borderLeftWidth: 4,
    borderLeftColor: "#64748b", // Linha cinza à esquerda
    shadowColor: "#64748b",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  // Badges mais subtis e modernos
  confirmedBadge: {
    color: "#10b981",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#d1fae5",
    alignSelf: "flex-start",
    marginTop: 8,
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    backgroundColor: "#ecfdf5",
  },

  canceledBadge: {
    color: "#2e2e2eff",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#d1d1d1ff",
    alignSelf: "flex-start",
    marginTop: 8,
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    backgroundColor: "#ecfdf5",
  },

  pendingBadge: {
    backgroundColor: "#f8fafc",
    color: "#64748b",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    alignSelf: "flex-start",
    marginTop: 8,
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },

  // Badge para treinos que precisam de ação
  actionNeededBadge: {
    backgroundColor: "#fef3c7",
    color: "#92400e",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#fde68a",
    alignSelf: "flex-start",
    marginTop: 8,
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },

  // Training text mais elegante
  trainingText: {
    fontSize: 16,
    color: "#1e293b",
    fontWeight: "600",
    lineHeight: 24,
    marginBottom: 4,
  },

  // Melhor hierarquia visual para as ações
  confirmedCardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#f1f5f9",
  },

  canceledCardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#f1f5f9",
  },

  // Botão de delete mais integrado
  deleteButtonContainer: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: "#fef2f2",
    borderWidth: 1,
    borderColor: "#fecaca",
    shadowColor: "#ef4444",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  // Botões de ação mais modernos
  acceptButton: {
    backgroundColor: "#10b981",
    padding: 16,
    borderRadius: 14,
    flex: 0.6,
    alignItems: "center",
    shadowColor: "#10b981",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 6,
  },

  rejectButton: {
    backgroundColor: "transparent",
    padding: 16,
    borderRadius: 14,
    flex: 0.4,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#e2e8f0",
  },

  // Texto dos botões
  buttonText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 14,
    letterSpacing: 0.3,
  },

  rejectButtonText: {
    color: "#64748b",
    fontWeight: "700",
    fontSize: 14,
    letterSpacing: 0.3,
  },

  // Espaçamento das ações
  pendingActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#f1f5f9",
    gap: 12,
  },
  sectionHeader: {
    justifyContent: "space-between",
    marginBottom: 16,
  },

  switchContainer: {
    flexDirection: "row",
    backgroundColor: "#f3f4f6",
    borderRadius: 8,
    padding: 2,
    minWidth: 120,
  },

  switchOption: {
    flex: 1,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },

  switchOptionActive: {
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },

  switchText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#6b7280",
  },

  switchTextActive: {
    color: "#374151",
    fontWeight: "600",
  },
  mainSwitchContainer: {
    flexDirection: "row",
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    padding: 4,
    marginHorizontal: 16,
    marginBottom: 20,
  },

  mainSwitchOption: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
  },

  mainSwitchOptionActive: {
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },

  mainSwitchText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6b7280",
  },

  mainSwitchTextActive: {
    color: "#2563eb",
  },

  // Estilos para a tab de exercícios
  exercisesContainer: {
    padding: 16,
  },

  muscleGroupsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 24,
  },

  muscleGroupCard: {
    width: "47%",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },

  muscleGroupText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
  },

  lastWorkoutCard: {
    backgroundColor: "#f9fafb",
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },

  lastWorkoutText: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    fontStyle: "italic",
  },
  dropdownOverlay: {
    position: "absolute",
    top: 64, // Ajuste conforme a posição do seu header
    left: 0,
    right: 0,
    zIndex: 1001,
    elevation: 1001,
  },

  dropdownListContainer: {
    backgroundColor: "#ffffff",
    top: 20,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    shadowColor: "#1e293b",
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 1001,
    zIndex: 1001,
    maxHeight: 200,
    overflow: "hidden",
  },
});
