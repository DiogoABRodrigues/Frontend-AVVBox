/* eslint-disable @typescript-eslint/no-explicit-any */
// TrainingScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { ScrollView} from 'react-native-gesture-handler';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { styles } from './styles/TrainingScreen.styles';
import { Availability, DayAvailability } from '../models/Availability';
import { availabilityService } from '../services/availabilityService';
import { Training, TrainingRequest } from '../models/Training';
import { trainingService } from '../services/trainingService';
import { useAuth } from '../context/AuthContext';
import { User } from '../models/User';
import { userService } from '../services/usersService';
import Popup from '../componentes/Popup';

interface TimeSlot {
  time: string;
  formattedTime: string;
}

// Configurar o calendário para português
LocaleConfig.locales['pt'] = {
  monthNames: [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ],
  monthNamesShort: [
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
    'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
  ],
  dayNames: [
    'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira',
    'Quinta-feira', 'Sexta-feira', 'Sábado'
  ],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
  today: 'Hoje'
};
LocaleConfig.defaultLocale = 'pt';

export default function TrainingScreen() {
  const { user } = useAuth();
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedHour, setSelectedHour] = useState<string | null>(null);
  const [trainer, setTrainer] = useState<User | null>(null);
  const [availability, setAvailability] = useState<Availability | null>(null);
  const [morningSlots, setMorningSlots] = useState<TimeSlot[]>([]);
  const [afternoonSlots, setAfternoonSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Estados separados para os diferentes tipos de treinos
  const [trainingsNeedMyAction, setTrainingsNeedMyAction] = useState<Training[]>([]);
  const [confirmedTrainings, setConfirmedTrainings] = useState<Training[]>([]);
  const [pendingOtherPerson, setPendingOtherPerson] = useState<Training[]>([]);

  const [popup, setPopup] = useState({
    visible: false,
    type: "success" as "success" | "error" | "confirm",
    title: "",
    message: "",
    onConfirm: undefined as (() => void) | undefined,
  });
  

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (trainer) {
      loadAvailability(trainer._id);
    }
  }, [trainer]);

  useEffect(() => {
    if (selectedDay && availability) {
      updateAvailableHours();
    }
  }, [selectedDay, availability]);

  const loadData = async () => {
    try {
      setLoading(true);
      const userData = await userService.getById(user.id);
      
      if (userData.coach && userData.coach.length > 0) {
        const coachId = userData.coach[0];
        const coachData = await userService.getById(coachId);
        setTrainer(coachData);
      } else if (userData.role === 'Admin' || userData.role === 'PT') {
        setTrainer(userData);
      }

      await loadAllTrainings();
    } catch {
      Alert.alert('Erro', 'Não foi possível carregar os dados');
    } finally {
      setLoading(false);
    }
  };

  const loadAvailability = async (trainerId: string) => {
    try {
      const trainerAvailability = await availabilityService.getByPT(trainerId);
      setAvailability(trainerAvailability);
    } catch {
      Alert.alert('Erro', 'Não foi possível carregar a disponibilidade do treinador');
    }
  };

  const loadAllTrainings = async () => {
    try {
      const [pending, upcoming] = await Promise.all([
        trainingService.getPending(user.id),
        trainingService.getUpcoming(user.id)
      ]);

      // Separar os treinos nas três categorias
      const needsAction: Training[] = [];
      const confirmed: Training[] = [];
      const pendingOthers: Training[] = [];

      // Treinos confirmados (já aceites por ambos)
      upcoming.forEach(training => {
        if (training.overallStatus === 'confirmed') {
          confirmed.push(training);
        }
      });

      // Treinos pendentes - separar por quem precisa de aceitar
      pending.forEach(training => {
        if (training.overallStatus === 'pending') {
          // Verificar se sou eu que preciso de aceitar
          if ((user.role === 'atleta' && training.proposedBy === 'PT') ||
              (user.role !== 'atleta' && training.proposedBy === 'Athlete')) {
            needsAction.push(training);
          } else {
            pendingOthers.push(training);
          }
        }
      });

      console.log('Treinos que precisam da minha ação:', needsAction);
      console.log('Treinos confirmados:', confirmed);
      console.log('Treinos pendentes de outra pessoa:', pendingOthers);

      setTrainingsNeedMyAction(needsAction);
      setConfirmedTrainings(confirmed);
      setPendingOtherPerson(pendingOthers);
    } catch {
      Alert.alert('Erro', 'Não foi possível carregar os treinos');
    }
  };

  const updateAvailableHours = () => {
    if (!selectedDay || !availability) return;

    const dayOfWeek = getDayOfWeek(selectedDay);
    const dayAvailability = availability[dayOfWeek as keyof Availability] as DayAvailability;

    if (!dayAvailability.working) {
      setMorningSlots([]);
      setAfternoonSlots([]);
      return;
    }

    const morning: TimeSlot[] = [];
    const afternoon: TimeSlot[] = [];

    dayAvailability.intervals.forEach(interval => {
      const startHour = parseInt(interval.start.split(':')[0]);
      const endHour = parseInt(interval.end.split(':')[0]);
      
      // Gerar todos os slots de 15 em 15 minutos para este intervalo
      for (let hour = startHour; hour < endHour; hour++) {
        for (let minute = 0; minute < 60; minute += 15) {
          const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
          const slot = { time, formattedTime: time };
          
          if (hour < 13) {
            morning.push(slot);
          } else {
            afternoon.push(slot);
          }
        }
      }
    });

    // Ordenar os slots
    morning.sort((a, b) => a.time.localeCompare(b.time));
    afternoon.sort((a, b) => a.time.localeCompare(b.time));

    setMorningSlots(morning);
    setAfternoonSlots(afternoon);
  };

  const getDayOfWeek = (dateString: string): string => {
    const date = new Date(dateString);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
  };

  const handleScheduleTraining = async () => {
    if (selectedDay && selectedHour && trainer) {
      try {
        const trainingData: Partial<TrainingRequest> = {
          date: selectedDay,
          hour: selectedHour,
          PT: trainer._id,
          athlete: user.id,
          proposedBy: user.role === 'atleta' ? 'Athlete' : 'PT',
        };

        const res = await trainingService.create(trainingData);

        const membro = user.role === 'atleta' ? 'atleta' : 'treinador';
        if (res && res._id) {
        setPopup({
          visible: true,
          type: "success",
          title: "Sucesso",
          message: "Treino agendado com sucesso! Aguarda a confirmação do " + membro + ".",
          onConfirm: undefined,
        });
      } else { 
        setPopup({
          visible: true,
          type: "error",
          title: "Erro",
          message: "Ocorreu um erro ao agendar o treino.",
          onConfirm: undefined,
        });
      }
        
        // Recarregar todos os treinos para atualizar as listas
        await loadAllTrainings();
      } catch {
        Alert.alert('Erro', 'Não foi possível marcar o treino');
      }
    }
  };

  const handleAcceptTraining = async (trainingId: string) => {
    try {
      await trainingService.accept(trainingId, user.id);
      await loadAllTrainings();
    } catch {
      Alert.alert('Erro', 'Não foi possível confirmar o treino');
    }
  };

  const handleRejectTraining = async (trainingId: string) => {
    try {
      await trainingService.reject(trainingId, user.id);
      await loadAllTrainings();
    } catch {
      Alert.alert('Erro', 'Não foi possível recusar o treino');
    }
  };

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

  const renderTimeSlot = (item: TimeSlot) => (
    <TouchableOpacity
      key={item.time}
      style={[
        styles.hourBox,
        selectedHour === item.time && styles.hourBoxSelected,
      ]}
      onPress={() => setSelectedHour(item.time)}
    >
      <Text
        style={[
          styles.hourText,
          selectedHour === item.time && styles.hourTextSelected,
        ]}
      >
        {item.formattedTime}
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  if (!trainer) {
    return (
      <View style={styles.container}>
        <Text style={styles.noTrainerText}>
          Não tens um treinador atribuído. Contacta a administração.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Treino</Text>
      </View>

      {/* Calendário e Marcação de Novos Treinos */}
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

      {/* Lista de horários disponíveis */}
      {selectedDay && (morningSlots.length > 0 || afternoonSlots.length > 0) && (
        <View style={styles.hoursContainer}
        >
          <Text style={styles.sectionTitle}>
            Horários disponíveis em {selectedDay}
          </Text>
          
          {/* Horários da Manhã */}
          {morningSlots.length > 0 && (
            <View style={styles.timeSection}>
              <Text style={styles.timeSectionHeader}>Manhã</Text>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                nestedScrollEnabled
                scrollEnabled={true}
                style={styles.timeRow}
                onStartShouldSetResponderCapture={() => true}
              >
                {morningSlots.map(renderTimeSlot)}
              </ScrollView>
            </View>
          )}

          {/* Horários da Tarde */}
          {afternoonSlots.length > 0 && (
            <View style={styles.timeSection}>
              <Text style={styles.timeSectionHeader}>Tarde</Text>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                style={styles.timeRow}
              >
                {afternoonSlots.map(renderTimeSlot)}
              </ScrollView>
            </View>
          )}

          {/* Botão de confirmação */}
          {selectedHour && (
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={handleScheduleTraining}
            >
              <Text style={styles.actionButtonText}>
                Marcar Treino
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {selectedDay && morningSlots.length === 0 && afternoonSlots.length === 0 && (
        <Text style={styles.noAvailabilityText}>
          Nenhum horário disponível neste dia
        </Text>
      )}
      
      {/* SECÇÃO 1: Treinos que Precisam da Minha Ação (MAIS IMPORTANTE) */}
      {trainingsNeedMyAction.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Precisas de Confirmar</Text>
          <View style={styles.actionNeededContainer}>
            {trainingsNeedMyAction.map((training) => (
              <View key={training._id} style={styles.actionNeededCard}>
                <Text style={styles.trainingText}>
                  {formatDate(training.date, training.hour)} -{" "}
                  {user.role === "atleta"
                    ? training.PT.name   // atleta vê o nome do PT
                    : training.athlete.name}
                </Text>
                <View style={styles.pendingActions}>
                  <TouchableOpacity 
                    style={styles.acceptButton}
                    onPress={() => handleAcceptTraining(training._id)}
                  >
                    <Text style={styles.buttonText}>Aceitar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.rejectButton}
                    onPress={() => handleRejectTraining(training._id)}
                  >
                    <Text style={styles.buttonText}>Recusar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </>
      )}

      {/* SECÇÃO 2: Próximos Treinos Confirmados */}
      {confirmedTrainings.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Próximos Treinos Confirmados</Text>
          <View style={styles.confirmedContainer}>
            {confirmedTrainings.map((training) => (
              <View key={training._id} style={styles.confirmedCard}>
                <Text style={styles.trainingText}>
                  {formatDate(training.date, training.hour)} -{" "}
                  {user.role === "atleta"
                    ? training.PT.name   // atleta vê o nome do PT
                    : training.athlete.name}
                </Text>
                <Text style={styles.confirmedBadge}>✓ Confirmado</Text>
              </View>
            ))}
          </View>
        </>
      )}

      {/* SECÇÃO 3: À Espera de Confirmação (opcional - pode ser omitida se vazia) */}
      {pendingOtherPerson.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>À Espera de Confirmação</Text>
          <View style={styles.pendingContainer}>
            {pendingOtherPerson.map((training) => (
              <View key={training._id} style={styles.pendingCard}>
                <Text style={styles.trainingText}>
                  {formatDate(training.date, training.hour)} -{" "}
                  {user.role === "atleta"
                    ? training.PT.name   // atleta vê o nome do PT
                    : training.athlete.name}
                </Text>
                <Text style={styles.pendingBadge}>Pendente</Text>
              </View>
            ))}
          </View>
        </>
      )}
      <Popup
          visible={popup.visible}
          type={popup.type as any}
          title={popup.title}
          message={popup.message}
          onConfirm={popup.onConfirm}
          onCancel={() => setPopup(p => ({ ...p, visible: false }))}
          onClose={() => setPopup(p => ({ ...p, visible: false }))}
        />
    </ScrollView>
   );
 }