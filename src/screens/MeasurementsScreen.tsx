import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";
import { userService } from "../services/usersService";
import { measuresService } from "../services/measuresService";
import { formatMeasurements } from "../utils/measureUtils";
import { styles } from "./styles/MeasurementsScreen.styles";
import { Measures } from "../models/Measures";
import { LineChart } from "react-native-chart-kit";
import { Picker } from "@react-native-picker/picker";
import MeasuresModal from "../componentes/MeasuresModal";

interface Athlete {
  id: string;
  name: string;
}

interface AthleteData {
  currentMeasurements: Measures;
  lastMeasurement: Measures;
  goalMeasurement: Measures;
}

export default function MeasurementsScreen() {
  const { user } = useAuth();
  const isPT = user?.role === "PT";

  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [selectedAthleteId, setSelectedAthleteId] = useState<string>();
  const [selectedAthleteData, setSelectedAthleteData] =
    useState<AthleteData | null>(null);
  const [historyDates, setHistoryDates] = useState<Measures[]>([]); 

  const [expandedHistory, setExpandedHistory] = useState<string | null>(null);  

  const [timeFilter, setTimeFilter] = useState<"all" | "1y" | "6m" | "3m">("all");
  
  const screenWidth = Dimensions.get("window").width - 32;

  const [selectedMetric, setSelectedMetric] = useState<"weight" | "height" | "bodyFat" | "muscleMass" | "visceralFat">("weight");

  const [showMeasuresModal, setShowMeasuresModal] = useState(false);

  const emptyMeasures = {
    weight: 0,
    height: 0,
    bodyFat: 0,
    muscleMass: 0,
    visceralFat: 0,
  } as Measures;

  // FETCH atletas
  const fetchAthletes = async () => {
    try {
      if (!isPT || !user) return;
      const fetched = await userService.getAll();

      interface FetchedAthlete {
        _id: string;
        name: string;
      }
      const athletesData: Athlete[] = (fetched as FetchedAthlete[]).map((a) => ({
        id: a._id,
        name: a.name,
      }));

      setAthletes(athletesData);
      if (athletesData.length > 0) {
        setSelectedAthleteId(user.id);
      }
    } catch (err) {
      console.error("Erro ao ir buscar os meus atletas:", err);
    }
  };

  const fetchMeasures = async () => {
    try {
      if (!selectedAthleteId) return;

      let athleteMeasures = await measuresService.getAtualByUser(selectedAthleteId);
      if (athleteMeasures === null) {
        athleteMeasures = emptyMeasures;
      }

      let athleteGoalMeasures = await measuresService.getGoalByUser(selectedAthleteId);
      if (athleteGoalMeasures === null) {
        athleteGoalMeasures = emptyMeasures;
      }

      let athleteLastMeasures = await measuresService.getLastByUser(selectedAthleteId);
      if (athleteLastMeasures === null) {
        athleteLastMeasures = emptyMeasures;
      }

      const historyMeasures = await measuresService.getByUser(selectedAthleteId);

      setHistoryDates(historyMeasures);
      // Pode ser usado para mostrar histórico, se necessário

      setSelectedAthleteData({
        currentMeasurements: athleteMeasures,
        lastMeasurement: athleteLastMeasures,
        goalMeasurement: athleteGoalMeasures,
      });
    } catch (err) {
      console.error("Erro ao ir buscar medidas do atleta:", err);
    }
  };
  
  useEffect(() => {
    if (isPT) {
      fetchAthletes();
    } else {
      // cliente normal → só vê as próprias medidas
      setSelectedAthleteId(user?.id);
    }
  }, [isPT, user]);

  useEffect(() => {
    fetchMeasures();
  }, [selectedAthleteId]);

  // Medidas formatadas (com deltas e cores)
  const formattedMeasurements = selectedAthleteData
    ? formatMeasurements(
        selectedAthleteData.currentMeasurements,
        selectedAthleteData.lastMeasurement,
        selectedAthleteData.goalMeasurement
      )
    : [];

  // Função para renderizar o ícone apropriado
  const renderIcon = (measurement) => {
    const iconColor = measurement.color === "green" ? "#22c55e" : 
                     measurement.color === "red" ? "#ef4444" : "#6b7280";

    if (measurement.reachedGoal) {
      return (
        <Ionicons
          name="star"
          size={20}
          color="#fbbf24" // dourado
          style={{ marginLeft: 4 }}
        />
      );
    }

    if (measurement.delta === 0) {
      return (
        <Ionicons
          name="remove-outline" // linha horizontal
          size={20}
          color={iconColor}
          style={{ marginLeft: 4 }}
        />
      );
    }

    if (measurement.arrow === "up") {
      return (
        <Ionicons
          name="arrow-up-outline"
          size={20}
          color={iconColor}
          style={{ marginLeft: 4 }}
        />
      );
    }

    if (measurement.arrow === "down") {
      return (
        <Ionicons
          name="arrow-down-outline"
          size={20}
          color={iconColor}
          style={{ marginLeft: 4 }}
        />
      );
    }

    return null;
  };

  const filterHistory = () => {
    if (!historyDates) return [];
    const now = new Date();
    let cutoff: Date | null = null;

    switch (timeFilter) {
      case "1y":
        cutoff = new Date();
        cutoff.setFullYear(now.getFullYear() - 1);
        break;
      case "6m":
        cutoff = new Date();
        cutoff.setMonth(now.getMonth() - 6);
        break;
      case "3m":
        cutoff = new Date();
        cutoff.setMonth(now.getMonth() - 3);
        break;
      default:
        cutoff = null;
    }

    return cutoff
      ? historyDates.filter((m) => new Date(m.date) >= cutoff)
      : historyDates;
  };

  const filteredHistory = filterHistory();

  const chartData = {
    labels: filteredHistory.map((m) =>
      new Date(m.date).toLocaleDateString("pt-PT", {
        month: "short",
        year: "2-digit",
      })
    ),
    datasets: [
      {
        data: filteredHistory.map((m) => {
          const value = m[selectedMetric];
          return typeof value === "number" && isFinite(value) ? value : null;

        }),
        color: () => "#2563eb",
        strokeWidth: 2,
      },
    ],
  };


  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Medidas</Text>
      </View>

      {/* Dropdown de atletas */}
    {isPT && (
      <>
      <View style={styles.filterRow}>
        <View style={styles.dropdownUsersWrapper}>
          <Picker
            selectedValue={selectedAthleteId}
            onValueChange={(value) => setSelectedAthleteId(value)}
            style={styles.picker}
          >
            {athletes.map((athlete) => (
              <Picker.Item
                key={athlete.id}
                label={athlete.name}
                value={athlete.id}
              />
            ))}
          </Picker>
        </View>
        {/* Botão de adicionar */}
        <Ionicons
            name="add-circle-outline"
            size={40}
            color="#000"
            onPress={() => setShowMeasuresModal(true)}
          />

          <MeasuresModal
            visible={showMeasuresModal}
            athleteName={athletes.find(a => a.id === selectedAthleteId)?.name || "Atleta"}
            onClose={() => setShowMeasuresModal(false)}
            onSave={(data, type) => {
              console.log("Salvar medidas:", data, "Tipo:", type);
              // chamar service para gravar no backend
            }}
          />
        </View>
      </>
    )}

      {/* Medidas atuais */}
      <View style={styles.currentMeasurements}>
        {formattedMeasurements.map((m, idx) => (
          <View key={idx} style={styles.measureItem}>
            <Text style={styles.measureLabel}>{m.label}</Text>
            <View style={styles.measureValueContainer}>
              <Text style={styles.measureValue}>{m.current}</Text>
              
              {/* Renderizar ícone (seta, linha ou estrela) */}
              {renderIcon(m)}
              
              {/* Mostrar delta apenas se não for zero e não atingiu goal */}
              {m.delta !== 0 && !m.reachedGoal && (
                <Text style={[
                  styles.deltaText, 
                  { color: m.color === "green" ? "#22c55e" : 
                           m.color === "red" ? "#ef4444" : "#6b7280" }
                ]}>
                  {Math.abs(m.delta)}
                </Text>
              )}
            </View>
          </View>
        ))}
      </View>
      {/* Histórico */}
      <Text style={styles.subTitle}>Histórico</Text>
      <View style={styles.historyBox}>
        {(!historyDates || historyDates.length === 0) ? (
          <View style={{ alignItems: "center", padding: 16 }}>
            <Text style={{ color: "#6b7280", fontStyle: "italic" }}>
              Não existem registos de medidas
            </Text>
          </View>
        ) : (
          <ScrollView>
            {historyDates.map((m, idx) => (
              <TouchableOpacity
                key={idx}
                onPress={() =>
                  setExpandedHistory(expandedHistory === m._id ? null : m._id)
                }
                style={{
                  paddingVertical: 8,
                  borderBottomWidth: idx === historyDates.length - 1 ? 0 : 1,
                  borderBottomColor: "#eee",
                }}
              >
                <Text style={styles.historyDate}>
                  {new Date(m.date).toLocaleDateString("pt-PT")}
                </Text>

                {expandedHistory === m._id && (
                  <View style={styles.historyDetails}>
                    <Text>Peso: {m.weight ?? "-"}</Text>
                    <Text>Altura: {m.height ?? "-"}</Text>
                    <Text>Gordura corporal: {m.bodyFat ?? "-"}</Text>
                    <Text>Massa muscular: {m.muscleMass ?? "-"}</Text>
                    <Text>Gordura visceral: {m.visceralFat ?? "-"}</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>

      {/* Gráficos */}
      <Text style={styles.subTitle}>Progresso</Text>
      <View style={styles.filterRow}>
        {/* Dropdown do tempo */}
        <View style={styles.dropdownWrapper}>
          <Picker
            selectedValue={timeFilter}
            onValueChange={(value) => setTimeFilter(value)}
            style={styles.picker}
          >
            <Picker.Item label="Desde sempre" value="all" />
            <Picker.Item label="1 ano" value="1y" />
            <Picker.Item label="6 meses" value="6m" />
            <Picker.Item label="3 meses" value="3m" />
          </Picker>
        </View>

        {/* Dropdown da métrica */}
        <View style={styles.dropdownWrapper}>
          <Picker
            selectedValue={selectedMetric}
            onValueChange={(value) => setSelectedMetric(value)}
            style={styles.picker}
          >
            <Picker.Item label="Peso" value="weight" />
            <Picker.Item label="Altura" value="height" />
            <Picker.Item label="Gordura corporal" value="bodyFat" />
            <Picker.Item label="Massa muscular" value="muscleMass" />
            <Picker.Item label="Gordura visceral" value="visceralFat" />
          </Picker>
        </View>
      </View>
      {!filteredHistory || filteredHistory.length === 0 ? (
      <View style={{ alignItems: "center", marginVertical: 16 }}>
        <Text style={{ color: "#6b7280", fontStyle: "italic" }}>
          Não existem registos de medidas
        </Text>
      </View>
    ) : (
      <LineChart
        data={chartData}
        width={screenWidth}
        height={220}
        chartConfig={{
          backgroundColor: "#fff",
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(37, 99, 235, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0,0,0,${opacity})`,
          style: { borderRadius: 16 },
        }}
        style={{ marginVertical: 16, borderRadius: 16 }}
        bezier
      />
    )}
    </ScrollView>
  );
}