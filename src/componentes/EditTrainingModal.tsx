import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import { Calendar } from "react-native-calendars";

// Tipos
interface Athlete {
  _id: string;
  name: string;
}

interface Training {
  _id: string;
  date: string;
  time: string;
  details?: string;
  athlete?: Athlete;
}

interface EditTrainingModalProps {
  visible: boolean;
  onClose: () => void;
  training: Training | null;
  onSave: (training: Training) => void;
  morningSlots: string[];
  afternoonSlots: string[];
  user?: {
    role: string;
  };
  mineAthletes?: Athlete[];
}

const EditTrainingModal: React.FC<EditTrainingModalProps> = ({
  visible,
  onClose,
  training,
  onSave,
  morningSlots = [],
  afternoonSlots = [],
  user,
  mineAthletes = [],
}) => {
  const [editDate, setEditDate] = useState<string | null>(null);
  const [editHour, setEditHour] = useState<string | null>(null);
  const [editDetails, setEditDetails] = useState<string>("");
  const [selectedAthleteId, setSelectedAthleteId] = useState<string>("");
  const [showAthleteDropdown, setShowAthleteDropdown] =
    useState<boolean>(false);

  // Inicializar os estados quando o training muda
  useEffect(() => {
    if (training) {
      setEditDate(training.date);
      setEditHour(training.time);
      setEditDetails(training.details || "");
      setSelectedAthleteId(training.athlete?._id || "");
    }
  }, [training]);

  const handleSave = () => {
    if (!editDate || !editHour) {
      Alert.alert("Erro", "Por favor, selecione data e horário");
      return;
    }

    if ((user?.role === "Admin" || user?.role === "PT") && !selectedAthleteId) {
      Alert.alert("Erro", "Por favor, selecione um atleta");
      return;
    }

    const updatedTraining: Training = {
      ...training!,
      date: editDate,
      time: editHour,
      details: editDetails,
      ...((user?.role === "Admin" || user?.role === "PT") && {
        athlete: mineAthletes.find((a) => a._id === selectedAthleteId),
      }),
    };

    onSave(updatedTraining);
  };

  const handleClose = () => {
    // Resetar estados ao fechar
    if (training) {
      setEditDate(training.date);
      setEditHour(training.time);
      setEditDetails(training.details || "");
      setSelectedAthleteId(training.athlete?._id || "");
    }
    setShowAthleteDropdown(false);
    onClose();
  };

  const renderTimeSlot = (slot: string) => (
    <TouchableOpacity
      key={slot}
      style={[styles.timeSlot, editHour === slot && styles.timeSlotSelected]}
      onPress={() => setEditHour(slot)}
    >
      <Text
        style={[
          styles.timeSlotText,
          editHour === slot && styles.timeSlotTextSelected,
        ]}
      >
        {slot}
      </Text>
    </TouchableOpacity>
  );

  if (!training) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleClose}
    >
      <View style={styles.editFormContainer}>
        {/* Header */}
        <View style={styles.editFormHeader}>
          <Text style={styles.editFormTitle}>Editar Treino</Text>
          <TouchableOpacity onPress={handleClose}>
            <Text style={styles.closeButton}>✕</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.editFormContent}>
          {/* Calendário para selecionar nova data */}
          <Text style={styles.editFormLabel}>Nova Data</Text>
          <Calendar
            current={editDate || undefined}
            onDayPress={(day) => {
              setEditDate(day.dateString);
              setEditHour(null); // Resetar hora ao mudar data
            }}
            markedDates={
              editDate
                ? {
                    [editDate]: {
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

          {/* Horários disponíveis para a nova data selecionada */}
          {editDate && (
            <View style={styles.editHoursContainer}>
              <Text style={styles.editFormLabel}>Novo Horário</Text>

              {/* Horários da Manhã */}
              {morningSlots.length > 0 && (
                <View style={styles.timeSection}>
                  <Text style={styles.timeSectionHeader}>Manhã</Text>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.timeRow}
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

              {morningSlots.length === 0 && afternoonSlots.length === 0 && (
                <Text style={styles.noAvailabilityText}>
                  Nenhum horário disponível neste dia
                </Text>
              )}
            </View>
          )}

          {/* Se for Admin ou PT, mostrar dropdown de atletas */}
          {(user?.role === "Admin" || user?.role === "PT") && (
            <View style={styles.dropdownSection}>
              <Text style={styles.dropdownLabel}>Selecionar Atleta</Text>
              <TouchableOpacity
                style={styles.dropdownButton}
                onPress={() => setShowAthleteDropdown(!showAthleteDropdown)}
              >
                <Text style={styles.dropdownButtonText}>
                  {selectedAthleteId
                    ? mineAthletes.find((a) => a._id === selectedAthleteId)
                        ?.name
                    : "Escolher atleta..."}
                </Text>
                <Text style={styles.dropdownArrow}>
                  {showAthleteDropdown ? "▲" : "▼"}
                </Text>
              </TouchableOpacity>

              {showAthleteDropdown && (
                <View style={styles.dropdownOverlay}>
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
            </View>
          )}

          {/* Informações atuais (readonly) */}
          <View style={styles.currentInfoContainer}>
            <Text style={styles.currentInfoTitle}>Informações Atuais</Text>
            <View style={styles.currentInfoRow}>
              <Text style={styles.currentInfoLabel}>Data:</Text>
              <Text style={styles.currentInfoValue}>
                {(new Date(training.date), "dd/MM/yyyy")}
              </Text>
            </View>
            <View style={styles.currentInfoRow}>
              <Text style={styles.currentInfoLabel}>Horário:</Text>
              <Text style={styles.currentInfoValue}>{training.time}</Text>
            </View>
            {training.athlete && (
              <View style={styles.currentInfoRow}>
                <Text style={styles.currentInfoLabel}>Atleta:</Text>
                <Text style={styles.currentInfoValue}>
                  {training.athlete.name}
                </Text>
              </View>
            )}
            {training.details && (
              <View style={styles.currentInfoRow}>
                <Text style={styles.currentInfoLabel}>Detalhes:</Text>
                <Text style={styles.currentInfoValue}>{training.details}</Text>
              </View>
            )}
          </View>

          {/* Campo de detalhes do treino */}
          <Text style={styles.editFormLabel}>
            Detalhes do Treino (opcional)
          </Text>
          <TextInput
            style={styles.detailsInput}
            placeholder="Plano de treino, objetivos, etc."
            multiline
            numberOfLines={4}
            value={editDetails}
            onChangeText={setEditDetails}
          />

          {/* Botões de ação */}
          <View style={styles.editFormActions}>
            <TouchableOpacity
              style={[styles.actionButton, styles.cancelButton]}
              onPress={handleClose}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.actionButton,
                (!editDate ||
                  !editHour ||
                  ((user?.role === "Admin" || user?.role === "PT") &&
                    !selectedAthleteId)) && { opacity: 0.5 },
              ]}
              onPress={handleSave}
              disabled={
                !editDate ||
                !editHour ||
                ((user?.role === "Admin" || user?.role === "PT") &&
                  !selectedAthleteId)
              }
            >
              <Text style={styles.actionButtonText}>Salvar Alterações</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  editFormContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  editFormHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  editFormTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1e293b",
  },
  closeButton: {
    fontSize: 20,
    color: "#64748b",
    padding: 4,
  },
  editFormContent: {
    flex: 1,
    padding: 16,
  },
  editFormLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 8,
    marginTop: 16,
  },
  calendar: {
    marginBottom: 8,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  editHoursContainer: {
    marginTop: 8,
  },
  timeSection: {
    marginBottom: 16,
  },
  timeSectionHeader: {
    fontSize: 14,
    fontWeight: "600",
    color: "#64748b",
    marginBottom: 8,
  },
  timeRow: {
    flexDirection: "row",
  },
  timeSlot: {
    backgroundColor: "#f8fafc",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  timeSlotSelected: {
    backgroundColor: "#2563eb",
    borderColor: "#2563eb",
  },
  timeSlotText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#64748b",
  },
  timeSlotTextSelected: {
    color: "#ffffff",
  },
  dropdownSection: {
    marginTop: 16,
  },
  dropdownLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 8,
  },
  dropdownButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f8fafc",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  dropdownButtonText: {
    fontSize: 14,
    color: "#1e293b",
  },
  dropdownArrow: {
    fontSize: 12,
    color: "#64748b",
  },
  dropdownOverlay: {
    position: "relative",
    marginTop: 4,
  },
  dropdownListContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    maxHeight: 200,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dropdownItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  dropdownItemSelected: {
    backgroundColor: "#f0f9ff",
  },
  dropdownItemText: {
    fontSize: 14,
    color: "#1e293b",
  },
  dropdownItemTextSelected: {
    color: "#2563eb",
    fontWeight: "500",
  },
  checkmark: {
    color: "#2563eb",
    fontWeight: "bold",
  },
  currentInfoContainer: {
    backgroundColor: "#f8fafc",
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
    marginBottom: 16,
  },
  currentInfoTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 12,
  },
  currentInfoRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  currentInfoLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#64748b",
    width: 80,
  },
  currentInfoValue: {
    fontSize: 14,
    color: "#1e293b",
    flex: 1,
  },
  detailsInput: {
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    textAlignVertical: "top",
    minHeight: 100,
    backgroundColor: "#f8fafc",
  },
  editFormActions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 24,
    marginBottom: 32,
  },
  actionButton: {
    flex: 1,
    backgroundColor: "#2563eb",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#f1f5f9",
  },
  cancelButtonText: {
    color: "#64748b",
    fontWeight: "600",
    fontSize: 14,
  },
  actionButtonText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 14,
  },
  noAvailabilityText: {
    textAlign: "center",
    color: "#64748b",
    fontStyle: "italic",
    marginVertical: 16,
  },
});

export default EditTrainingModal;
