/* eslint-disable @typescript-eslint/no-explicit-any */
import { StyleSheet } from "react-native";

export const trainingeStyles = (colors: any) =>
  StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingBottom: 24,
    backgroundColor: colors.background,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 28, // Mudança: fonte maior e mais consistente
    fontWeight: "700", // Mudança: peso de fonte mais específico
    color: colors.header, // Mudança: cor mais escura e moderna
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.header,
    marginBottom: 20,
    marginTop: 8,
  },

  // Calendar Styles
  calendar: {
    borderWidth: 1,
    borderColor: colors.greyLight,
    borderRadius: 20,
    backgroundColor: colors.white,
    shadowColor: colors.header,
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
    marginBottom: 16,
    overflow: "hidden",
  },

  // Hours Selection Styles
  hoursContainer: {
    marginVertical: 24,
    backgroundColor: colors.white,
    padding: 24,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.greyLight,
    shadowColor: colors.header,
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
    color: colors.greyDark,
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
    borderColor: colors.greyLight,
    backgroundColor: colors.white,
    marginRight: 12,
    marginLeft: 3,
    marginBottom: 8,
    minWidth: 85,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.description,
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },

  hourBoxSelected: {
    backgroundColor: colors.blue,
    borderColor: colors.blue,
    elevation: 8,
    transform: [{ scale: 1.02 }],
  },

  hourText: {
    fontSize: 15,
    color: colors.greyDark,
    fontWeight: "600",
  },

  hourTextSelected: {
    color: colors.white,
    fontWeight: "700",
  },

  // Action Button Styles
  actionButton: {
    backgroundColor: colors.blue,
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 24,
    elevation: 12,
  },
  actionButtonText: {
    color: colors.white,
    fontWeight: "700",
    fontSize: 17,
    letterSpacing: 0.3,
  },

  // No Availability Text
  noAvailabilityText: {
    textAlign: "center",
    color: colors.description,
    fontSize: 16,
    marginVertical: 24,
    fontStyle: "italic",
    padding: 20,
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.greyLight,
    shadowColor: colors.black,
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },

  // Loading and Error States
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },

  noTrainerText: {
    textAlign: "center",
    fontSize: 18,
    color: colors.description,
    marginTop: 40,
    padding: 24,
    backgroundColor: colors.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.greyLight,
    marginHorizontal: 20,
    shadowColor: colors.black,
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
    lineHeight: 26,
  },

  noTrainingText: {
    fontSize: 16,
    color: colors.greyMedium,
    fontStyle: "italic",
    textAlign: "center",
    paddingVertical: 32,
    paddingHorizontal: 24,
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.greyLight,
    shadowColor: colors.black,
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
    backgroundColor: colors.white,
    padding: 24,
    borderRadius: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.greyLight,
    shadowColor: colors.header,
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },

  statValue: {
    fontSize: 28,
    fontWeight: "800",
    color: colors.blue,
    marginBottom: 6,
  },

  statLabel: {
    fontSize: 14,
    color: colors.description,
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 20,
  },

  // Additional utility styles
  otherTrainingsContainer: {
    backgroundColor: colors.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.greyLight,
    shadowColor: colors.black,
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
    padding: 8,
    marginBottom: 16,
  },

  trainingCard: {
    backgroundColor: colors.background,
    padding: 20,
    borderRadius: 16,
    marginVertical: 6,
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: colors.greyLight,
    shadowColor: colors.description,
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  secondaryButton: {
    backgroundColor: colors.white,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.greyLight,
    marginTop: 12,
    shadowColor: colors.black,
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },

  secondaryButtonText: {
    color: colors.greyDark,
    fontWeight: "600",
    fontSize: 16,
  },

  trainerInfo: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.greyLight,
    marginBottom: 24,
    shadowColor: colors.black,
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },

  trainerLabel: {
    fontSize: 14,
    color: colors.description,
    marginBottom: 6,
    fontWeight: "500",
  },

  trainerName: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.header,
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
    color: colors.greyDark,
    marginBottom: 8,
    zIndex: 1001,
    elevation: 1001,
  },

  dropdownButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.greyLight,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    shadowColor: colors.description,
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },

  dropdownButtonText: {
    fontSize: 15,
    color: colors.darkGrey,
    fontWeight: "500",
    flex: 1,
  },

  dropdownArrow: {
    fontSize: 12,
    color: colors.description,
    fontWeight: "600",
  },

  dropdownList: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.greyLight,
    borderRadius: 12,
    marginTop: 4,
    shadowColor: colors.header,
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
    borderBottomColor: colors.blueSuperLight,
  },

  dropdownItemSelected: {
    backgroundColor: colors.blueSuperLight,
  },

  dropdownItemText: {
    fontSize: 15,
    color: colors.darkGrey,
    fontWeight: "500",
    flex: 1,
  },

  dropdownItemTextSelected: {
    color: colors.blue,
    fontWeight: "600",
  },

  checkmark: {
    fontSize: 14,
    color: colors.blue,
    fontWeight: "700",
  },
  deleteButton: {
    marginTop: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: colors.red, // vermelho
    borderRadius: 5,
    alignSelf: "flex-start",
  },
  deleteButtonText: {
    color: colors.white,
    fontWeight: "600",
  },
  emptyStateText: {
    fontSize: 16,
    color: colors.greyMedium, // Mudança: cor mais suave e consistente
    fontStyle: "italic",
    textAlign: "center",
    lineHeight: 22,
  },

  actionNeededContainer: {
    backgroundColor: colors.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.greyLight,
    padding: 16,
    marginBottom: 20,
    shadowColor: colors.header,
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },

  actionNeededCard: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: colors.torrado, // Apenas uma linha amarela à esquerda
    borderWidth: 1,
    borderColor: colors.blueSuperLight,
    marginBottom: 12,
    shadowColor: colors.description,
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    position: "relative",
  },

  // Confirmed Section - Clean e moderno
  confirmedContainer: {
    backgroundColor: colors.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.greyLight,
    padding: 16,
    marginBottom: 20,
    shadowColor: colors.header,
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },

  confirmedCard: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.blueSuperLight,
    borderLeftWidth: 4,
    borderLeftColor: colors.green, // Linha verde à esquerda
    shadowColor: colors.description,
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    position: "relative",
  },

  canceledCard: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.blueSuperLight,
    borderLeftWidth: 4,
    borderLeftColor: colors.header , // Linha cinza à esquerda
    shadowColor: colors.description,
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    position: "relative",
  },

  // Pending Section - Consistente com o resto
  pendingContainer: {
    backgroundColor: colors.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.greyLight,
    padding: 16,
    marginBottom: 20,
    shadowColor: colors.header,
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },

  pendingCard: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.blueSuperLight,
    borderLeftWidth: 4,
    borderLeftColor: colors.description, // Linha cinza à esquerda
    shadowColor: colors.description,
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  // Badges mais subtis e modernos
  confirmedBadge: {
    color: colors.green,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.superLightGreen,
    alignSelf: "flex-start",
    marginTop: 8,
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    backgroundColor: colors.greenLight,
  },

  canceledBadge: {
    color: colors.header,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.greyLight,
    alignSelf: "flex-start",
    marginTop: 8,
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    backgroundColor: colors.greenLight,
  },

  pendingBadge: {
    backgroundColor: colors.background,
    color: colors.description,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.greyLight,
    alignSelf: "flex-start",
    marginTop: 8,
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },

  // Badge para treinos que precisam de ação
  actionNeededBadge: {
    backgroundColor: colors.lightYellow,
    color: colors.orange,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.yellow,
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
    color: colors.header,
    fontWeight: "600",
    lineHeight: 24,
    marginBottom: 4,
    alignItems: "center",
    justifyContent: "center",
  },

  // Melhor hierarquia visual para as ações
  confirmedCardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.blueSuperLight,
  },

  canceledCardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.blueSuperLight,
  },

  // Botão de delete mais integrado
  deleteButtonContainer: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: colors.redLight,
    borderWidth: 1,
    borderColor: colors.redMedium,
    shadowColor: colors.red,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    marginLeft: 10,
  },

  editButtonContainer: {
    padding: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.header,
    shadowColor: colors.white,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  // Botões de ação mais modernos
  acceptButton: {
    backgroundColor: colors.green,
    padding: 16,
    borderRadius: 14,
    flex: 0.6,
    alignItems: "center",
    shadowColor: colors.green,
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
    borderColor: colors.greyLight,
  },

  // Texto dos botões
  buttonText: {
    color: colors.white,
    fontWeight: "700",
    fontSize: 14,
    letterSpacing: 0.3,
  },

  rejectButtonText: {
    color: colors.description,
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
    borderTopColor: colors.blueSuperLight,
    gap: 12,
  },
  sectionHeader: {
    justifyContent: "space-between",
    marginBottom: 16,
  },

  switchContainer: {
    flexDirection: "row",
    backgroundColor: colors.blueSuperLight,
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
    backgroundColor: colors.white,
    shadowColor: colors.black,
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
    color: colors.greyMedium,
  },

  switchTextActive: {
    color: colors.darkGrey,
    fontWeight: "600",
  },
  mainSwitchContainer: {
    flexDirection: "row",
    backgroundColor: colors.background,
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
    backgroundColor: colors.white,
    shadowColor: colors.black,
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
    color: colors.greyMedium,
  },

  mainSwitchTextActive: {
    color: colors.blue,
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
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.greyLight,
    shadowColor: colors.black,
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
    color: colors.darkGrey,
  },

  lastWorkoutCard: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.greyLight,
  },

  lastWorkoutText: {
    fontSize: 14,
    color: colors.greyMedium,
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
    backgroundColor: colors.white,
    top: 20,
    borderWidth: 1,
    borderColor: colors.greyLight,
    borderRadius: 12,
    shadowColor: colors.header,
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 1001,
    zIndex: 1001,
    maxHeight: 200,
    overflow: "hidden",
  },

  detailsSection: {
    marginTop: 16,
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.greyLight,
    padding: 16,
    shadowColor: colors.description,
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },

  detailsLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.greyDark,
    marginBottom: 8,
    marginTop: 35,
  },

  detailsInput: {
    backgroundColor: colors.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.greyLight,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    color: colors.header,
    textAlignVertical: "top", // importante para multiline
    minHeight: 80,
    maxHeight: 300,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 70, // margem em cima/baixo
  },

  modalContainer: {
    width: "90%",
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 12,
    shadowColor: colors.white,
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.header,
    marginBottom: 20,
    textAlign: "center",
  },

  modalButtons: {
    flexDirection: "row",
    justifyContent: "center", // centraliza o conjunto
    alignItems: "center",
    marginTop: -15,
    gap: 12, // espaço entre os botões
    alignSelf: "center", // impede de esticar full width
  },

  cancelButton: {
    backgroundColor: colors.blueSuperLight,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 24,
    paddingHorizontal: 20,
  },

  cancelButtonText: {
    color: colors.white,
    fontWeight: "700",
    fontSize: 17,
    letterSpacing: 0.3,
  },

  noAvailabilityText2: {
    textAlign: "center",
    color: colors.description,
    fontSize: 16,
    fontStyle: "italic",
    elevation: 4,
  },
});
