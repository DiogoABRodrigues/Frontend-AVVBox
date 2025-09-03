import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f3f3', padding: 16 },

  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  headerTitle: { fontSize: 22, fontWeight: 'bold', marginLeft: 10, color: '#333' },

  sectionTitle: { fontSize: 18, fontWeight: '600', marginVertical: 12, color: '#000000ff' },

  hoursContainer: { marginVertical: 10 },
  hourBox: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    marginRight: 10,
  },
  hourBoxSelected: {
    backgroundColor: '#000000ff',
    borderColor: '#000000ff',
  },
  hourText: { fontSize: 16, color: '#333' },
  hourTextSelected: { color: '#fff', fontWeight: 'bold' },

  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  statBox: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  statValue: { fontSize: 20, fontWeight: 'bold', color: '#000000ff' },
  statLabel: { fontSize: 14, color: '#555', marginTop: 4, textAlign: 'center' },
  upcomingContainer: {
  marginVertical: 12,
  padding: 12,
  backgroundColor: '#fff',
  borderRadius: 12,
  },

  trainingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  nextTrainingCard: {
  backgroundColor: '#fff',
  padding: 16,
  borderRadius: 12,
  marginVertical: 8,
  shadowColor: '#000',
  shadowOpacity: 0.05,
  shadowRadius: 4,
  elevation: 2,
  },
  nextTrainingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#000',
  },
  nextTrainingText: {
    fontSize: 14,
    color: '#333',
  },

  otherTrainingsContainer: {
    marginTop: 8,
  },
  trainingCard: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  trainingText: {
    fontSize: 14,
    color: '#333',
  },
  noTrainingText: {
    fontSize: 14,
    color: '#888',
    fontStyle: 'italic',
    marginVertical: 8,
  },
  calendar: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 10
  },

});
