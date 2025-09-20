 // ExerciseScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles/ExerciseScreen.styles';
import { useAuth } from '../context/AuthContext';
import { User } from '../models/User';
import { userService } from '../services/usersService';
import { Weights, Exercise } from "../models/Exercise";
import { exerciseService } from '../services/exerciseService';

interface LocalMuscleGroup {
  key: string;
  label: string;
}

export default function ExerciseScreen() {
  const { user } = useAuth();
  const [expandedMuscleGroup, setExpandedMuscleGroup] = useState<string | null>(null);
  const [exercisesByGroup, setExercisesByGroup] = useState<Record<string, Exercise[]>>({});
  const [editingExerciseId, setEditingExerciseId] = useState<string | null>(null);
  const [showAthleteDropdown, setShowAthleteDropdown] = useState(false);
  const [selectedAthleteId, setSelectedAthleteId] = useState<string | null>(null);
  const [mineAthletes, setMineAthletes] = useState<User[]>([]);
  const isPT = user?.role === "PT" || user?.role === "Admin";
  const [userWeights, setUserWeights] = useState<Weights | null>(null);

  const muscleGroups: LocalMuscleGroup[] = [
    { key: "chest", label: "Peito"},
    { key: "back", label: "Costas"},
    { key: "shoulders", label: "Ombros"},
    { key: "biceps", label: "Bíceps"},
    { key: "triceps", label: "Tríceps"},
    { key: "legs", label: "Pernas"},
    { key: "abs", label: "Abdominais"},
    { key: "cardio", label: "Cardio"},
    { key: "extra", label: "Extra"},
  ];
  
  useEffect(() => {
    const fetchAthletes = async () => {
      if (user.role !== 'atleta') {
        // Carregar os atletas do treinador
        const userData = await userService.getById(user.id);
        let athletes: User[] = [];
        athletes = await userService.getMyAthletes(user.id);
        athletes.unshift(userData); // Adiciona o treinador no topo
        setMineAthletes(athletes);
        setSelectedAthleteId(user.id);
      } else {
        setSelectedAthleteId(user.id);
      }
    };
    fetchAthletes();
  }, []);

  useEffect(() => {
    if (selectedAthleteId) {
      fetchUserWeights(selectedAthleteId);
    }
    else if (user.id) {
      fetchUserWeights(user.id);
    }
  }, [selectedAthleteId]);

  const fetchUserWeights = async (athleteId: string) => {
    try {
      const weights = await exerciseService.getByUser(athleteId);

      // inicializa exercisesByGroup com os dados vindos da API
      const initialExercises: Record<string, Exercise[]> = {};
      muscleGroups.forEach(group => {
        initialExercises[group.key] = weights?.[group.key]?.exercises || [];
      });

      setUserWeights(weights);
      setExercisesByGroup(initialExercises);
      console.log("Fetched weights:", weights);
      console.log("Exercises by group:", initialExercises);
    } catch (error) {
      console.error("Error fetching user weights:", error);
    }
  };

  const toggleExpand = (groupKey: string) => {
    if (expandedMuscleGroup === groupKey) {
      setExpandedMuscleGroup(null);
    } else {
      setExpandedMuscleGroup(groupKey);
      if (!exercisesByGroup[groupKey]) {
        const loadedExercises = userWeights?.[groupKey]?.exercises || [];
        setExercisesByGroup(prev => ({
          ...prev,
          [groupKey]: loadedExercises
        }));
      }
  }
      setEditingExerciseId(null);
  };

  const addExercise = (groupKey: string) => {
      const newExercise: Exercise = {
      _id: "temp-" + Math.random().toString(36),
      athleteId: selectedAthleteId || user?.id || "",
      group: groupKey,
      name: "",
      weight: 0,
      reps: 0,
      sets: 0,
      details: "",
    };
    
    setExercisesByGroup(prev => ({
      ...prev,
      [groupKey]: [...(prev[groupKey] || []), newExercise]
    }));
    
    setEditingExerciseId(newExercise._id);
  };

  const removeExercise = (groupKey: string, exerciseId: string) => {
    setExercisesByGroup(prev => ({
      ...prev,
      [groupKey]: prev[groupKey]?.filter(ex => ex._id !== exerciseId) || []
    }));
  };

  const updateExercise = (groupKey: string, exerciseId: string, field: keyof Exercise, value: string | number) => {
    setExercisesByGroup(prev => ({
      ...prev,
      [groupKey]: prev[groupKey]?.map(ex => 
        ex._id === exerciseId ? { ...ex, [field]: value } : ex
      ) || []
    }));
  };

  const handleSaveExercises = async () => {
    if (!userWeights || !selectedAthleteId || !editingExerciseId) return;

    const group = expandedMuscleGroup!;
    const exercise = exercisesByGroup[group].find(ex => ex._id === editingExerciseId);
    if (!exercise) return;

    try {
      if (exercise._id.startsWith("temp-")) {
        console.log("Creating exercise:", exercise);
        const res = await exerciseService.create(exercise);
      } else {
        const payload = {
          _id: exercise._id,
          athleteId: selectedAthleteId,
          group: group,
          exerciseName: exercise.name,
          newWeight: exercise.weight,
          reps: exercise.reps,
          sets: exercise.sets,
          details: exercise.details || "",
        };

        await exerciseService.update(exercise._id, payload);
        fetchUserWeights(selectedAthleteId);
      }
    } catch (error) {
      console.error("Error saving exercise:", error);
    }
    setEditingExerciseId(null);
  };

  const clearExercise = (groupKey: string) => {
    if (editingExerciseId) {
      // If the exercise being edited is new (no name), remove it
      setExercisesByGroup(prev => ({
        ...prev,
        [groupKey]: prev[groupKey]?.filter(ex => ex._id !== editingExerciseId) || []
      }));
    }
    setEditingExerciseId(null);
  };

  return (
  <View style={styles.container}>
    {/* Se for Admin ou PT, mostrar dropdown de atletas */}
    {isPT && (
      <View style={styles.dropdownSection}>
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => setShowAthleteDropdown(!showAthleteDropdown)}
        >
          <Text style={styles.dropdownButtonText}>
            {selectedAthleteId 
              ? mineAthletes.find(a => a._id === selectedAthleteId)?.name 
              : 'Escolher atleta...'
            }
          </Text>
          <Text style={styles.dropdownArrow}>
            {showAthleteDropdown ? '▲' : '▼'}
          </Text>
        </TouchableOpacity>
        
        {showAthleteDropdown && (
          <View style={styles.dropdownList}>
            <ScrollView nestedScrollEnabled={true}>
            {mineAthletes.map((athlete) => (
              <TouchableOpacity
                key={athlete._id}
                style={[
                  styles.dropdownItem,
                  selectedAthleteId === athlete._id && styles.dropdownItemSelected
                ]}
                onPress={() => {
                  setSelectedAthleteId(athlete._id);
                  setShowAthleteDropdown(false);
                }}
              >
                <Text style={[
                  styles.dropdownItemText,
                  selectedAthleteId === athlete._id && styles.dropdownItemTextSelected
                ]}>
                  {athlete.name}
                </Text>
                {selectedAthleteId === athlete._id && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </TouchableOpacity>
            ))}
            </ScrollView>
          </View>
        )}
      </View>
    )}
    
    <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
      {muscleGroups.map((group) => (
        <View key={group.key} style={styles.muscleGroupContainer}>
          <TouchableOpacity
            style={[
              styles.muscleGroupHeader,
              expandedMuscleGroup === group.key && styles.muscleGroupHeaderExpanded,
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
                    {editingExerciseId === exercise._id ? (
                      // EDIT MODE - Diferente para grupo "extra"
                      group.key === 'extra' ? (
                        // EDIT MODE para grupo EXTRA (só name e details)
                        <View style={styles.editExerciseContainer}>
                          <View style={styles.editRow}>
                            <Text style={styles.editLabel}>Nome:</Text>
                            <TextInput
                              style={styles.editInput}
                              value={exercise?.name || ''}
                              onChangeText={(value) => updateExercise(group.key, exercise?._id, 'name', value)}
                            />
                          </View>

                          <View style={styles.editRow}>
                            <Text style={styles.editLabel}>Detalhes:</Text>
                            <TextInput
                              style={[styles.editInput, styles.textArea]}
                              value={exercise?.details || ''}
                              onChangeText={(value) => updateExercise(group.key, exercise?._id, 'details', value)}
                              multiline={true}
                              numberOfLines={3}
                            />
                          </View>

                          <View style={styles.editButtonContainer}>
                            <TouchableOpacity
                              style={styles.cancelEditButton}
                              onPress={() => clearExercise(group.key)}
                            >
                              <Text style={styles.cancelEditButtonText}>Cancelar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                              style={styles.saveEditButton}
                              onPress={() => handleSaveExercises()}
                            >
                              <Text style={styles.saveEditButtonText}>Guardar</Text>
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
                              value={exercise?.name || ''}
                              onChangeText={(value) => updateExercise(group.key, exercise?._id, 'name', value)}
                            />
                          </View>

                          <View style={styles.editRowGroup}>
                            {group.key === 'cardio' ? (
                              <View style={styles.editRowItem}>
                                <Text style={styles.editLabel}>Tempo:</Text>
                                <TextInput
                                  style={styles.editInputSmall}
                                  value={exercise?.weight?.toString() || ''}
                                  onChangeText={(value) => updateExercise(group.key, exercise?._id, 'weight', parseFloat(value) || 0)}
                                  keyboardType="decimal-pad"
                                />
                              </View>
                            ) : (
                              <View style={styles.editRowItem}>
                                <Text style={styles.editLabel}>Peso (kg):</Text>
                                <TextInput
                                  style={styles.editInputSmall}
                                  value={exercise?.weight?.toString() || ''}
                                  onChangeText={(value) => updateExercise(group.key, exercise._id, 'weight', parseFloat(value) || 0)}
                                  keyboardType="decimal-pad"
                                />
                              </View>
                            )}

                            <View style={styles.editRowItem}>
                              <Text style={styles.editLabel}>Reps:</Text>
                              <TextInput
                                style={styles.editInputSmall}
                                value={exercise.reps?.toString() || ''}
                                onChangeText={(value) => updateExercise(group.key, exercise._id, 'reps', parseFloat(value) || 0)}
                                keyboardType="decimal-pad"
                              />
                            </View>

                            <View style={styles.editRowItem}>
                              <Text style={styles.editLabel}>Séries:</Text>
                              <TextInput
                                style={styles.editInputSmall}
                                value={exercise.sets?.toString() || ''}
                                onChangeText={(value) => updateExercise(group.key, exercise._id, 'sets', parseFloat(value) || 0)}
                                keyboardType="decimal-pad"
                              />
                            </View>
                          </View>

                          <View style={styles.editButtonContainer}>
                            <TouchableOpacity
                              style={styles.cancelEditButton}
                              onPress={() => clearExercise(group.key)}
                            >
                              <Text style={styles.cancelEditButtonText}>Cancelar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                              style={styles.saveEditButton}
                              onPress={() => handleSaveExercises()}
                            >
                              <Text style={styles.saveEditButtonText}>Guardar</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      )
                    ) : (
                      // VIEW MODE - Diferente para grupo "extra"
                      group.key === 'extra' ? (
                        // VIEW MODE para grupo EXTRA
                        <View style={styles.exerciseInfo}>
                          <View style={styles.exerciseDetails}>
                            <Text style={styles.exerciseName}>{exercise.name}</Text>
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
                                onPress={() => setEditingExerciseId(exercise._id)}
                              >
                                <Ionicons name="create-outline" size={18} color="#2563eb" />
                              </TouchableOpacity>

                              <TouchableOpacity
                                style={styles.deleteButton}
                                onPress={() => removeExercise(group.key, exercise._id)}
                              >
                                <Ionicons name="trash-outline" size={18} color="#dc2626" />
                              </TouchableOpacity>
                            </View>
                          )}
                        </View>
                      ) : (
                        // VIEW MODE para outros grupos
                        <View style={styles.exerciseInfo}>
                          <View style={styles.exerciseDetails}>
                            <Text style={styles.exerciseName}>{exercise.name}</Text>
                            <Text style={styles.exerciseStats}>
                              {group.key === 'cardio'
                                ? `${exercise.weight} min` 
                                : `${exercise.weight}kg`} • {exercise.reps} reps • {exercise.sets} séries
                            </Text>
                          </View>

                          {isPT && (
                            <View style={styles.exerciseActions}>
                              <TouchableOpacity
                                style={styles.editButton}
                                onPress={() => setEditingExerciseId(exercise._id)}
                              >
                                <Ionicons name="create-outline" size={18} color="#2563eb" />
                              </TouchableOpacity>

                              <TouchableOpacity
                                style={styles.deleteButton}
                                onPress={() => removeExercise(group.key, exercise._id)}
                              >
                                <Ionicons name="trash-outline" size={18} color="#dc2626" />
                              </TouchableOpacity>
                            </View>
                          )}
                        </View>
                      )
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
                    <Text style={styles.addExerciseButtonText}>Adicionar Exercício</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  </View>
);
}