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
});
