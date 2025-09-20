/* eslint-disable @typescript-eslint/no-explicit-any */
// ExerciseScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles/ExerciseScreen.styles';
import { useAuth } from '../context/AuthContext';
import { User } from '../models/User';
import { userService } from '../services/usersService';

interface ExerciseScreenProps {}

interface Exercise {
  id: string;
  name: string;
  weight: number;
  reps: number;
  sets: number;
}

interface MuscleGroup {
  key: string;
  label: string;
}

const ExerciseScreen: React.FC<ExerciseScreenProps> = () => {
  const { user } = useAuth();
  const [expandedMuscleGroup, setExpandedMuscleGroup] = useState<string | null>(null);
  const [exercisesByGroup, setExercisesByGroup] = useState<Record<string, Exercise[]>>({});
  const [editingExercise, setEditingExercise] = useState<string | null>(null);
  const [showAthleteDropdown, setShowAthleteDropdown] = useState(false);
  const [selectedAthleteId, setSelectedAthleteId] = useState<string | null>(null);
  const [mineAthletes, setMineAthletes] = useState<User[]>([]);
  const isPT = user?.role === "PT" || user?.role === "Admin";

  const muscleGroups: MuscleGroup[] = [
    { key: "chest", label: "Peito"},
    { key: "back", label: "Costas"},
    { key: "shoulders", label: "Ombros"},
    { key: "biceps", label: "Bíceps"},
    { key: "triceps", label: "Tríceps"},
    { key: "legs", label: "Pernas"},
    { key: "abs", label: "Abdominais"},
    { key: "cardio", label: "Cardio"}
  ];

  const toggleExpand = (groupKey: string) => {
    if (expandedMuscleGroup === groupKey) {
      setExpandedMuscleGroup(null);
    } else {
      setExpandedMuscleGroup(groupKey);
      
      // Initialize with mock exercises if not exists
      if (!exercisesByGroup[groupKey]) {
        const mockExercises = getMockExercises(groupKey);
        setExercisesByGroup(prev => ({
          ...prev,
          [groupKey]: mockExercises
        }));
      }
    }
    setEditingExercise(null);
  };
  
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

  const getMockExercises = (groupKey: string): Exercise[] => {
    const exerciseMap: Record<string, Exercise[]> = {
      chest: [
        { id: '1', name: "Supino", weight: 45, reps: 12, sets: 3 },
        { id: '2', name: "Flexões", weight: 0, reps: 15, sets: 3 },
        { id: '3', name: "Crossover", weight: 20, reps: 10, sets: 3 },
      ],
      back: [
        { id: '4', name: "Remada", weight: 35, reps: 12, sets: 3 },
        { id: '5', name: "Pull-ups", weight: 0, reps: 8, sets: 3 },
        { id: '6', name: "Lat Pulldown", weight: 40, reps: 10, sets: 3 },
      ],
      shoulders: [
        { id: '7', name: "Press Militar", weight: 25, reps: 10, sets: 3 },
        { id: '8', name: "Elevações Laterais", weight: 8, reps: 15, sets: 3 },
        { id: '9', name: "Face Pull", weight: 15, reps: 12, sets: 3 },
      ],
      biceps: [
        { id: '10', name: "Rosca Direta", weight: 15, reps: 12, sets: 3 },
        { id: '11', name: "Rosca Martelo", weight: 12, reps: 10, sets: 3 },
      ],
      triceps: [
        { id: '12', name: "Tríceps Pulley", weight: 25, reps: 12, sets: 3 },
        { id: '13', name: "Dips", weight: 0, reps: 10, sets: 3 },
      ],
      legs: [
        { id: '14', name: "Agachamento", weight: 60, reps: 12, sets: 3 },
        { id: '15', name: "Leg Press", weight: 120, reps: 15, sets: 3 },
        { id: '16', name: "Extensão Quadríceps", weight: 35, reps: 12, sets: 3 },
      ],
      cardio: [
        { id: '17', name: "Passadeira", weight: 0, reps: 30, sets: 1 },
        { id: '18', name: "Bicicleta", weight: 0, reps: 20, sets: 1 },
        { id: '19', name: "Elíptica", weight: 0, reps: 25, sets: 1 },
      ]
    };
    return exerciseMap[groupKey] || [];
  };

  const addExercise = (groupKey: string) => {
    const newExercise: Exercise = {
      id: Date.now().toString(),
      name: "Novo Exercício",
      weight: 0,
      reps: 10,
      sets: 3
    };
    
    setExercisesByGroup(prev => ({
      ...prev,
      [groupKey]: [...(prev[groupKey] || []), newExercise]
    }));
    
    setEditingExercise(newExercise.id);
  };

  const removeExercise = (groupKey: string, exerciseId: string) => {
    setExercisesByGroup(prev => ({
      ...prev,
      [groupKey]: prev[groupKey]?.filter(ex => ex.id !== exerciseId) || []
    }));
  };

  const updateExercise = (groupKey: string, exerciseId: string, field: keyof Exercise, value: string | number) => {
    setExercisesByGroup(prev => ({
      ...prev,
      [groupKey]: prev[groupKey]?.map(ex => 
        ex.id === exerciseId ? { ...ex, [field]: value } : ex
      ) || []
    }));
  };

  const handleSaveExercises = () => {
    // Here you would save to your backend/storage
    console.log("Saving exercises:", exercisesByGroup);
    setEditingExercise(null);
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
                  <View key={exercise.id} style={styles.exerciseItem}>
                    {editingExercise === exercise.id ? (
                      // Edit Mode
                      <View style={styles.editExerciseContainer}>
                        <View style={styles.editRow}>
                          <Text style={styles.editLabel}>Nome:</Text>
                          <TextInput
                            style={styles.editInput}
                            value={exercise.name}
                            onChangeText={(value) => updateExercise(group.key, exercise.id, 'name', value)}
                          />
                        </View>

                        <View style={styles.editRowGroup}>
                          {group.key === 'cardio' ? (
                            <View style={styles.editRowItem}>
                              <Text style={styles.editLabel}>Tempo:</Text>
                              <TextInput
                                style={styles.editInputSmall}
                                value={exercise.weight.toString()}
                                onChangeText={(value) => updateExercise(group.key, exercise.id, 'weight', parseFloat(value) || 0)}
                                keyboardType="decimal-pad"
                              />
                            </View>
                          ) : (
                            <View style={styles.editRowItem}>
                              <Text style={styles.editLabel}>Peso (kg):</Text>
                              <TextInput
                                style={styles.editInputSmall}
                                value={exercise.weight.toString()}
                                onChangeText={(value) => updateExercise(group.key, exercise.id, 'weight', parseFloat(value) || 0)}
                                keyboardType="decimal-pad"
                              />
                            </View>
                          )}

                          <View style={styles.editRowItem}>
                            <Text style={styles.editLabel}>Reps:</Text>
                            <TextInput
                              style={styles.editInputSmall}
                              value={exercise.reps.toString()}
                              onChangeText={(value) => updateExercise(group.key, exercise.id, 'reps', parseFloat(value) || 0)}
                              keyboardType="decimal-pad"
                            />
                          </View>

                          <View style={styles.editRowItem}>
                            <Text style={styles.editLabel}>Séries:</Text>
                            <TextInput
                              style={styles.editInputSmall}
                              value={exercise.sets.toString()}
                              onChangeText={(value) => updateExercise(group.key, exercise.id, 'sets', parseFloat(value) || 0)}
                              keyboardType="decimal-pad"
                            />
                          </View>
                        </View>

                        <View style={styles.editButtonContainer}>
                          <TouchableOpacity
                            style={styles.cancelEditButton}
                            onPress={() => setEditingExercise(null)}
                          >
                            <Text style={styles.cancelEditButtonText}>Cancelar</Text>
                          </TouchableOpacity>

                          <TouchableOpacity
                            style={styles.saveEditButton}
                            onPress={() => setEditingExercise(null)}
                          >
                            <Text style={styles.saveEditButtonText}>Guardar</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    ) : (
                      // View Mode
                      <View style={styles.exerciseInfo}>
                      <View style={styles.exerciseDetails}>
                        <Text style={styles.exerciseName}>{exercise.name}</Text>
                        <Text style={styles.exerciseStats}>
                          {group.key === 'cardio'
                            ? `${exercise.weight} min` 
                            : `${exercise.weight > 0 ? `${exercise.weight}kg` : 'Peso corporal'}`} • {exercise.reps} reps • {exercise.sets} séries
                        </Text>
                      </View>

                      {isPT && (
                        <View style={styles.exerciseActions}>
                          <TouchableOpacity
                            style={styles.editButton}
                            onPress={() => setEditingExercise(exercise.id)}
                          >
                            <Ionicons name="create-outline" size={18} color="#2563eb" />
                          </TouchableOpacity>

                          <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => removeExercise(group.key, exercise.id)}
                          >
                            <Ionicons name="trash-outline" size={18} color="#dc2626" />
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
};

export default ExerciseScreen;