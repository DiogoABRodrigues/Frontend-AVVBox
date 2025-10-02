/* eslint-disable @typescript-eslint/no-explicit-any */
// ExerciseScreen.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles/ExerciseScreen.styles";
import { useAuth } from "../context/AuthContext";
import { User } from "../models/User";
import { userService } from "../services/usersService";
import { Weights, Exercise } from "../models/Exercise";
import { exerciseService } from "../services/exerciseService";
import Popup from "../componentes/Popup";
import Toast from "react-native-toast-message";

interface LocalMuscleGroup {
  key: string;
  label: string;
}

export default function ExerciseScreen() {
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
  const [expandedMuscleGroup, setExpandedMuscleGroup] = useState<string | null>(
    null
  );
  const [exercisesByGroup, setExercisesByGroup] = useState<
    Record<string, Exercise[]>
  >({});
  const [editingExercise, setEditingExercise] = useState<Exercise | null>(null);
  const [showAthleteDropdown, setShowAthleteDropdown] = useState(false);
  const [selectedAthleteId, setSelectedAthleteId] = useState<string | null>(
    null
  );
  const [mineAthletes, setMineAthletes] = useState<User[]>([]);
  const isPT = user?.role === "PT" || user?.role === "Admin";
  const [userWeights, setUserWeights] = useState<Weights | null>(null);
  const [inputValues, setInputValues] = useState<Record<string, string>>({});

  const [popup, setPopup] = useState({
    visible: false,
    type: "success" as "success" | "error" | "confirm",
    title: "",
    message: "",
    onConfirm: undefined as (() => void) | undefined,
  });

  const muscleGroups: LocalMuscleGroup[] = [
    { key: "chest", label: "Peito" },
    { key: "back", label: "Costas" },
    { key: "shoulders", label: "Ombros" },
    { key: "biceps", label: "Bíceps" },
    { key: "triceps", label: "Tríceps" },
    { key: "legs", label: "Pernas" },
    { key: "abs", label: "Abdominais" },
    { key: "cardio", label: "Cardio" },
    { key: "extra", label: "Extra" },
  ];

  useEffect(() => {
    const fetchAthletes = async () => {
      if (user.role !== "atleta") {
        // Carregar os atletas do treinador
        let athletes: User[] = [];
        athletes = await userService.getMyAthletes(user._id);
        athletes.unshift(user); // Adiciona o treinador no topo
        setMineAthletes(athletes);
        setSelectedAthleteId(user._id);
      } else {
        setSelectedAthleteId(user._id);
      }
    };
    fetchAthletes();
  }, []);

  useEffect(() => {
    if (selectedAthleteId) {
      fetchUserWeights(selectedAthleteId);
    } else if (user._id) {
      fetchUserWeights(user._id);
    }
  }, [selectedAthleteId]);

  const fetchUserWeights = async (athleteId: string) => {
    try {
      const weights = await exerciseService.getByUser(athleteId);

      // inicializa exercisesByGroup com os dados vindos da API
      const initialExercises: Record<string, Exercise[]> = {};
      muscleGroups.forEach((group) => {
        initialExercises[group.key] = weights?.[group.key]?.exercises || [];
      });

      setUserWeights(weights);
      setExercisesByGroup(initialExercises);
    } catch (error) {
      console.error("Error fetching user weights:", error);
    }
  };

  const toggleExpand = (groupKey: string) => {
    if (expandedMuscleGroup === groupKey) {
      setExpandedMuscleGroup(null);
    } else {
      // Antes de expandir outro grupo, limpar exercícios temporários do grupo atual
      if (expandedMuscleGroup) {
        setExercisesByGroup((prev) => ({
          ...prev,
          [expandedMuscleGroup]:
            prev[expandedMuscleGroup]?.filter(
              (ex) => !ex._id.startsWith("temp-")
            ) || [],
        }));
      }
      setExpandedMuscleGroup(groupKey);
      if (!exercisesByGroup[groupKey]) {
        const loadedExercises = userWeights?.[groupKey]?.exercises || [];
        setExercisesByGroup((prev) => ({
          ...prev,
          [groupKey]: loadedExercises,
        }));
      }
    }
    setInputValues({});
    setEditingExercise(null);
  };

  const addExercise = (groupKey: string) => {
    setExercisesByGroup((prev) => ({
      ...prev,
      [expandedMuscleGroup]:
        prev[expandedMuscleGroup]?.filter(
          (ex) => !ex._id.startsWith("temp-")
        ) || [],
    }));

    const newExercise: Exercise = {
      _id: "temp-" + Math.random(),
      athleteId: selectedAthleteId || user?._id || "",
      group: groupKey,
      name: "",
      weight: 0,
      reps: 0,
      sets: 0,
      details: "",
    };

    setExercisesByGroup((prev) => ({
      ...prev,
      [groupKey]: [...(prev[groupKey] || []), newExercise],
    }));

    setEditingExercise(newExercise);
    // Clear the input value for this new exercise
    setInputValues((prev) => ({
      ...prev,
      [newExercise._id]: "",
    }));
  };

  const handleWeightInputChange = (exerciseId: string, value: string) => {
    // Allow empty string, numbers, and decimal points
    const cleanedValue = value.replace(/[^0-9.,]/g, "");
    setInputValues((prev) => ({
      ...prev,
      [exerciseId]: cleanedValue,
    }));
  };

  const confirmDelete = (groupKey: string, exercise: Exercise) => {
    setPopup({
      visible: true,
      type: "confirm",
      title: "Confirmar eliminação",
      message:
        "Tens a certeza que queres eliminar este exercício? Esta ação é permanente e não pode ser desfeita.",
      onConfirm: () => {
        removeExercise(groupKey, exercise);
        setPopup((p) => ({ ...p, visible: false }));
      },
    });
  };

  const removeExercise = (groupKey: string, exercise: Exercise) => {
    try {
      if (!exercise._id || exercise._id.startsWith("temp-")) {
        // Se for um exercício temporário (não salvo), apenas remove localmente
        setExercisesByGroup((prev) => ({
          ...prev,
          [exercise.group]:
            prev[exercise.group]?.filter((ex) => ex._id !== exercise._id) || [],
        }));
      } else {
        // Se for um exercício existente, chama a API para remover
        exerciseService.delete(exercise._id, {
          athleteId: selectedAthleteId,
          group: groupKey,
          _id: exercise._id,
        });
        // Depois de remover da API, atualiza localmente
        setExercisesByGroup((prev) => ({
          ...prev,
          [groupKey]:
            prev[groupKey]?.filter((ex) => ex._id !== exercise._id) || [],
        }));
      }
      setInputValues({});
      setEditingExercise(null);
      Toast.hide();
Toast.show({
 topOffset: 10,
 type: "success",
 text2: "Exercício removido com sucesso.",
 position: "top",
 visibilityTime: 2500,
 autoHide: true,
});

    } catch {
      Toast.hide();
      Toast.show({
      topOffset: 10,
      type: "error",
      text2: "Ocorreu um erro ao remover o exercício, tente novamente mais tarde.",
      position: "top",
      visibilityTime: 2500,
      autoHide: true,
      });

    }
  };

  const updateExercise = (
    groupKey: string,
    exerciseId: string,
    field: keyof Exercise,
    value: string | number
  ) => {
    setExercisesByGroup((prev) => ({
      ...prev,
      [groupKey]:
        prev[groupKey]?.map((ex) =>
          ex._id === exerciseId ? { ...ex, [field]: value } : ex
        ) || [],
    }));
  };

  const handleSaveExercises = async () => {
    if (!userWeights || !selectedAthleteId || !editingExercise) return;

    const group = expandedMuscleGroup!;
    const exercise = exercisesByGroup[group].find(
      (ex) => ex._id === editingExercise._id
    );
    if (!exercise) return;

    try {
      // Get the current input value or use the exercise weight as fallback
      const inputValue = inputValues[exercise._id];
      const numericWeight = parseFloat(inputValue.replace(",", ".")) || 0;

      updateExercise(exercise.group, exercise._id, "weight", numericWeight);

      if (exercise._id.startsWith("temp-")) {
        exercise.weight = numericWeight; // Ensure weight is set correctly
        await exerciseService.create(exercise);
      } else {
        const payload = {
          _id: exercise._id,
          athleteId: selectedAthleteId,
          group: group,
          exerciseName: exercise.name,
          newWeight: numericWeight, // Use the parsed numeric value
          reps: exercise.reps,
          sets: exercise.sets,
          details: exercise.details || "",
        };
        await exerciseService.update(exercise._id, payload);
        fetchUserWeights(selectedAthleteId);
      }
    } catch (error) {
      Toast.hide();
Toast.show({
 topOffset: 10,
 type: "error",
 text2: `Ocorreu um erro ao realizar a ação: ${
          error.response?.data?.message || error.message || error
        }`,
 position: "top",
 visibilityTime: 2500,
 autoHide: true,
});

    }

    // Clear the input value for this exercise
    setInputValues((prev) => ({
      ...prev,
      [exercise._id]: "",
    }));
    setEditingExercise(null);
    fetchUserWeights(selectedAthleteId);
  };

  const clearExercise = (groupKey: string) => {
    if (editingExercise && editingExercise._id.startsWith("temp-")) {
      setExercisesByGroup((prev) => ({
        ...prev,
        [groupKey]:
          prev[groupKey]?.filter((ex) => ex._id !== editingExercise._id) || [],
      }));
    }

    // Clear the input value
    /*if (editingExercise) {
      setInputValues((prev) => ({
        ...prev,
        [editingExercise._id]: "",
      }));
    }*/

    setEditingExercise(null);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Se for Admin ou PT, mostrar dropdown de atletas */}
        {isPT && (
          <View style={styles.dropdownSection}>
            <Text style={styles.dropdownLabel}>Selecionar Atleta</Text>
            <TouchableOpacity
              style={styles.dropdownButton}
              onPress={() => setShowAthleteDropdown(!showAthleteDropdown)}
            >
              <Text style={styles.dropdownButtonText}>
                {selectedAthleteId
                  ? mineAthletes.find((a) => a._id === selectedAthleteId)?.name
                  : "Escolher atleta..."}
              </Text>
              <Text style={styles.dropdownArrow}>
                {showAthleteDropdown ? "▲" : "▼"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {muscleGroups.map((group) => (
          <View key={group.key} style={styles.muscleGroupContainer}>
            <TouchableOpacity
              style={[
                styles.muscleGroupHeader,
                expandedMuscleGroup === group.key &&
                  styles.muscleGroupHeaderExpanded,
              ]}
              onPress={() => toggleExpand(group.key)}
            >
              <View style={styles.muscleGroupLeft}>
                <Text style={styles.muscleGroupText}>{group.label}</Text>
              </View>
              <View style={styles.muscleGroupRight}>
                <Text style={styles.exerciseCount}>
                  {exercisesByGroup[group.key]?.length || 0} exercícios
                </Text>
              </View>
            </TouchableOpacity>

            {expandedMuscleGroup === group.key && (
              <View style={styles.expandedContainer}>
                <View style={styles.exercisesContainer}>
                  {(exercisesByGroup[group.key] || []).map((exercise) => (
                    <View key={exercise._id} style={styles.exerciseItem}>
                      {editingExercise &&
                      editingExercise._id === exercise._id ? (
                        // EDIT MODE - Diferente para grupo "extra"
                        group.key === "extra" ? (
                          // EDIT MODE para grupo EXTRA (só name e details)
                          <View style={styles.editExerciseContainer}>
                            <View style={styles.editRow}>
                              <Text style={styles.editLabel}>Nome:</Text>
                              <TextInput
                                style={styles.editInput}
                                value={exercise?.name || ""}
                                onChangeText={(value) =>
                                  updateExercise(
                                    group.key,
                                    exercise?._id,
                                    "name",
                                    value
                                  )
                                }
                              />
                            </View>

                            <View style={styles.editRow}>
                              <Text style={styles.editLabel}>Detalhes:</Text>
                              <TextInput
                                style={[styles.editInput, styles.textArea]}
                                value={exercise?.details || ""}
                                onChangeText={(value) =>
                                  updateExercise(
                                    group.key,
                                    exercise?._id,
                                    "details",
                                    value
                                  )
                                }
                                multiline={true}
                                numberOfLines={3}
                              />
                            </View>

                            <View style={styles.editButtonContainer}>
                              <TouchableOpacity
                                style={styles.cancelEditButton}
                                onPress={() => clearExercise(group.key)}
                              >
                                <Text style={styles.cancelEditButtonText}>
                                  Cancelar
                                </Text>
                              </TouchableOpacity>

                              <TouchableOpacity
                                style={styles.saveEditButton}
                                onPress={() => handleSaveExercises()}
                              >
                                <Text style={styles.saveEditButtonText}>
                                  Guardar
                                </Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        ) : (
                          // EDIT MODE para outros grupos (com peso, reps, sets)
                          <View style={styles.editExerciseContainer}>
                            <View style={styles.editRow}>
                              <Text style={styles.editLabel}>Nome:</Text>
                              <TextInput
                                style={styles.editInput}
                                value={exercise?.name || ""}
                                onChangeText={(value) =>
                                  updateExercise(
                                    group.key,
                                    exercise?._id,
                                    "name",
                                    value
                                  )
                                }
                              />
                            </View>

                            <View style={styles.editRowGroup}>
                              {group.key === "cardio" ? (
                                <View style={styles.editRowItem}>
                                  <Text style={styles.editLabel}>Tempo:</Text>
                                  <TextInput
                                    style={styles.editInputSmall}
                                    value={
                                      inputValues[exercise._id] !== undefined
                                        ? inputValues[exercise._id]
                                        : exercise.weight.toString() || ""
                                    }
                                    onChangeText={(val) =>
                                      handleWeightInputChange(exercise._id, val)
                                    }
                                    keyboardType="decimal-pad"
                                  />
                                </View>
                              ) : (
                                <View style={styles.editRowItem}>
                                  <Text style={styles.editLabel}>
                                    Peso (kg):
                                  </Text>
                                  <TextInput
                                    style={styles.editInputSmall}
                                    value={
                                      inputValues[exercise._id] !== undefined
                                        ? inputValues[exercise.weight]
                                        : exercise.weight.toString() || ""
                                    }
                                    onChangeText={(val) =>
                                      handleWeightInputChange(exercise._id, val)
                                    }
                                    keyboardType="decimal-pad"
                                  />
                                </View>
                              )}

                              <View style={styles.editRowItem}>
                                <Text style={styles.editLabel}>Reps:</Text>
                                <TextInput
                                  style={styles.editInputSmall}
                                  value={exercise.reps?.toString() || ""}
                                  onChangeText={(value) =>
                                    updateExercise(
                                      group.key,
                                      exercise._id,
                                      "reps",
                                      parseFloat(value) || 0
                                    )
                                  }
                                  keyboardType="decimal-pad"
                                />
                              </View>

                              <View style={styles.editRowItem}>
                                <Text style={styles.editLabel}>Séries:</Text>
                                <TextInput
                                  style={styles.editInputSmall}
                                  value={exercise.sets?.toString() || ""}
                                  onChangeText={(value) =>
                                    updateExercise(
                                      group.key,
                                      exercise._id,
                                      "sets",
                                      parseFloat(value) || 0
                                    )
                                  }
                                  keyboardType="decimal-pad"
                                />
                              </View>
                            </View>

                            <View style={styles.editButtonContainer}>
                              <TouchableOpacity
                                style={styles.cancelEditButton}
                                onPress={() => clearExercise(group.key)}
                              >
                                <Text style={styles.cancelEditButtonText}>
                                  Cancelar
                                </Text>
                              </TouchableOpacity>

                              <TouchableOpacity
                                style={styles.saveEditButton}
                                onPress={() => handleSaveExercises()}
                              >
                                <Text style={styles.saveEditButtonText}>
                                  Guardar
                                </Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        )
                      ) : // VIEW MODE - Diferente para grupo "extra"
                      group.key === "extra" ? (
                        // VIEW MODE para grupo EXTRA
                        <View style={styles.exerciseInfo}>
                          <View style={styles.exerciseDetails}>
                            <Text style={styles.exerciseName}>
                              {exercise.name}
                            </Text>
                            {exercise.details && (
                              <Text style={styles.exerciseDetailsText}>
                                {exercise.details}
                              </Text>
                            )}
                          </View>

                          {isPT && (
                            <View style={styles.exerciseActions}>
                              <TouchableOpacity
                                style={styles.editButton}
                                onPress={() => setEditingExercise(exercise)}
                              >
                                <Ionicons
                                  name="create-outline"
                                  size={18}
                                  color="#2563eb"
                                />
                              </TouchableOpacity>

                              <TouchableOpacity
                                style={styles.deleteButton}
                                onPress={() =>
                                  confirmDelete(group.key, exercise)
                                }
                              >
                                <Ionicons
                                  name="trash-outline"
                                  size={18}
                                  color="#dc2626"
                                />
                              </TouchableOpacity>
                            </View>
                          )}
                        </View>
                      ) : (
                        // VIEW MODE para outros grupos
                        <View style={styles.exerciseInfo}>
                          <View style={styles.exerciseDetails}>
                            <Text style={styles.exerciseName}>
                              {exercise.name}
                            </Text>
                            <Text style={styles.exerciseStats}>
                              {group.key === "cardio"
                                ? `${exercise.weight} min`
                                : `${exercise.weight}kg`}{" "}
                              • {exercise.reps} reps • {exercise.sets} séries
                            </Text>
                          </View>

                          {isPT && (
                            <View style={styles.exerciseActions}>
                              <TouchableOpacity
                                style={styles.editButton}
                                onPress={() => setEditingExercise(exercise)}
                              >
                                <Ionicons
                                  name="create-outline"
                                  size={18}
                                  color="#2563eb"
                                />
                              </TouchableOpacity>

                              <TouchableOpacity
                                style={styles.deleteButton}
                                onPress={() =>
                                  confirmDelete(group.key, exercise)
                                }
                              >
                                <Ionicons
                                  name="trash-outline"
                                  size={18}
                                  color="#dc2626"
                                />
                              </TouchableOpacity>
                            </View>
                          )}
                        </View>
                      )}
                    </View>
                  ))}

                  {/* Add Exercise Button */}
                  {isPT && (
                    <TouchableOpacity
                      style={styles.addExerciseButton}
                      onPress={() => addExercise(group.key)}
                    >
                      <Ionicons name="add" size={20} color="#2563eb" />
                      <Text style={styles.addExerciseButtonText}>
                        Adicionar Exercício
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            )}
          </View>
        ))}
        <Popup
          visible={popup.visible}
          type={popup.type as any}
          title={popup.title}
          message={popup.message}
          onConfirm={popup.onConfirm}
          onCancel={() => setPopup((p) => ({ ...p, visible: false }))}
          onClose={() => setPopup((p) => ({ ...p, visible: false }))}
        />
      </ScrollView>

      {showAthleteDropdown && (
        <View style={styles.dropdownOverlay}>
          <View style={styles.dropdownListContainer}>
            <ScrollView
              nestedScrollEnabled={true}
              contentContainerStyle={{ flexGrow: 1 }}
            >
              {mineAthletes.map((athlete) => (
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
  );
}
