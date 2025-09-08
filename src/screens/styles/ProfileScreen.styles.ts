import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    backgroundColor: '#f8fafc' 
  },
  
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
  },

  profileHeader: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 32,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
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
    borderColor: '#e2e8f0',
  },
  userInfo: { flex: 1 },
  name: { 
    fontSize: 20, 
    fontWeight: '700', 
    marginBottom: 4,
    color: '#1e293b',
  },
  email: { 
    fontSize: 16, 
    color: '#64748b', 
    marginBottom: 4 
  },
  details: { 
    fontSize: 14, 
    color: '#94a3b8' 
  },

  actionContainer: {
    marginBottom: 8,
  },
  actionBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 18,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  actionBoxExpanded: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomColor: '#cbd5e1',
    backgroundColor: '#f8fafc',
  },
  actionLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  actionIcon: { 
    marginRight: 14 
  },
  actionText: { 
    fontSize: 16, 
    color: '#374151', 
    fontWeight: '600' 
  },
  logoutBox: { 
    borderColor: '#fecaca',
    backgroundColor: '#fef2f2',
  },

  // Expanded Container Styles
  expandedContainer: {
    backgroundColor: '#fff',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e2e8f0',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    shadowColor: '#000',
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
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 20,
    textAlign: 'center',
  },

  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    backgroundColor: "#f9fafb",
    color: '#374151',
  },

  // Button Styles
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    gap: 12,
  },
  
  saveButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: "center",
    flex: 1,
    shadowColor: '#2563eb',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  
  cancelButton: {
    backgroundColor: "#f8fafc",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: '#d1d5db',
    flex: 1,
  },
  cancelButtonText: {
    color: "#6b7280",
    fontWeight: "600",
    fontSize: 16,
  },

  // Objectives placeholder
  objectivesPlaceholder: {
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#cbd5e1',
    marginBottom: 20,
  },
  placeholderText: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 12,
    textAlign: 'center',
  },

  // new 
});