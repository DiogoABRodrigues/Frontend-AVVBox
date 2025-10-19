/* eslint-disable @typescript-eslint/no-explicit-any */
import { StyleSheet } from "react-native";

export const exerciseStyles = (colors: any) =>
  StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.background,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    paddingTop: 8,
    paddingHorizontal: 16,
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.header,
  },
  // Adicione estas propriedades ao seu stylesheet
  dragHandle: {
    padding: 10,
    marginRight: 10,
    justifyContent: "center",
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color:  colors.header,
    marginTop: 8,
  },

  scrollContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },

  sectionDescription: {
    fontSize: 16,
    color: "#64748b",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 22,
    paddingHorizontal: 20,
  },

  // Muscle Group Styles
  muscleGroupContainer: {
    marginBottom: 8,
  },

  muscleGroupHeader: {
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

  muscleGroupHeaderExpanded: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomColor: "#cbd5e1",
    backgroundColor: "#f8fafc",
  },

  muscleGroupLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  muscleGroupIcon: {
    marginRight: 12,
  },

  muscleGroupText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.header,
  },

  muscleGroupRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  exerciseCount: {
    fontSize: 14,
    color: "#64748b",
    fontWeight: "500",
  },

  // Expanded Container
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

  exercisesContainer: {
    padding: 16,
  },

  // Exercise Item Styles
  exerciseItem: {
    marginBottom: 12,
  },

  exerciseInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },

  exerciseDetails: {
    flex: 1,
  },

  exerciseName: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.header,
    marginBottom: 4,
  },

  exerciseStats: {
    fontSize: 14,
    color: "#64748b",
    fontWeight: "500",
  },

  exerciseActions: {
    flexDirection: "row",
    marginLeft: 12,
    gap: 8,
  },

  editButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#dbeafe",
    borderWidth: 1,
    borderColor: "#93c5fd",
  },

  deleteButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#fef2f2",
    borderWidth: 1,
    borderColor: "#fecaca",
  },

  // Edit Mode Styles
  editExerciseContainer: {
    padding: 16,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },

  editRow: {
    marginBottom: 16,
  },

  editRowGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    gap: 12,
  },

  editRowItem: {
    flex: 1,
  },

  editLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 6,
  },

  editInput: {
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#ffffff",
    color: "#374151",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },

  editInputSmall: {
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#ffffff",
    color: "#374151",
    textAlign: "center",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },

  editButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },

  cancelEditButton: {
    backgroundColor: "#ffffff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
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

  cancelEditButtonText: {
    color: "#64748b",
    fontWeight: "600",
    fontSize: 14,
  },

  saveEditButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
    shadowColor: "#2563eb",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },

  saveEditButtonText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 14,
  },

  // Add Exercise Button
  addExerciseButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderStyle: "dashed",
    gap: 8,
    marginTop: 8,
  },

  addExerciseButtonText: {
    fontSize: 16,
    color: "#2563eb",
    fontWeight: "600",
  },

  // Global Save Button
  saveContainer: {
    paddingVertical: 24,
    paddingHorizontal: 4,
  },

  globalSaveButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#059669",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    gap: 8,
    shadowColor: "#059669",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },

  globalSaveButtonText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 18,
  },

  // Statistics Section (for future use)
  statsContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
    paddingHorizontal: 4,
  },

  statCard: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },

  statNumber: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2563eb",
    marginBottom: 4,
  },

  statLabel: {
    fontSize: 12,
    color: "#6b7280",
    textAlign: "center",
    fontWeight: "500",
  },

  // Empty State
  emptyExercisesContainer: {
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },

  emptyExercisesText: {
    fontSize: 16,
    color: "#94a3b8",
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 12,
    lineHeight: 22,
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
    position: "absolute",
    top: "100%", // aparece logo abaixo do botão
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    shadowColor: colors.header,
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
    maxHeight: 200, // 👈 limite
    zIndex: 1001,
    overflow: "hidden", // 👈 evita passar do container
    left: 15,
    right: 15,
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
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  exerciseDetailsText: {
    fontSize: 14,
    color: "#64748b",
    marginTop: 4,
    lineHeight: 18,
  },

  dropdownOverlay: {
    position: "absolute",
    top: 85, // Ajuste conforme a altura do seu botão
    left: 0,
    right: 0,
    zIndex: 9999,
    elevation: 25,
  },

  dropdownListContainer: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    shadowColor: colors.header,
    shadowOpacity: 0.25,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 8 },
    elevation: 20,
    maxHeight: 200, // ⭐ ALTURA FIXA é crucial
    overflow: "hidden",
  },

  dropdownBackdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent",
    zIndex: 9998,
    elevation: 19,
  },

  // Para garantir que o dropdown section tem posição relativa:
  dropdownSection: {
    marginBottom: 20,
    zIndex: 1001,
    elevation: 1001,
  },
});
