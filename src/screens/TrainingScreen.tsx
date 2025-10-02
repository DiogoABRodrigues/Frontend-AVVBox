/* eslint-disable @typescript-eslint/no-explicit-any */
// TrainingScreen.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { styles } from "./styles/TrainingScreen.styles";
import { Availability, DayAvailability } from "../models/Availability";
import { availabilityService } from "../services/availabilityService";
import { Training, TrainingRequest } from "../models/Training";
import { trainingService } from "../services/trainingService";
import { useAuth } from "../context/AuthContext";
import { User } from "../models/User";
import { userService } from "../services/usersService";
import Popup from "../componentes/Popup";
import { Ionicons } from "@expo/vector-icons";
import ExerciseScreen from "./ExerciseScreen";

interface TimeSlot {
  time: string;
  formattedTime: string;
}

// Configurar o calendário para português
LocaleConfig.locales["pt"] = {
  monthNames: [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ],
  monthNamesShort: [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ],
  dayNames: [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ],
  dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
  today: "Hoje",
};
LocaleConfig.defaultLocale = "pt";

export default function TrainingScreen() {
  const emptyUser: User = {
    _id: "",
    name: "",
    email: "",
    phoneNumber: "123456789",
    role: "atleta",
    active: true,
    coach: [],
    atheletes: [],
  };

  let { user } = useAuth();

  if (!user) {
    user = emptyUser; // Garantir que user nunca é null
  }

  const [activeTab, setActiveTab] = useState<"schedule" | "exercises">(
    "schedule"
  );

  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedHour, setSelectedHour] = useState<string | null>(null);
  const [details, setDetails] = useState<string | null>(null);
  const [trainer, setTrainer] = useState<User | null>(null);
  const [availability, setAvailability] = useState<Availability | null>(null);
  const [morningSlots, setMorningSlots] = useState<TimeSlot[]>([]);
  const [afternoonSlots, setAfternoonSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(true);

  // Estados separados para os diferentes tipos de treinos
  const [trainingsNeedMyAction, setTrainingsNeedMyAction] = useState<
    Training[]
  >([]);
  const [confirmedTrainings, setConfirmedTrainings] = useState<Training[]>([]);
  const [pendingOtherPerson, setPendingOtherPerson] = useState<Training[]>([]);
  const [confirmedFifteenDays, setConfirmedFifteenDays] = useState<Training[]>(
    []
  );

  const [confirmedAll, setConfirmedAll] = useState<Training[]>([]);
  const [showFifteenDays, setShowFifteenDays] = useState(false);

  const [allDays, setAllDays] = useState(false);

  const [mineAthletes, setMineAthletes] = useState<User[]>([]);

  const [showAthleteDropdown, setShowAthleteDropdown] = useState(false);
  const [selectedAthleteId, setSelectedAthleteId] = useState<string>("");

  const [popup, setPopup] = useState({
    visible: false,
    type: "success" as "success" | "error" | "confirm",
    title: "",
    message: "",
    style: {} as any,
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

  useEffect(() => {
    const fetchAthletes = async () => {
      if (user && user.role !== "atleta") {
        // Carregar os atletas do treinador
        const athletes = await userService.getMyAthletes(user._id);
        athletes.push(user);
        setMineAthletes(athletes);
      }
    };

    fetchAthletes();
  }, [user]);

  const loadData = async () => {
    try {
      setLoading(true);
      if (user.role === "Admin" || user.role === "PT") {
        setTrainer(user);
      } else if (user.coach && user.coach.length > 0) {
        setTrainer(user.coach[0]); // já é o coach completo
      }

      await loadAllTrainings();
    } catch {
      Alert.alert("Erro", "Não foi possível carregar os dados");
    } finally {
      setLoading(false);
    }
  };

  const loadAvailability = async (trainerId: string) => {
    try {
      const trainerAvailability = await availabilityService.getByPT(trainerId);
      setAvailability(trainerAvailability);
    } catch {
      console.error("Failed to load availability for trainer:", user);
      Alert.alert(
        "Erro",
        "Não foi possível carregar a disponibilidade do treinador"
      );
    }
  };

  const loadAllTrainings = async () => {
    try {
      const [pending, upcoming] = await Promise.all([
        trainingService.getPending(user._id),
        trainingService.getUpcoming(user._id),
      ]);

      const confirmedFifteenDays = await trainingService.getNextFifteenDays(
        user._id
      );

      const confirmedAll = await trainingService.getAllConfirmed(user._id);

      // Separar os treinos nas três categorias
      const needsAction: Training[] = [];
      const pendingOthers: Training[] = [];

      // Treinos confirmados (já aceites por ambos)

      // Treinos pendentes - separar por quem precisa de aceitar
      pending.forEach((training) => {
        if (training.overallStatus === "pending") {
          // Verificar se sou eu que preciso de aceitar
          if (
            (user.role === "atleta" && training.proposedBy === "PT") ||
            (user.role !== "atleta" && training.proposedBy === "Athlete")
          ) {
            needsAction.push(training);
          } else {
            pendingOthers.push(training);
          }
        }
      });

      setTrainingsNeedMyAction(needsAction);
      setConfirmedTrainings(upcoming);
      setPendingOtherPerson(pendingOthers);
      setConfirmedFifteenDays(confirmedFifteenDays);
      setConfirmedAll(confirmedAll);
    } catch {
      Alert.alert("Erro", "Não foi possível carregar os treinos");
    }
  };

  const updateAvailableHours = () => {
    if (!selectedDay || !availability) return;

    const dayOfWeek = getDayOfWeek(selectedDay);
    const dayAvailability = availability[
      dayOfWeek as keyof Availability
    ] as DayAvailability;

    if (!dayAvailability.working) {
      setMorningSlots([]);
      setAfternoonSlots([]);
      return;
    }

    const morning: TimeSlot[] = [];
    const afternoon: TimeSlot[] = [];

    dayAvailability.intervals.forEach((interval) => {
      const startHour = parseInt(interval.start.split(":")[0]);
      const endHour = parseInt(interval.end.split(":")[0]);

      // Gerar todos os slots de 15 em 15 minutos para este intervalo
      for (let hour = startHour; hour < endHour; hour++) {
        for (let minute = 0; minute < 60; minute += 15) {
          const time = `${hour.toString().padStart(2, "0")}:${minute
            .toString()
            .padStart(2, "0")}`;
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
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[date.getDay()];
  };

  const handleScheduleTraining = async () => {
    if (selectedDay && selectedHour && trainer) {
      if (isPastSlot(selectedDay, selectedHour)) {
        setPopup({
          visible: true,
          type: "error",
          title: "Data Inválida",
          message:
            "Não é possível marcar um treino num dia/hora que já passou.",
          style: {},
          onConfirm: undefined,
        });
        return;
      }
      try {
        const trainingData: Partial<TrainingRequest> = {
          date: selectedDay,
          hour: selectedHour,
          PT: trainer._id,
          athlete: user.role === "atleta" ? user._id : selectedAthleteId, // Se for atleta, é ele próprio. Se for PT/Admin, é o atleta selecionado
          proposedBy: user.role === "atleta" ? "Athlete" : "PT",
          details: details || undefined, // Adicionar campo de detalhes se necessário
        };

        const res = await trainingService.create(trainingData);

        const membro = user.role === "atleta" ? "treinador" : "atleta";
        if (res && res._id) {
          setPopup({
            visible: true,
            type: "success",
            title: "Sucesso",
            message:
              "Treino agendado com sucesso! Aguarda a confirmação do " +
              membro +
              ".",
            style: {},
            onConfirm: undefined,
          });
        }
        // Recarregar todos os treinos para atualizar as listas
        await loadAllTrainings();
        setDetails(null);
      } catch {
        setPopup({
          visible: true,
          type: "error",
          title: "Erro",
          message: "Ocorreu um erro ao agendar o treino.",
          style: {},
          onConfirm: undefined,
        });
        await loadAllTrainings();
      }
    }
  };

  const handleAcceptTraining = async (trainingId: string) => {
    try {
      await trainingService.accept(trainingId, user._id);
      await loadAllTrainings();
    } catch {
      await loadAllTrainings();
      setPopup({
        visible: true,
        type: "error",
        title: "Erro",
        message: "Não foi possível confirmar o treino.",
        style: {},
        onConfirm: undefined,
      });
    }
  };

  const handleRejectTraining = async (trainingId: string) => {
    setPopup({
      visible: true,
      type: "confirm",
      title: "Confirmar",
      message: "Tens a certeza que queres recusar este treino?",
      style: {},
      onConfirm: async () => {
        try {
          await trainingService.delete(trainingId, user._id);
          await loadAllTrainings();
          setPopup({
            visible: false,
            type: "success",
            title: "Treino Recusado",
            message: "Treino recusado com sucesso.",
            style: {},
            onConfirm: undefined,
          });
        } catch {
          setPopup({
            visible: true,
            type: "error",
            title: "Erro",
            message: "Não foi possível recusar o treino.",
            style: {},
            onConfirm: undefined,
          });
          await loadAllTrainings();
        }
      },
    });
  };

  const formatDate = (dateString: string, time: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const weekdays = [
      "Domingo",
      "Segunda-feira",
      "Terça-feira",
      "Quarta-feira",
      "Quinta-feira",
      "Sexta-feira",
      "Sábado",
    ];
    const weekday = weekdays[date.getDay()];
    return `${day}/${month}, ${weekday} às ${time}`;
  };

  const isPastSlot = (date: string, time: string): boolean => {
    const [hours, minutes] = time.split(":").map(Number);
    const slotDate = new Date(date);
    slotDate.setHours(hours, minutes, 0, 0);
    return slotDate.getTime() < Date.now();
  };

  const renderTimeSlot = (item: TimeSlot) => {
    if (!selectedDay) return null;

    if (isPastSlot(selectedDay, item.time)) {
      // Podes retornar null (não mostrar) ou um botão desativado
      return (
        <View key={item.time} style={[styles.hourBox, { opacity: 0.3 }]}>
          <Text style={styles.hourText}>{item.formattedTime}</Text>
        </View>
      );
    }

    return (
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
  };

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

  const handleDeleteTraining = async (training: Training) => {
    let messageConfirmation;
    let messageAnswer;
    if (training.overallStatus === "confirmed") {
      messageConfirmation =
        "Tens a certeza que queres cancelar este treino? O utilizador será notificado.";
      messageAnswer = "Treino cancelado com sucesso.";
    } else {
      messageConfirmation = "Tens a certeza que queres eliminar este treino?";
      messageAnswer = "Treino eliminado com sucesso.";
    }
    // usar Popup de confirmação
    setPopup({
      visible: true,
      type: "confirm",
      title: "Confirmar eliminação",
      message: messageConfirmation,
      style: {},
      onConfirm: async () => {
        try {
          await trainingService.delete(training._id, user._id);
          await loadAllTrainings(); // Recarregar treinos
          setPopup({
            visible: false,
            type: "success",
            title: "Sucesso",
            message: messageAnswer,
            style: {},
            onConfirm: undefined,
          });
        } catch {
          setPopup({
            visible: true,
            type: "error",
            title: "Erro",
            message: "Não foi possível eliminar o treino.",
            style: {},
            onConfirm: undefined,
          });
          await loadAllTrainings();
        }
      },
    });
  };

  const handleEditTraining = (training: Training) => {

  };

  const getTrainingsToShow = () => {
    if (allDays) return confirmedAll;
    if (showFifteenDays) return confirmedFifteenDays;
    return confirmedTrainings;
  };

  const DaysSwitch = () => (
    <View style={styles.switchContainer}>
      <TouchableOpacity
        style={[
          styles.switchOption,
          !showFifteenDays && !allDays && styles.switchOptionActive,
        ]}
        onPress={() => {
          setAllDays(false);
          setShowFifteenDays(false);
        }}
      >
        <Text
          style={[
            styles.switchText,
            !showFifteenDays && styles.switchTextActive,
          ]}
        >
          7 dias
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.switchOption,
          showFifteenDays && styles.switchOptionActive,
        ]}
        onPress={() => {
          setAllDays(false);
          setShowFifteenDays(true);
        }}
      >
        <Text
          style={[
            styles.switchText,
            showFifteenDays && styles.switchTextActive,
          ]}
        >
          15 dias
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.switchOption,
          allDays && styles.switchOptionActive,
        ]}
        onPress={() => {
          setAllDays(true);
          setShowFifteenDays(false);
        }}
      >
        <Text
          style={[
            styles.switchText,
            allDays && styles.switchTextActive,
          ]}
        >
          Todos
        </Text>
      </TouchableOpacity>
    </View>
  );

  const MainTabSwitch = () => (
    <View style={styles.mainSwitchContainer}>
      <TouchableOpacity
        style={[
          styles.mainSwitchOption,
          activeTab === "schedule" && styles.mainSwitchOptionActive,
        ]}
        onPress={() => setActiveTab("schedule")}
      >
        <Ionicons
          name="calendar-outline"
          size={20}
          color={activeTab === "schedule" ? "#2563eb" : "#6b7280"}
        />
        <Text
          style={[
            styles.mainSwitchText,
            activeTab === "schedule" && styles.mainSwitchTextActive,
          ]}
        >
          Marcar Treino
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.mainSwitchOption,
          activeTab === "exercises" && styles.mainSwitchOptionActive,
        ]}
        onPress={() => setActiveTab("exercises")}
      >
        <Ionicons
          name="barbell-outline"
          size={20}
          color={activeTab === "exercises" ? "#2563eb" : "#6b7280"}
        />
        <Text
          style={[
            styles.mainSwitchText,
            activeTab === "exercises" && styles.mainSwitchTextActive,
          ]}
        >
          Exercícios
        </Text>
      </TouchableOpacity>
    </View>
  );

  // i para ver details
  //opções de editar treino
  const isDisabled =
    !selectedHour || (user.role !== "atleta" && !selectedAthleteId);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Treino</Text>
        <TouchableOpacity onPress={async () => await loadAllTrainings()}>
          <Ionicons name="refresh-circle-outline" size={40} color="#1e293b" />
        </TouchableOpacity>
      </View>

      {/* Switch Principal */}
      <MainTabSwitch />

      {/* Conteúdo baseado na tab ativa */}
      <View style={{ flex: 1 }}>
        <View
          style={{
            display: activeTab === "schedule" ? "flex" : "none",
            flex: 1,
          }}
        >
          <>
            {/* Calendar e restantes componentes */}
            <>
              {/* Calendar */}
              <Calendar
                onDayPress={(day) => {
                  if (selectedDay === day.dateString) {
                    // Se já está selecionado, desmarcar
                    setSelectedDay(null);
                  } else {
                    setSelectedDay(day.dateString);
                  }
                  setSelectedHour(null); // Reset hora ao mudar dia
                }}
                markedDates={
                  selectedDay
                    ? {
                        [selectedDay]: {
                          selected: true,
                          selectedColor: "#2563eb",
                          selectedTextColor: "#ffffff",
                        },
                      }
                    : {}
                }
                theme={{
                  todayTextColor: "#2563eb",
                  arrowColor: "#2563eb",
                  selectedDayBackgroundColor: "#2563eb",
                  selectedDayTextColor: "#ffffff",
                  monthTextColor: "#1e293b",
                  textDayFontWeight: "500",
                  textMonthFontWeight: "700",
                  textDayHeaderFontWeight: "600",
                }}
                style={styles.calendar}
              />

              {/* Lista de horários disponíveis */}
              {selectedDay &&
                (morningSlots.length > 0 || afternoonSlots.length > 0) && (
                  <View style={styles.hoursContainer}>
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

                    {/* Se for Admin ou PT, mostrar dropdown de atletas */}
                    {(user.role === "Admin" || user.role === "PT") && (
                      <View style={styles.dropdownSection}>
                        <Text style={styles.dropdownLabel}>
                          Selecionar Atleta
                        </Text>
                        <TouchableOpacity
                          style={styles.dropdownButton}
                          onPress={() =>
                            setShowAthleteDropdown(!showAthleteDropdown)
                          }
                        >
                          <Text style={styles.dropdownButtonText}>
                            {selectedAthleteId
                              ? mineAthletes.find(
                                  (a) => a._id === selectedAthleteId
                                )?.name
                              : "Escolher atleta..."}
                          </Text>
                          <Text style={styles.dropdownArrow}>
                            {showAthleteDropdown ? "▲" : "▼"}
                          </Text>
                        </TouchableOpacity>

                        {showAthleteDropdown && (
                          <View style={{ ...styles.dropdownOverlay }}>
                            <View style={styles.dropdownListContainer}>
                              <ScrollView
                                nestedScrollEnabled={true}
                                contentContainerStyle={{ flexGrow: 1 }}
                              >
                                {mineAthletes
                                  .filter((t) => t != null)
                                  .map((athlete) => (
                                    <TouchableOpacity
                                      key={athlete._id}
                                      style={[
                                        styles.dropdownItem,
                                        selectedAthleteId === athlete._id &&
                                          styles.dropdownItemSelected,
                                      ]}
                                      onPress={() => {
                                        setSelectedAthleteId(athlete._id);
                                        setShowAthleteDropdown(false);
                                      }}
                                    >
                                      <Text
                                        style={[
                                          styles.dropdownItemText,
                                          selectedAthleteId === athlete._id &&
                                            styles.dropdownItemTextSelected,
                                        ]}
                                      >
                                        {athlete.name}
                                      </Text>
                                      {selectedAthleteId === athlete._id && (
                                        <Text style={styles.checkmark}>✓</Text>
                                      )}
                                    </TouchableOpacity>
                                  ))}
                              </ScrollView>
                            </View>
                          </View>
                        )}
                        {/* Campo opcional de detalhes do treino */}
                        <Text style={styles.detailsLabel}>
                          Detalhes do Treino (opcional)
                        </Text>
                        <TextInput
                          style={styles.detailsInput}
                          placeholder="Plano de treino, objetivos, etc."
                          multiline
                          numberOfLines={5}
                          value={details || ""}
                          onChangeText={setDetails}
                        />
                      </View>
                    )}

                    {/* Botão de confirmação */}
                    {
                      <TouchableOpacity
                        style={[
                          styles.actionButton,
                          isDisabled && { opacity: 0.5 }, // deixa opaco quando desativado
                        ]}
                        onPress={handleScheduleTraining}
                        disabled={isDisabled} // controla clique
                      >
                        <Text style={styles.actionButtonText}>
                          Marcar Treino
                        </Text>
                      </TouchableOpacity>
                    }
                  </View>
                )}

              {selectedDay &&
                morningSlots.length === 0 &&
                afternoonSlots.length === 0 && (
                  <Text style={styles.noAvailabilityText}>
                    Nenhum horário disponível neste dia
                  </Text>
                )}

              {/* SECÇÃO 1: Treinos que Precisam da Minha Ação */}
              {trainingsNeedMyAction.length > 0 && (
                <>
                  <Text style={styles.sectionTitle}>Precisas de Confirmar</Text>
                  <View style={styles.actionNeededContainer}>
                    {trainingsNeedMyAction.map((training) => (
                      <View key={training._id} style={styles.actionNeededCard}>
                        <Text style={styles.trainingText}>
                          {formatDate(training.date, training.hour)}
                          <TouchableOpacity
                            onPress={() => {
                              setPopup({
                                visible: true,
                                type: "success",
                                title: "Detalhes do Treino",
                                message:
                                  training.details || "Sem detalhes adicionais",
                                style: { textAlign: "left", lineHeight: 22 },
                                onConfirm: () =>
                                  setPopup((p) => ({ ...p, visible: false })),
                              });
                            }}
                            style={{ padding: 4 }}
                          >
                            <Ionicons
                              name="information-circle-outline"
                              size={22}
                              color="#1e293b"
                            />
                          </TouchableOpacity>

                          {"\n"}
                          {user.role === "atleta"
                            ? training.PT.name
                            : training.athlete.name}
                        </Text>

                        <View style={styles.confirmedCardFooter}>
                          <Text style={styles.actionNeededBadge}>
                            Aguarda Confirmação
                          </Text>
                        </View>

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
                            <Text style={styles.rejectButtonText}>Recusar</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    ))}
                  </View>
                </>
              )}

              {/* SECÇÃO 2: Próximos Treinos Confirmados */}
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>
                  Próximos Treinos Confirmados
                </Text>
                <DaysSwitch />
              </View>

              <View style={styles.confirmedContainer}>
                {getTrainingsToShow().length > 0 ? (
                  getTrainingsToShow().map((training) => (
                    <View key={training._id} style={styles.confirmedCard}>
                      <Text style={styles.trainingText}>
                        {formatDate(training.date, training.hour)}
                        <TouchableOpacity
                          onPress={() => {
                            setPopup({
                              visible: true,
                              type: "success",
                              title: "Detalhes do Treino",
                              message:
                                training.details || "Sem detalhes adicionais",
                              style: { textAlign: "left", lineHeight: 22 },
                              onConfirm: () =>
                                setPopup((p) => ({ ...p, visible: false })),
                            });
                          }}
                          style={{ padding: 4 }}
                        >
                          <Ionicons
                            name="information-circle-outline"
                            size={22}
                            color="#1e293b"
                          />
                        </TouchableOpacity>
                        {"\n"}
                        {user.role === "atleta"
                          ? training.PT.name
                          : training.athlete.name}
                      </Text>

                      <View style={styles.confirmedCardFooter}>
                        <Text style={styles.confirmedBadge}>Confirmado</Text>
                        <View style={{ flexDirection: "row" }}>
                          <TouchableOpacity
                            onPress={() => handleEditTraining(training)}
                            style={styles.editButtonContainer}
                          >
                            <Ionicons
                              name="create-outline"
                              size={18}
                              color="#1e293b"
                            />
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => handleDeleteTraining(training)}
                            style={styles.deleteButtonContainer}
                          >
                            <Ionicons
                              name="trash-outline"
                              size={18}
                              color="#ef4444"
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  ))
                ) : (
                  <Text style={styles.emptyStateText}>
                    {showFifteenDays
                      ? "Não existem treinos para os próximos 15 dias."
                      : ( allDays ? "Não existem treinos marcados." : "Não existem treinos para os próximos 7 dias.")}
                  </Text>
                )}
              </View>

              {/* SECÇÃO 3: À Espera de Confirmação */}
              {pendingOtherPerson.length > 0 && (
                <>
                  <Text style={styles.sectionTitle}>
                    À Espera de Confirmação
                  </Text>
                  <View style={styles.pendingContainer}>
                    {pendingOtherPerson.map((training) => (
                      <View key={training._id} style={styles.pendingCard}>
                        <Text style={styles.trainingText}>
                          {formatDate(training.date, training.hour)}
                          <TouchableOpacity
                            onPress={() => {
                              setPopup({
                                visible: true,
                                type: "success",
                                title: "Detalhes do Treino",
                                message:
                                  training.details || "Sem detalhes adicionais",
                                style: { textAlign: "left", lineHeight: 22 },
                                onConfirm: () =>
                                  setPopup((p) => ({ ...p, visible: false })),
                              });
                            }}
                            style={{ padding: 4 }}
                          >
                            <Ionicons
                              name="information-circle-outline"
                              size={22}
                              color="#1e293b"
                            />
                          </TouchableOpacity>
                          {"\n"}
                          {user.role === "atleta"
                            ? training.PT.name
                            : training.athlete.name}
                        </Text>

                        <View style={styles.confirmedCardFooter}>
                          <Text style={styles.pendingBadge}>Pendente</Text>
                          <View style={{ flexDirection: "row" }}>
                            <TouchableOpacity
                              onPress={() => handleEditTraining(training)}
                              style={styles.editButtonContainer}
                            >
                              <Ionicons
                                name="create-outline"
                                size={18}
                                color="#1e293b"
                              />
                            </TouchableOpacity>
                            <TouchableOpacity
                              onPress={() => handleDeleteTraining(training)}
                              style={styles.deleteButtonContainer}
                            >
                              <Ionicons
                                name="trash-outline"
                                size={18}
                                color="#ef4444"
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    ))}
                  </View>
                </>
              )}
            </>
          </>
        </View>

        <View
          style={{
            display: activeTab === "exercises" ? "flex" : "none",
            flex: 1,
          }}
        >
          <ExerciseScreen />
        </View>
      </View>

      <Popup
        visible={popup.visible}
        type={popup.type as any}
        title={popup.title}
        message={popup.message}
        style={popup.style || undefined}
        onConfirm={popup.onConfirm}
        onCancel={() => setPopup((p) => ({ ...p, visible: false }))}
        onClose={() => setPopup((p) => ({ ...p, visible: false }))}
      />
    </ScrollView>
  );
}
