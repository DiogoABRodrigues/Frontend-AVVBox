import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // Container Principal
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 40,
    backgroundColor: "#f8fafc",
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
    color: "#1e293b",
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
    backgroundColor: "#ffffff",
    borderWidth: 2,
    borderColor: "#e2e8f0",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  dropdownUsersWrapper: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 8,
    shadowColor: "#000",
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
    color: "#1e293b",
    fontSize: 16,
    fontWeight: "500",
  },

  // Action Button Melhorado
  actionButton: {
    backgroundColor: "#2563eb",
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
    color: "#374151",
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
    backgroundColor: "#ffffffff",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1.5,
    borderColor: "transparent",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  chipActive: {
    backgroundColor: "#2563eb",
    borderColor: "#1d4ed8",
    shadowColor: "#2563eb",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  chipText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#29528bff",
  },
  chipTextActive: {
    color: "#ffffff",
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
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    zIndex: 2,
  },
  measureLabel: {
    fontSize: 13,
    color: "#64748b",
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
    color: "#1e293b",
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
    color: "#1e293b",
    marginTop: 10,
    marginBottom: 16,
  },

  // Histórico Box
  historyBox: {
    maxHeight: 300,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  historyItem: {
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  historyDate: {
    fontSize: 16,
    fontWeight: "700",
    color: "#374151",
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
    color: "#64748b",
    fontWeight: "500",
  },
  historyDetailValue: {
    fontSize: 14,
    color: "#374151",
    fontWeight: "600",
  },

  // Estados vazios
  emptyStateContainer: {
    alignItems: "center",
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
  emptyStateText: {
    color: "#94a3b8",
    fontSize: 16,
    fontStyle: "italic",
    textAlign: "center",
    lineHeight: 22,
  },

  // Estilos para o gráfico container
  chartContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    shadowColor: "#000",
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
    color: "#64748b",
    fontWeight: "500",
  },

  // Seletores de Métrica (não usado no código atual, mas incluído para completude)
  metricSelector: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginVertical: 16,
    backgroundColor: "#f1f5f9",
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
    backgroundColor: "#2563eb",
    shadowColor: "#2563eb",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  metricText: {
    color: "#64748b",
    fontSize: 14,
    fontWeight: "600",
  },
  metricTextActive: {
    color: "#ffffff",
    fontWeight: "700",
  },

  // Filtros de Tempo (não usado no código atual, mas incluído)
  filterContainer: {
    flexDirection: "row",
    backgroundColor: "#f1f5f9",
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
    backgroundColor: "#2563eb",
    shadowColor: "#2563eb",
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  filterText: {
    color: "#64748b",
    fontSize: 14,
    fontWeight: "600",
  },
  filterTextActive: {
    color: "#ffffff",
    fontWeight: "700",
  },

  // Botões de atleta (caso sejam usados)
  athleteButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: "#ffffff",
    marginRight: 8,
    borderWidth: 2,
    borderColor: "#e2e8f0",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  athleteSelected: {
    borderColor: "#2563eb",
    backgroundColor: "#dbeafe",
  },
  athleteButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#64748b",
  },
  athleteSelectedText: {
    color: "#1e40af",
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
    borderBottomColor: "#f1f5f9",
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
    backgroundColor: "#fef2f2",
  },

  // Detalhes expandidos do histórico
  expandedHistoryContainer: {
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
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
    color: "#475569",
    marginBottom: 8,
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
    shadowColor: "#1e293b",
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
