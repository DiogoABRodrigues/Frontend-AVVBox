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
import MeasuresModal from "../componentes/MeasuresModal";
import Popup from "../componentes/Popup";
import Toast from "react-native-toast-message";

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

  const [timeFilter, setTimeFilter] = useState<
    "all" | "1y" | "6m" | "3m" | "1m"
  >("all");

  const screenWidth = Dimensions.get("window").width - 32;

  const [selectedMetric, setSelectedMetric] = useState<
    "weight" | "height" | "bodyFat" | "muscleMass" | "visceralFat"
  >("weight");

  const [showMeasuresModal, setShowMeasuresModal] = useState(false);

  const [showAthleteDropdown, setShowAthleteDropdown] = useState(false);

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
      const athletesData: Athlete[] = (fetched as FetchedAthlete[]).map(
        (a) => ({
          id: a._id,
          name: a.name,
        })
      );

      setAthletes(athletesData);
      if (athletesData.length > 0) {
        setSelectedAthleteId(user._id);
      }
    } catch (err) {
      console.error("Erro ao ir buscar os meus atletas:", err);
    }
  };

  const fetchMeasures = async () => {
    try {
      if (!selectedAthleteId) return;

      let athleteMeasures = await measuresService.getAtualByUser(
        selectedAthleteId
      );
      if (athleteMeasures === null) {
        athleteMeasures = emptyMeasures;
      }

      let athleteGoalMeasures = await measuresService.getGoalByUser(
        selectedAthleteId
      );
      if (athleteGoalMeasures === null) {
        athleteGoalMeasures = emptyMeasures;
      }

      let athleteLastMeasures = await measuresService.getLastByUser(
        selectedAthleteId
      );
      if (athleteLastMeasures === null) {
        athleteLastMeasures = emptyMeasures;
      }

      const historyMeasures = await measuresService.getByUser(
        selectedAthleteId
      );

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
      setSelectedAthleteId(user?._id);
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
    const iconColor =
      measurement.color === "green"
        ? "#22c55e"
        : measurement.color === "red"
        ? "#ef4444"
        : "#6b7280";

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
    if (!historyDates || historyDates.length === 0) return [];

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
      case "1m":
        cutoff = new Date();
        cutoff.setMonth(now.getMonth() - 2);
        break;
      default:
        cutoff = null;
    }

    const filtered = cutoff
      ? historyDates.filter((m) => new Date(m.date) >= cutoff)
      : historyDates;

    return filtered;
  };

  const filteredHistory = filterHistory();

  const historyDatesSorted = [...filteredHistory].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Verificar se há dados válidos para a métrica selecionada
  const hasValidData = historyDatesSorted.some((m) => {
    const value = m[selectedMetric];
    return typeof value === "number" && isFinite(value) && value > 0;
  });

  const labels = historyDatesSorted.map((m) =>
    new Date(m.date).toLocaleDateString("pt-PT", {
      month: "short",
      day: "numeric",
    })
  );

  // Reduzir labels para evitar sobreposição
  const step = Math.max(1, Math.ceil(labels.length / 6));
  const reducedLabels = labels.map((l, i) => (i % step === 0 ? l : ""));

  const chartData = {
    labels: reducedLabels,
    datasets: [
      {
        data: historyDatesSorted.map((m) => {
          const value = m[selectedMetric];
          return typeof value === "number" && isFinite(value) && value > 0
            ? value
            : 0;
        }),
        color: () => "#2563eb",
        strokeWidth: 3,
      },
    ],
  };

  const handleSaveMeasures = async (data: Measures) => {
    try {
      data.user = selectedAthleteId;

      let res;
      if (
        data.type == "goal" &&
        selectedAthleteData.goalMeasurement._id != null
      ) {
        res = await measuresService.update(
          selectedAthleteData.goalMeasurement._id,
          data
        );
      } else {
        res = await measuresService.create(data);
      }

      if (res && res._id) {
        Toast.hide();
        Toast.show({
          topOffset: 10,
          type: "success",
          text2: "Alteração guardada com sucesso!",
          position: "top",
          visibilityTime: 2500,
          autoHide: true,
        });
      }

      fetchMeasures();
      setShowMeasuresModal(false);
    } catch {
      Toast.hide();
      Toast.show({
        topOffset: 10,
        type: "error",
        text2: "Ocorreu um erro ao guardar as medidas.",
        position: "top",
        visibilityTime: 2500,
        autoHide: true,
      });
    }
  };

  const handleDeleteLatest = async (id: string) => {
    try {
      const res = await measuresService.delete(id);

      if (res && (res === 200 || res === 201)) {
        Toast.hide();
        Toast.show({
          topOffset: 10,
          type: "success",
          text2: "Registo eliminado com sucesso!",
          position: "top",
          visibilityTime: 2500,
          autoHide: true,
        });
      }

      fetchMeasures();
    } catch {
      Toast.hide();
      Toast.show({
        topOffset: 10,
        type: "error",
        text2: "Não foi possível eliminar o registo.",
        position: "top",
        visibilityTime: 2500,
        autoHide: true,
      });

      fetchMeasures();
    }
  };

  const confirmDelete = (id: string) => {
    setPopup({
      visible: true,
      type: "confirm",
      title: "Confirmar eliminação",
      message:
        "Tens a certeza que queres eliminar este registo? Esta ação é permanente e não pode ser desfeita.",
      onConfirm: () => {
        handleDeleteLatest(id);
        setPopup((p) => ({ ...p, visible: false }));
      },
    });
  };

  // Função para obter o texto do filtro de tempo
  const getTimeFilterText = (filter: string) => {
    switch (filter) {
      case "all":
        return "Desde sempre";
      case "1y":
        return "1 ano";
      case "6m":
        return "6 meses";
      case "3m":
        return "3 meses";
      case "1m":
        return "1 mês";
      default:
        return "Desde sempre";
    }
  };

  // Função para obter o texto da métrica
  const getMetricText = (metric: string) => {
    switch (metric) {
      case "weight":
        return "Peso";
      case "height":
        return "Altura";
      case "bodyFat":
        return "Gordura corporal";
      case "muscleMass":
        return "Massa muscular";
      case "visceralFat":
        return "Gordura visceral";
      default:
        return "Peso";
    }
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Medidas</Text>
          <TouchableOpacity onPress={async () => await fetchMeasures()}>
            <Ionicons name="refresh-circle-outline" size={40} color="#1e293b" />
          </TouchableOpacity>
        </View>

        {/* Filtro Row */}
        {isPT && (
          <View style={styles.filterRow}>
            <View style={styles.dropdownSection}>
              <TouchableOpacity
                style={styles.dropdownButton}
                onPress={() => setShowAthleteDropdown(!showAthleteDropdown)}
              >
                <Text style={styles.dropdownButtonText}>
                  {selectedAthleteId
                    ? athletes.find((a) => a.id === selectedAthleteId)?.name
                    : "Escolher atleta..."}
                </Text>
                <Text style={styles.dropdownArrow}>
                  {showAthleteDropdown ? "▲" : "▼"}
                </Text>
              </TouchableOpacity>
            </View>
            {isPT && showAthleteDropdown && (
              <View style={{ ...styles.dropdownOverlay }}>
                <View style={styles.dropdownListContainer}>
                  <ScrollView
                    nestedScrollEnabled={true}
                    contentContainerStyle={{ flexGrow: 1 }}
                  >
                    {athletes.map((athlete) => (
                      <TouchableOpacity
                        key={athlete.id}
                        style={[
                          styles.dropdownItem,
                          selectedAthleteId === athlete.id &&
                            styles.dropdownItemSelected,
                        ]}
                        onPress={() => {
                          setSelectedAthleteId(athlete.id);
                          setShowAthleteDropdown(false);
                        }}
                      >
                        <Text
                          style={[
                            styles.dropdownItemText,
                            selectedAthleteId === athlete.id &&
                              styles.dropdownItemTextSelected,
                          ]}
                        >
                          {athlete.name}
                        </Text>
                        {selectedAthleteId === athlete.id && (
                          <Text style={styles.checkmark}>✓</Text>
                        )}
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </View>
            )}

            {/* Botão de adicionar */}
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => setShowMeasuresModal(true)}
            >
              <Ionicons name="add" size={24} color="#ffffff" />
            </TouchableOpacity>

            <MeasuresModal
              visible={showMeasuresModal}
              athleteName={
                athletes.find((a) => a.id === selectedAthleteId)?.name ||
                "Atleta"
              }
              onClose={() => setShowMeasuresModal(false)}
              onSave={handleSaveMeasures}
            />
          </View>
        )}

        {/* Medidas atuais */}
        <View style={styles.currentMeasurements}>
          {formattedMeasurements.map((m, idx) => (
            <View key={idx} style={styles.measureItem}>
              <Text style={styles.measureLabel}>{m.label}</Text>
              <View style={styles.measureValueContainer}>
                {m.label === "Altura" ? (
                  <Text style={styles.measureValue}>{m.current} cm</Text>
                ) : m.label === "Peso" ? (
                  <Text style={styles.measureValue}>{m.current} Kg</Text>
                ) : m.label === "Gordura visceral" ? (
                  <Text style={styles.measureValue}>{m.current}</Text>
                ) : (
                  <Text style={styles.measureValue}>{m.current} %</Text>
                )}

                {renderIcon(m)}

                {m.delta !== 0 && !m.reachedGoal && (
                  <Text
                    style={[
                      styles.deltaText,
                      {
                        color:
                          m.color === "green"
                            ? "#22c55e"
                            : m.color === "red"
                            ? "#ef4444"
                            : "#6b7280",
                      },
                    ]}
                  >
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
          {!historyDates || historyDates.length === 0 ? (
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
                  style={styles.historyItem}
                >
                  <View style={styles.historyActionContainer}>
                    <Text style={styles.historyDate}>
                      {new Date(m.date).toLocaleDateString("pt-PT")}
                    </Text>

                    {latest && m._id === latest._id && isDeletable(m.date) && (
                      <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() => confirmDelete(m._id)}
                      >
                        <Ionicons
                          name="trash-outline"
                          size={22}
                          color="#ef4444"
                        />
                      </TouchableOpacity>
                    )}
                  </View>

                  {expandedHistory === m._id && (
                    <View style={styles.expandedHistoryContainer}>
                      <View style={styles.historyDetailRow}>
                        <Text style={styles.historyDetailLabel}>Peso:</Text>
                        <Text style={styles.historyDetailValue}>
                          {m.weight ?? "-"} Kg
                        </Text>
                      </View>
                      <View style={styles.historyDetailRow}>
                        <Text style={styles.historyDetailLabel}>Altura:</Text>
                        <Text style={styles.historyDetailValue}>
                          {m.height ?? "-"} cm
                        </Text>
                      </View>
                      <View style={styles.historyDetailRow}>
                        <Text style={styles.historyDetailLabel}>
                          Gordura corporal:
                        </Text>
                        <Text style={styles.historyDetailValue}>
                          {m.bodyFat ?? "-"} %
                        </Text>
                      </View>
                      <View style={styles.historyDetailRow}>
                        <Text style={styles.historyDetailLabel}>
                          Massa muscular:
                        </Text>
                        <Text style={styles.historyDetailValue}>
                          {m.muscleMass ?? "-"} %
                        </Text>
                      </View>
                      <View style={styles.historyDetailRow}>
                        <Text style={styles.historyDetailLabel}>
                          Gordura visceral:
                        </Text>
                        <Text style={styles.historyDetailValue}>
                          {m.visceralFat ?? "-"}
                        </Text>
                      </View>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>

        {/* Gráficos */}
        <Text style={styles.subTitle}>Progresso</Text>

        {/* Chips de Filtros */}
        <View style={styles.chipsContainer}>
          <View style={styles.chipRow}>
            <Text style={styles.chipRowLabel}>Período:</Text>
            <View style={styles.chipGrid}>
              {[
                { key: "all", label: "Desde sempre" },
                { key: "1y", label: "1 ano" },
                { key: "6m", label: "6 meses" },
                { key: "3m", label: "3 meses" },
                { key: "1m", label: "1 mês" },
              ].map((item) => (
                <TouchableOpacity
                  key={item.key}
                  style={[
                    styles.chip,
                    timeFilter === item.key && styles.chipActive,
                  ]}
                  onPress={() => setTimeFilter(item.key as any)}
                >
                  <Text
                    style={[
                      styles.chipText,
                      timeFilter === item.key && styles.chipTextActive,
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.chipRow}>
            <Text style={styles.chipRowLabel}>Métrica:</Text>
            <View style={styles.chipGrid}>
              {[
                { key: "weight", label: "Peso" },
                { key: "height", label: "Altura" },
                { key: "bodyFat", label: "Gordura corporal" },
                { key: "muscleMass", label: "Massa muscular" },
                { key: "visceralFat", label: "Gordura visceral" },
              ].map((item) => (
                <TouchableOpacity
                  key={item.key}
                  style={[
                    styles.chip,
                    selectedMetric === item.key && styles.chipActive,
                  ]}
                  onPress={() => setSelectedMetric(item.key as any)}
                >
                  <Text
                    style={[
                      styles.chipText,
                      selectedMetric === item.key && styles.chipTextActive,
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {!filteredHistory || filteredHistory.length === 0 ? (
          <View style={styles.emptyStateContainer}>
            <Text style={styles.emptyStateText}>
              Não existem registos de medidas para o período selecionado
            </Text>
          </View>
        ) : !hasValidData ? (
          <View style={styles.emptyStateContainer}>
            <Text style={styles.emptyStateText}>
              Não há dados disponíveis para a métrica &quot;
              {getMetricText(selectedMetric)}&quot; no período selecionado
            </Text>
          </View>
        ) : (
          <View style={styles.chartContainer}>
            <LineChart
              data={chartData}
              width={screenWidth - 32}
              height={220}
              chartConfig={{
                backgroundColor: "#fff",
                backgroundGradientFrom: "#fff",
                backgroundGradientTo: "#fff",
                decimalPlaces: selectedMetric === "height" ? 0 : 1,
                color: (opacity = 1) => `rgba(37, 99, 235, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
                style: { borderRadius: 16 },
                propsForDots: {
                  r: "4",
                  strokeWidth: "2",
                  stroke: "#2563eb",
                },
              }}
              style={{ borderRadius: 16 }}
              bezier
              withDots
              withInnerLines={true}
              withOuterLines={true}
              withVerticalLines={true}
              withHorizontalLines={true}
            />
            <View style={styles.chartInfo}>
              <Text style={styles.chartInfoText}>
                {getMetricText(selectedMetric)} •{" "}
                {getTimeFilterText(timeFilter)}
              </Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* POPUP */}
      <Popup
        visible={popup.visible}
        type={popup.type as any}
        title={popup.title}
        message={popup.message}
        onConfirm={popup.onConfirm}
        onCancel={() => setPopup((p) => ({ ...p, visible: false }))}
        onClose={() => setPopup((p) => ({ ...p, visible: false }))}
      />
    </>
  );
}
