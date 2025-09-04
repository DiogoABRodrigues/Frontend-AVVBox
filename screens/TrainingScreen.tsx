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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Treino</Text>
      </View>
      {/* Calendário */}
      <Text style={styles.sectionTitle}>Marcar Treino</Text>
      <Calendar
        onDayPress={(day) => setSelectedDay(day.dateString)}
        markedDates={
          selectedDay
            ? {
                [selectedDay]: { selected: true, selectedColor: '#969595ff' },
              }
            : {}
        }
        theme={{
          todayTextColor: '#000000ff',
          arrowColor: '#000000ff',
        }}
        style={styles.calendar}
      />

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
        <Text style={styles.noTrainingText}>Nenhum treino marcado</Text>
      )}

      {/* Lista de horários */}
      {selectedDay && (
        <View style={styles.hoursContainer}>
          <Text style={styles.sectionTitle}>
            Disponível em {selectedDay}
          </Text>
          <FlatList
            data={hours}
            keyExtractor={(item) => item}
            horizontal
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
        </View>
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
          <Text style={styles.statLabel}>Treinos desde sempre</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>320h</Text>
          <Text style={styles.statLabel}>Horas totais</Text>
        </View>
      </View>
    </ScrollView>
  );
}
