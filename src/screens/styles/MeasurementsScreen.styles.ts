/* eslint-disable @typescript-eslint/no-explicit-any */
import { StyleSheet } from "react-native";

export const measuresStyles = (colors: any) =>
  StyleSheet.create({
  // Container Principal
  container: {
    flexGrow: 1,
    paddingHorizontal: 8,
    backgroundColor: colors.background,
  },
  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  teste: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.header,
  },

  // Filter Row (Dropdowns e botões)
  filterRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginBottom: 16,
    gap: 12,
    zIndex: 1000, 
    elevation: 1000,
  },

  // Dropdown Styles Melhorados
  dropdownWrapper: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.greyLight,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: colors.black,
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  dropdownUsersWrapper: {
    flex: 1,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.greyLight,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 8,
    shadowColor: colors.black,
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  dropdownHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 4,
    gap: 8,
  },
  picker: {
    height: 56,
    width: "100%",
    color: colors.header,
    fontSize: 16,
    fontWeight: "500",
  },

  // Action Button Melhorado
  actionButton: {
    backgroundColor: colors.blue,
    borderRadius: 16,
    width: 51,
    height: 51,
    justifyContent: "center",
    alignItems: "center",
    shadowOpacity: 0.4,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
    marginBottom: 20,
  },

  // Chips Container
  chipsContainer: {
    marginBottom: 5,
  },
  chipRow: {
    marginBottom: 12,
  },
  chipRowLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.darkGrey,
    marginBottom: 8,
    marginLeft: 4,
  },
  chipScrollView: {
    flexGrow: 0,
  },
  chipGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 4,
  },
  chip: {
    backgroundColor: colors.white,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1.5,
    borderColor: "transparent",
    shadowColor: colors.black,
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  chipActive: {
    backgroundColor: colors.blue,
    borderColor: colors.blue,
    shadowColor: colors.blue,
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  chipText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.darkBlue,
  },
  chipTextActive: {
    color: colors.white,
    fontWeight: "600",
  },

  // Medidas Atuais
  currentMeasurements: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    elevation: 0,
    zIndex: 1,
  },
  measureItem: {
    width: "48%",
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.greyLight,
    shadowColor: colors.black,
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    zIndex: 2,
  },
  measureLabel: {
    fontSize: 13,
    color: colors.description,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 8,
    zIndex: 3,
  },
  measureValueContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  measureValue: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.header,
  },
  deltaText: {
    marginLeft: 2,
    fontSize: 14,
    fontWeight: "600",
  },

  // Subtítulos
  subTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.header,
    marginTop: 10,
    marginBottom: 16,
  },

  // Histórico Box
  historyBox: {
    maxHeight: 300,
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.greyLight,
    shadowColor: colors.black,
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  historyItem: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.greyLight,
  },
  historyDate: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.darkGrey,
  },
  historyDetails: {
    marginTop: 12,
    paddingLeft: 16,
    paddingTop: 12,
  },
  historyDetailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  historyDetailLabel: {
    fontSize: 14,
    color: colors.description,
    fontWeight: "500",
  },
  historyDetailValue: {
    fontSize: 14,
    color: colors.darkGrey,
    fontWeight: "600",
  },

  // Estados vazios
  emptyStateContainer: {
    alignItems: "center",
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
  emptyStateText: {
    color: colors.greyMedium,
    fontSize: 16,
    fontStyle: "italic",
    textAlign: "center",
    lineHeight: 22,
  },

  // Estilos para o gráfico container
  chartContainer: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.greyLight,
    shadowColor: colors.black,
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    marginBottom: 24,
  },
  chartInfo: {
    marginTop: 12,
    alignItems: "center",
  },
  chartInfoText: {
    fontSize: 12,
    color: colors.description,
    fontWeight: "500",
  },

  // Seletores de Métrica (não usado no código atual, mas incluído para completude)
  metricSelector: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginVertical: 16,
    backgroundColor: colors.blueSuperLight,
    borderRadius: 12,
    padding: 8,
  },
  metricButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "transparent",
    margin: 4,
  },
  metricButtonActive: {
    backgroundColor: colors.blue,
    shadowColor: colors.blue,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  metricText: {
    color: colors.description,
    fontSize: 14,
    fontWeight: "600",
  },
  metricTextActive: {
    color: colors.white,
    fontWeight: "700",
  },

  // Filtros de Tempo (não usado no código atual, mas incluído)
  filterContainer: {
    flexDirection: "row",
    backgroundColor: colors.blueSuperLight,
    borderRadius: 12,
    overflow: "hidden",
    marginVertical: 16,
    padding: 4,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: "transparent",
    alignItems: "center",
    borderRadius: 8,
  },
  filterButtonActive: {
    backgroundColor: colors.blue,
    shadowColor: colors.blue,
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  filterText: {
    color: colors.description,
    fontSize: 14,
    fontWeight: "600",
  },
  filterTextActive: {
    color: colors.white,
    fontWeight: "700",
  },

  // Botões de atleta (caso sejam usados)
  athleteButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: colors.white,
    marginRight: 8,
    borderWidth: 2,
    borderColor: colors.greyLight,
    shadowColor: colors.black,
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  athleteSelected: {
    borderColor: colors.blue,
    backgroundColor: colors.blueLight,
  },
  athleteButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.description,
  },
  athleteSelectedText: {
    color: colors.darkBlue,
    fontWeight: "700",
  },

  // Ações de histórico
  historyActionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: colors.blueSuperLight,
  },
  historyActionLeft: {
    flex: 1,
  },
  historyActionRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  deleteButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: colors.redLight,
  },

  // Detalhes expandidos do histórico
  expandedHistoryContainer: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    borderWidth: 1,
    borderColor: colors.greyLight,
  },
  dropdownSection: {
    flex: 1,
    marginBottom: 20,
    zIndex: 1001,
    position: "relative",
    elevation: 1001,
  },

  dropdownLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.greyDark,
    marginBottom: 8,
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
    position: "absolute",
    top: "100%", // aparece logo abaixo do botão
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.greyLight,
    borderRadius: 12,
    shadowColor: colors.header,
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 1001,
    maxHeight: 200, 
    overflow: "hidden", 
    left: 15,
    right: 45,
    zIndex: 1001,
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
    maxHeight: 200,
    right: 65,
    left: 0,
    overflow: "hidden",
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

  dropdownOverlay: {
    position: "absolute",
    top: 35, // Ajuste conforme a posição do seu header
    left: 0,
    right: 60,
    zIndex: 1000,
    elevation: 1000,
  },

  dropdownScrollView: {
    flex: 1,
  },
});
