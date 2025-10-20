import React from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { styles } from "../componentes/styles/EditTrainingModal.styles";

interface TimeSlot {
  time: string;
  formattedTime: string;
}

interface EditTrainingModalProps {
  visible: boolean;
  editingDay: string | null;
  editingMorningSlots: TimeSlot[];
  editingAfternoonSlots: TimeSlot[];
  editingDetails: string | null;
  userRole: string;
  isDisabledEditing: boolean;
  setEditingDay: (day: string | null) => void;
  setEditingHour: (hour: string | null) => void;
  setEditingDetails: (details: string | null) => void;
  setEditingTraining: (val: unknown) => void;
  onClose: () => void;
  handleEditTraining: () => void;
  renderTimeSlotEditing: (slot: TimeSlot) => React.ReactNode;
}

export const EditTrainingModal: React.FC<EditTrainingModalProps> = ({
  visible,
  editingDay,
  editingMorningSlots,
  editingAfternoonSlots,
  editingDetails,
  userRole,
  isDisabledEditing,
  setEditingDay,
  setEditingHour,
  setEditingDetails,
  setEditingTraining,
  onClose,
  handleEditTraining,
  renderTimeSlotEditing,
}) => {
  return (
    <Modal visible={visible} transparent animationType="none">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <ScrollView>
            <Text style={styles.modalTitle}>Editar Treino</Text>

            {/* Calendar */}
            <Calendar
              id="editCalendar"
              onDayPress={(day) => {
                setEditingDay(day.dateString);
                setEditingHour(null);
              }}
              markedDates={{
                [editingDay || ""]: {
                  selected: true,
                  selectedColor: colors.blue,
                  selectedTextColor: colors.white,
                },
              }}
              theme={{
                todayTextColor: colors.blue,
                arrowColor: colors.blue,
              }}
              style={styles.calendar}
            />

            {/* Horários */}
            {editingMorningSlots.length > 0 && (
              <View style={styles.timeSection}>
                <Text style={styles.timeSectionHeader}>Manhã</Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  nestedScrollEnabled
                  style={styles.timeRow}
                  onStartShouldSetResponderCapture={() => true}
                >
                  {editingMorningSlots.map(renderTimeSlotEditing)}
                </ScrollView>
              </View>
            )}

            {editingAfternoonSlots.length > 0 && (
              <View style={styles.timeSection}>
                <Text style={styles.timeSectionHeader}>Tarde</Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.timeRow}
                >
                  {editingAfternoonSlots.map(renderTimeSlotEditing)}
                </ScrollView>
              </View>
            )}

            {editingDay &&
              editingMorningSlots.length === 0 &&
              editingAfternoonSlots.length === 0 && (
                <Text style={styles.noAvailabilityText}>
                  Nenhum horário disponível neste dia
                </Text>
              )}

            {/* Detalhes */}
            {(userRole === "Admin" || userRole === "PT") && (
              <View style={styles.dropdownSection}>
                <Text style={styles.detailsLabel}>
                  Detalhes do Treino (opcional)
                </Text>
                <TextInput
                  style={styles.detailsInput}
                  placeholder="Plano de treino, objetivos, etc."
                  placeholderTextColor={colors.greyMedium}
                  multiline
                  numberOfLines={5}
                  value={editingDetails || ""}
                  onChangeText={setEditingDetails}
                />
              </View>
            )}

            {/* Botões */}
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  setEditingTraining(null);
                  setEditingDay(null);
                  setEditingHour(null);
                  setEditingDetails(null);
                  onClose();
                }}
              >
                <Text>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  { elevation: 0 },
                  isDisabledEditing && { opacity: 0.5 },
                ]}
                onPress={handleEditTraining}
                disabled={isDisabledEditing}
              >
                <Text style={styles.actionButtonText}>Guardar Alterações</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};
