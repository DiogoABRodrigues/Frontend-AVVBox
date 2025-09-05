import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  FlatList,
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
  const [selectedAthleteId, setSelectedAthleteId] = useState<string>(user?.id);
  const [selectedAthleteData, setSelectedAthleteData] =
    useState<AthleteData | null>(null);

  const [expandedHistory, setExpandedHistory] = useState<string | null>(null);  

  const screenWidth = Dimensions.get("window").width - 32;

  // FETCH atletas
  const fetchAthletes = async () => {
    try {
      if (!isPT || !user) return;
      const fetched = await userService.getMyAthletes(user.id);

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
        setSelectedAthleteId(athletesData[0].id);
      }
    } catch (err) {
      console.error("Erro ao ir buscar os meus atletas:", err);
    }
  };

  // FETCH medidas
  const fetchMeasures = async () => {
    try {
      if (!selectedAthleteId) return;
      const athleteMeasures = await measuresService.getAtualByUser(selectedAthleteId);
      const athleteGoalMeasures = await measuresService.getGoalByUser(
        selectedAthleteId
      );
      const athleteLastMeasures = await measuresService.getLastByUser(
        selectedAthleteId
      );

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
    fetchAthletes();
  }, []);

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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Medidas</Text>
      </View>

      {/* Dropdown de atletas */}
      <FlatList
        data={athletes}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.athleteButton,
              item.id === selectedAthleteId && styles.athleteSelected,
            ]}
            onPress={() => setSelectedAthleteId(item.id)}
          >
            <Text
              style={
                item.id === selectedAthleteId
                  ? { fontWeight: "bold" }
                  : undefined
              }
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
        style={{ marginBottom: 16 }}
        showsHorizontalScrollIndicator={false}
      />

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
      {/*
      <Text style={styles.subTitle}>Histórico</Text>
      {athlete.goalMeasurement.map(h => (
        <TouchableOpacity
          key={h.date}
          onPress={() => setExpandedHistory(expandedHistory === h.date ? null : h.date)}
          style={styles.historyItem}
        >
          <Text style={styles.historyDate}>{h.date}</Text>
          {expandedHistory === h.date && (
            <View style={styles.historyDetails}>
              {h.measurements.map((m, idx) => (
                <Text key={idx}>{`${m.label}: ${m.value}`}</Text>
              ))}
            </View>
          )}
        </TouchableOpacity>
      ))}
      */}

      {/* Gráficos */}
      {/*
      <Text style={styles.subTitle}>Gráficos</Text>
      <LineChart
        data={{
          labels: athlete.goalMeasurement.map(h => h.date),
          datasets: [
            {
              data: athlete.goalMeasurement.map(h =>
                h.measurements.find(m => m.label === 'Peso')?.value || 0
              ),
              color: () => '#1f77b4',
            },
          ],
        }}
        width={screenWidth}
        height={220}
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(31, 119, 180, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0,0,0,${opacity})`,
          style: { borderRadius: 16 },
        }}
        style={{ marginVertical: 16, borderRadius: 16 }}
      />
      */}
    </ScrollView>
  );
}