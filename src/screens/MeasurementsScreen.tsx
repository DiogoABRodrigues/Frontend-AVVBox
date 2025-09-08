/* eslint-disable @typescript-eslint/no-explicit-any */
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
import Popup from "../componentes/Popup";

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
  const isPT = user?.role === "PT" || user?.role === "Admin";

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

  const [popup, setPopup] = useState({
    visible: false,
    type: "success" as "success" | "error" | "confirm",
    title: "",
    message: "",
    onConfirm: undefined as (() => void) | undefined,
  });

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

    // último registo
  const latest =
    historyDates.length > 0
      ? historyDates.reduce((latest, curr) =>
          new Date(curr.date) > new Date(latest.date) ? curr : latest
        )
      : null;

  // verificar se é mais recente que 30 dias
  const isDeletable = (dateStr: string) => {
    const now = new Date();
    const date = new Date(dateStr);
    const diff = (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24); // em dias
    return diff <= 30;
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

  const historyDatesSorted = [...filteredHistory].sort((a, b) =>
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const labels = historyDatesSorted.map((m) =>
    new Date(m.date).toLocaleDateString("pt-PT", {
      month: "short",
      year: "2-digit",
    })
  );

  // reduzir labels (máx 6)
  const step = Math.ceil(labels.length / 6);
  const reducedLabels = labels.map((l, i) => (i % step === 0 ? l : ""));

  const chartData = {
    labels: reducedLabels,
    datasets: [
      {
        data: historyDatesSorted.map((m) => {
          const value = m[selectedMetric];
          return typeof value === "number" && isFinite(value) ? value : null;

        }),
        color: () => "#2563eb",
        strokeWidth: 2,
      },
    ],
  };

  const handleSaveMeasures = async (data: Measures) => {
    try {
      data.user = selectedAthleteId;

      let res;
      if (data.type == "goal" && selectedAthleteData.goalMeasurement._id != null) {
        res = await measuresService.update(selectedAthleteData.goalMeasurement._id, data);
      } else {
        res =await measuresService.create(data);
      }

      if (res && res._id) {
        setPopup({
          visible: true,
          type: "success",
          title: "Sucesso",
          message: "Alteração guardada com sucesso!",
          onConfirm: undefined,
        });
      } else { 
        setPopup({
          visible: true,
          type: "error",
          title: "Erro",
          message: "Ocorreu um erro ao guardar a alteração, verifique os dados e tente novamente.",
          onConfirm: undefined,
        });
      }

      fetchMeasures();
      setShowMeasuresModal(false);
    } catch {
        setPopup({
        visible: true,
        type: "error",
        title: "Erro",
        message: "Não foi possível guardar as medidas.",
        onConfirm: undefined,
      });
    }
};

  const handleDeleteLatest = async (id: string) => {
    try {
      const res = await measuresService.delete(id);

      if (res && (res === 200 || res === 201)) {
        setPopup({
          visible: true,
          type: "success",
          title: "Sucesso",
          message: "Registo eliminado com sucesso!",
          onConfirm: undefined,
        });
      } else { 
        setPopup({
          visible: true,
          type: "error",
          title: "Erro",
          message: "Ocorreu um erro ao eliminar o registo, tente novamente.",
          onConfirm: undefined,
        });
      }

      fetchMeasures();
    } catch {
      setPopup({
        visible: true,
        type: "error",
        title: "Erro",
        message: "Não foi possível eliminar o registo. ",
        onConfirm: undefined,
      });
    }
  };

  const confirmDelete = (id: string) => {
    setPopup({
      visible: true,
      type: "confirm",
      title: "Confirmar eliminação",
      message: "Tens a certeza que queres eliminar este registo? Esta ação é permanente e não pode ser desfeita.",
      onConfirm: () => {
        handleDeleteLatest(id);
        setPopup((p) => ({ ...p, visible: false }));
      },
    });
  };

  return (
    <>
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
            onSave={(data) => {
              console.log("Salvar medidas:", data);
              handleSaveMeasures(data);
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
              {// add kg ou m ou % conforme a medida e nada se for visceralFat
              m.label === "Altura" ? (
                <Text style={styles.measureValue}>{m.current} cm</Text>
              ) : m.label === "Peso" ? (
                <Text style={styles.measureValue}>{m.current} Kg</Text>
              ) : m.label === "Gordura visceral" ? (
                <Text style={styles.measureValue}>{m.current}</Text>
              ) : (
                <Text style={styles.measureValue}>{m.current} %</Text>
              )}

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
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.historyDate}>
                  {new Date(m.date).toLocaleDateString("pt-PT")}
                </Text>

                {/* Mostrar lixo apenas se for o último e tiver menos de 30 dias */}
                {latest && m._id === latest._id && isDeletable(m.date) && (
                <TouchableOpacity onPress={() => confirmDelete(m._id)}>
                  <Ionicons name="trash-outline" size={22} color="#ef4444" />
                </TouchableOpacity>
                )}
                {expandedHistory === m._id && (
                  <View style={styles.historyDetails}>
                    <Text>Peso: {m.weight ?? "-"} Kg</Text>
                    <Text>Altura: {m.height ?? "-"} cm</Text>
                    <Text>Gordura corporal: {m.bodyFat ?? "-"} %</Text>
                    <Text>Massa muscular: {m.muscleMass ?? "-"} %</Text>
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

    {/* POPUP sempre fora do ScrollView */}
    <Popup
      visible={popup.visible}
      type={popup.type as any}
      title={popup.title}
      message={popup.message}
      onConfirm={popup.onConfirm}
      onCancel={() => setPopup(p => ({ ...p, visible: false }))}
      onClose={() => setPopup(p => ({ ...p, visible: false }))}
    />
  </>
  );
}