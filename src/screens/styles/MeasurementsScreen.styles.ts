import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f3f3f3' },
  header: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  athleteButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#fff',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  athleteSelected: {
    borderColor: '#1f77b4',
    backgroundColor: '#dce6f5',
  },
  currentMeasurements: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 16 },
  measureItem: { width: '48%', backgroundColor: '#fff', borderRadius: 12, padding: 12, marginBottom: 8 },
  measureLabel: { fontSize: 14, color: '#555' },
  measureValueContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  measureValue: { fontSize: 18, fontWeight: 'bold' },
  deltaText: { marginLeft: 2, fontSize: 14 },

  subTitle: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    marginTop: 16, 
    marginBottom: 8 
  },

  historyItem: { 
    backgroundColor: '#fff', 
    borderRadius: 12, 
    padding: 12, 
    marginBottom: 8 
  },
  historyDate: { 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  historyDetails: { 
    marginTop: 8, 
    paddingLeft: 8
  },
  historyBox: {
    maxHeight: 250, 
    borderWidth: 1, 
    borderColor: "#ccc", 
    borderRadius: 8, 
    padding: 8, 
    backgroundColor: '#fff' 
  },

  metricSelector: {
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "center",
  marginVertical: 10,
  },

  metricButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#f3f4f6",
    margin: 4,
  },

  metricButtonActive: {
    backgroundColor: "#2563eb",
  },

  metricText: {
    color: "#111",
  },

  metricTextActive: {
    color: "#fff",
    fontWeight: "bold",
  },
  filterContainer: {
  flexDirection: "row",
  borderWidth: 1,
  borderColor: "#ddd",
  borderRadius: 10,
  overflow: "hidden",
  marginVertical: 12,
},

  filterButton: {
    flex: 1,
    paddingVertical: 8,
    backgroundColor: "#fff",
    alignItems: "center",
  },

  filterButtonActive: {
    backgroundColor: "#2563eb",
  },

  filterText: {
    color: "#111",
  },

  filterTextActive: {
    color: "#fff",
    fontWeight: "bold",
  },

    filterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 12,
  },

  dropdownWrapper: {
    flex: 1,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    overflow: "hidden",
  },

  dropdownUsersWrapper: {
    flex: 1,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 8,
  },
  picker: {
    height: 40,
    width: "100%",
    
  },
  actionButton: {
    paddingHorizontal: 4,
    marginBottom: 8,
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 4,
    backgroundColor: '#ffffffff',
    justifyContent: 'center',
  },
  actionButtonText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 14,
  },

});
