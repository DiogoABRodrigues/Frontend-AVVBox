import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
    padding: 16,
  },
  
  // Header separado para o título
  titleHeader: {
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  
  // Header para os botões de ação
  actionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    flexWrap: 'wrap',
    rowGap: 8, 
  },
  
  // Separador visual
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginBottom: 16,
  },
  
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 4,
    backgroundColor: '#fff',
  },
  actionButtonText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 14,
  },
  clearButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderColor: '#ff4d4d',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  clearButtonText: {
    color: '#ff4d4d',
    fontWeight: 'bold',
    fontSize: 14,
  },
  
  notificationsList: {
    flex: 1,
  },
  
  // Estado vazio
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    lineHeight: 22,
  },
  
  notificationItem: {
    flexDirection: 'row',
    padding: 12,
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  notificationUnread: {
    backgroundColor: '#d9d9d9',
    borderWidth: 1,
    borderColor: 'black',
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#333',
  },
  notificationTitleUnread: {
    fontWeight: 'bold',
  },
  notificationBody: {
    color: '#555',
    marginTop: 2,
    lineHeight: 18,
  },
  notificationDate: {
    color: '#999',
    fontSize: 12,
    marginTop: 4,
  },
  
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000050',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    maxHeight: '80%',
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
    color: '#333',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  recipientButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  recipientButton: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 8,
    marginVertical: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    minWidth: 80,
  },
  recipientSelected: {
    borderColor: 'blue',
    backgroundColor: '#e6f3ff',
  },
});