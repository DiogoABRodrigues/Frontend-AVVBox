// TrainingScreen.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ScrollView  } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { styles } from './styles/TrainingScreen.styles';

export default function TrainingScreen() {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedHour, setSelectedHour] = useState<string | null>(null);

  // Horários disponíveis (placeholder)
  const hours = ['08:00', '10:00', '14:00', '18:00', '20:00'];

  // Mock treinos próximos 7 dias
  const upcomingTrainings = [
    { id: '1', date: '2025-09-04', time: '18:00' },
    { id: '2', date: '2025-09-05', time: '10:00' },
    { id: '3', date: '2025-09-06', time: '14:00' },
    { id: '4', date: '2025-09-07', time: '20:00' },
    { id: '5', date: '2025-09-08', time: '09:00' },
    { id: '6', date: '2025-09-09', time: '19:00' },
    { id: '7', date: '2025-09-10', time: '12:00' },
  ];

  // Função para formatar a data → "03/09, Terça-feira às ..."
  const formatDate = (dateString: string, time: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const weekdays = [
      'Domingo',
      'Segunda-feira',
      'Terça-feira',
      'Quarta-feira',
      'Quinta-feira',
      'Sexta-feira',
      'Sábado',
    ];
    const weekday = weekdays[date.getDay()];
    return `${day}/${month}, ${weekday} às ${time}`;
  };

  const handleScheduleTraining = () => {
    if (selectedDay && selectedHour) {
      // Aqui você implementaria a lógica para agendar o treino
      console.log(`Treino agendado para ${selectedDay} às ${selectedHour}`);
      // Reset selections
      setSelectedDay(null);
      setSelectedHour(null);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Treino</Text>
      </View>

      {/* Calendário */}
      <Calendar
        onDayPress={(day) => setSelectedDay(day.dateString)}
        markedDates={
          selectedDay
            ? {
                [selectedDay]: { 
                  selected: true, 
                  selectedColor: '#2563eb',
                  selectedTextColor: '#ffffff'
                },
              }
            : {}
        }
        theme={{
          todayTextColor: '#2563eb',
          arrowColor: '#2563eb',
          selectedDayBackgroundColor: '#2563eb',
          selectedDayTextColor: '#ffffff',
          monthTextColor: '#1e293b',
          textDayFontWeight: '500',
          textMonthFontWeight: '700',
          textDayHeaderFontWeight: '600',
        }}
        style={styles.calendar}
      />

      {/* Lista de horários */}
      {selectedDay && (
        <View style={styles.hoursContainer}>
          <Text style={styles.sectionTitle}>
            Horários disponíveis em {selectedDay}
          </Text>
          <FlatList
            data={hours}
            keyExtractor={(item) => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.hourBox,
                  selectedHour === item && styles.hourBoxSelected,
                ]}
                onPress={() => setSelectedHour(item)}
              >
                <Text
                  style={[
                    styles.hourText,
                    selectedHour === item && styles.hourTextSelected,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />

          {/* Botão de confirmação */}
          {selectedHour && (
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={handleScheduleTraining}
            >
              <Text style={styles.actionButtonText}>
                Confirmar Treino
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Próximos treinos */}
      <Text style={styles.sectionTitle}>Próximos 7 dias</Text>
      {upcomingTrainings.length > 0 ? (
        <View style={styles.otherTrainingsContainer}>
          {upcomingTrainings.map((training) => (
            <View key={training.id} style={styles.trainingCard}>
              <Text style={styles.trainingText}>
                {formatDate(training.date, training.time)}
              </Text>
            </View>
          ))}
        </View>
      ) : (
        <Text style={styles.noTrainingText}>Nenhum treino marcado para os próximos dias</Text>
      )}

      {/* Estatísticas */}
      <Text style={styles.sectionTitle}>Estatísticas</Text>
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>12</Text>
          <Text style={styles.statLabel}>Treinos este mês</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>80</Text>
          <Text style={styles.statLabel}>Treinos este ano</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>210</Text>
          <Text style={styles.statLabel}>Total de treinos</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>320h</Text>
          <Text style={styles.statLabel}>Horas acumuladas</Text>
        </View>
      </View>
    </ScrollView>
  );
}