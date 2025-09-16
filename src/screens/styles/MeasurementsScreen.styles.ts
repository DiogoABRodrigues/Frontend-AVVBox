import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  // Container Principal
  container: { 
    flex: 1, 
    padding: 16, 
    backgroundColor: '#f8fafc' 
  },

  // Header
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    marginBottom: 24,
    paddingTop: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1e293b',
  },

  // Medidas Atuais
  currentMeasurements: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between', 
    marginBottom: 24,
  },
  measureItem: { 
    width: '48%', 
    backgroundColor: '#ffffff', 
    borderRadius: 16, 
    padding: 16, 
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  measureLabel: { 
    fontSize: 13, 
    color: '#64748b',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  measureValueContainer: { 
    flexDirection: 'row', 
    alignItems: 'center',
  },
  measureValue: { 
    fontSize: 20, 
    fontWeight: '700',
    color: '#1e293b',
  },
  deltaText: { 
    marginLeft: 2, 
    fontSize: 14,
    fontWeight: '600',
  },

  // Subtítulos
  subTitle: { 
    fontSize: 22, 
    fontWeight: '700', 
    color: '#1e293b',
    marginTop: 24, 
    marginBottom: 16,
  },

  // Histórico Box
  historyBox: {
    maxHeight: 300, 
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  historyItem: { 
    backgroundColor: '#f8fafc', 
    borderRadius: 12, 
    padding: 16, 
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  historyDate: { 
    fontSize: 16, 
    fontWeight: '700',
    color: '#374151',
  },
  historyDetails: { 
    marginTop: 12, 
    paddingLeft: 16,
    paddingTop: 12,
  },
  historyDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  historyDetailLabel: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  historyDetailValue: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '600',
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
    textAlign: 'center',
    lineHeight: 22,
  },

  // Seletores de Métrica (não usado no código atual, mas incluído para completude)
  metricSelector: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginVertical: 16,
    backgroundColor: '#f1f5f9',
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
    shadowColor: '#2563eb',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  metricText: {
    color: "#64748b",
    fontSize: 14,
    fontWeight: '600',
  },
  metricTextActive: {
    color: "#ffffff",
    fontWeight: "700",
  },

  // Filtros de Tempo (não usado no código atual, mas incluído)
  filterContainer: {
    flexDirection: "row",
    backgroundColor: '#f1f5f9',
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
    shadowColor: '#2563eb',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  filterText: {
    color: "#64748b",
    fontSize: 14,
    fontWeight: '600',
  },
  filterTextActive: {
    color: "#ffffff",
    fontWeight: "700",
  },

  // Estilos para o gráfico container
  chartContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginVertical: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },

  // Botões de atleta (caso sejam usados)
  athleteButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    marginRight: 8,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  athleteSelected: {
    borderColor: '#2563eb',
    backgroundColor: '#dbeafe',
  },
  athleteButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  athleteSelectedText: {
    color: '#1e40af',
    fontWeight: '700',
  },

  // Ações de histórico
  historyActionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  historyActionLeft: {
    flex: 1,
  },
  historyActionRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  deleteButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#fef2f2',
  },

  // Detalhes expandidos do histórico
  expandedHistoryContainer: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  // Filter Row (Dropdowns e botões)
  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
    gap: 12,
  },

  // Dropdown Styles Melhorados
  dropdownWrapper: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: "#e2e8f0",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  dropdownHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 4,
    gap: 8,
  },
  dropdownLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  // Action Button Melhorado
  actionButton: {
    backgroundColor: '#2563eb',
    borderRadius: 16,
    width: 50,
    height: 49,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#2563eb',
    shadowOpacity: 0.4,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
    marginBottom: 5,
  },

  // Chips Container
  chipsContainer: {
    marginBottom: 0,
  },
  chipRow: {
    marginBottom: 0,
  },
  chipRowLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
    marginLeft: 4,
  },
  chipScrollView: {
    flexGrow: 0,
  },
  chip: {
    backgroundColor: '#f1f5f9',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 8,
    marginRight: 8,
    borderWidth: 1.5,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  chipActive: {
    backgroundColor: '#2563eb',
    borderColor: '#1d4ed8',
    shadowColor: '#2563eb',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
  },
  chipTextActive: {
    color: '#ffffff',
    fontWeight: '600',
  },

  // Dropdown simplificado
dropdownUsersWrapper: {
  flex: 1,
  backgroundColor: '#ffffff',
  borderWidth: 1,
  borderColor: "#e2e8f0",
  borderRadius: 12,
  overflow: "hidden",
  marginBottom: 8,
  shadowOpacity: 0.06,
  shadowRadius: 4,
  shadowOffset: { width: 0, height: 2 },
  elevation: 2,
},

picker: {
  height: 48,
  width: "100%",
  color: '#1e293b',
  fontSize: 16,
  fontWeight: '500',
},

// Novo estilo para chips em grid
chipGrid: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginBottom: 4,
},
});