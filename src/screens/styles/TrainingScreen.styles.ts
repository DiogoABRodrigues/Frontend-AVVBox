import { StyleSheet } from 'react-native';
//training screen styles
export const styles = StyleSheet.create({
  container: { 
    flexGrow: 1, 
    paddingHorizontal: 16, 
    paddingBottom: 40,
    backgroundColor: '#f8fafc' 
  },
  
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingTop: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1e293b',
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 16,
  },

  // Calendar Styles
  calendar: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 16,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    marginBottom: 8,
  },

  // Hours Selection Styles
  hoursContainer: { 
    marginVertical: 20,
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },

  // Upcoming Trainings Styles
  otherTrainingsContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    padding: 4,
    marginBottom: 8,
  },
  trainingCard: {
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 12,
    marginVertical: 4,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  trainingText: {
    fontSize: 15,
    color: '#374151',
    fontWeight: '500',
  },
  noTrainingText: {
    fontSize: 16,
    color: '#94a3b8',
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  // Statistics Styles
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 8,
    gap: 12,
  },
  statBox: {
    width: '47%',
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  statValue: { 
    fontSize: 24, 
    fontWeight: '700', 
    color: '#1e293b',
    marginBottom: 4,
  },
  statLabel: { 
    fontSize: 14, 
    color: '#64748b',
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 18,
  },

  // Button Styles (caso você queira adicionar botões de ação)
  actionButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#2563eb',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  actionButtonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 16,
  },

  secondaryButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginTop: 12,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  secondaryButtonText: {
    color: '#64748b',
    fontWeight: '600',
    fontSize: 16,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc'
  },

  noTrainerText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#64748b',
    marginTop: 40,
    padding: 20,
  },

  trainerInfo: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },

  trainerLabel: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },

  trainerName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
  },

  pendingContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 12,
    marginBottom: 16,
  },

  pendingCard: {
    backgroundColor: '#fff7ed',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#fed7aa',
  },

  pendingActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    gap: 8,
  },

  acceptButton: {
    backgroundColor: '#10b981',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },

  rejectButton: {
    backgroundColor: '#ef4444',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },

  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },

  noAvailabilityText: {
    textAlign: 'center',
    color: '#94a3b8',
    marginVertical: 20,
    fontStyle: 'italic',
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },

  upcomingContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 12,
  },
   sectionListContent: {
    paddingHorizontal: 8,
  },
   timeSection: {
    marginBottom: 16,
  },

  timeSectionHeader: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 8,
  },

  timeRow: {
    flexDirection: 'row',
  },

  hourBox: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#ffffff',
    marginRight: 8,
    marginBottom: 8,
    minWidth: 80,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },

  hourBoxSelected: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
    shadowColor: '#2563eb',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },

  hourText: { 
    fontSize: 14, 
    color: '#374151',
    fontWeight: '600',
  },

  hourTextSelected: { 
    color: '#ffffff', 
    fontWeight: '700',
  },

  actionNeededContainer: {
    backgroundColor: '#ffffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 12,
    marginBottom: 16,
  },
  actionNeededCard: {
    backgroundColor: '#fffbeb',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#fed7aa',
    marginBottom: 8,
  },
  confirmedContainer : {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 12,
    marginBottom: 16,
  },
  confirmedCard: {
    backgroundColor: '#ecfdf5',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#d1fae5',
  },
  confirmedBadge : {
    backgroundColor: '#10b981',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  pendingBadge : {
    backgroundColor: '#fbbf24',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },

});