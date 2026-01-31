import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  Alert,
  Animated,
  PanGestureHandler,
  State,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, RouteProp } from '@react-navigation/native';

interface Set {
  id: string;
  weight: string;
  reps: string;
}

interface Exercise {
  id: string;
  name: string;
  sets: Set[];
}

interface Workout {
  id: string;
  name: string;
  exercises: Exercise[];
  date: string;
}

interface SelectedExercise {
  id: string;
  name: string;
  category: string;
  equipment: 'bodyweight' | 'dumbbells' | 'barbell' | 'machine' | 'cable';
  muscleGroup: string;
}

type WorkoutLogRouteParams = {
  selectedExercises?: SelectedExercise[];
};

type WorkoutLogRouteProp = RouteProp<{ WorkoutLog: WorkoutLogRouteParams }, 'WorkoutLog'>;

const WorkoutLogScreen: React.FC = () => {
  const route = useRoute<WorkoutLogRouteProp>();
  const [currentWorkout, setCurrentWorkout] = useState<Workout | null>(null);
  const [workoutName, setWorkoutName] = useState<string>('');
  const [draggedIndex, setDraggedIndex] = useState<number>(-1);

  useEffect(() => {
    const selectedExercises = route.params?.selectedExercises;
    if (selectedExercises && selectedExercises.length > 0) {
      startWorkoutWithExercises(selectedExercises);
    }
  }, [route.params?.selectedExercises]);

  const startWorkoutWithExercises = (selectedExercises: SelectedExercise[]) => {
    const workoutExercises: Exercise[] = selectedExercises.map(exercise => ({
      id: exercise.id,
      name: exercise.name,
      sets: [],
    }));

    const newWorkout: Workout = {
      id: Date.now().toString(),
      name: workoutName || `Workout ${new Date().toLocaleDateString()}`,
      exercises: workoutExercises,
      date: new Date().toISOString(),
    };
    setCurrentWorkout(newWorkout);
  };

  const startNewWorkout = () => {
    const newWorkout: Workout = {
      id: Date.now().toString(),
      name: workoutName || `Workout ${new Date().toLocaleDateString()}`,
      exercises: [],
      date: new Date().toISOString(),
    };
    setCurrentWorkout(newWorkout);
  };

  const addExerciseToWorkout = (exerciseName: string) => {
    if (!currentWorkout) return;

    const newExercise: Exercise = {
      id: Date.now().toString(),
      name: exerciseName,
      sets: [],
    };

    setCurrentWorkout({
      ...currentWorkout,
      exercises: [...currentWorkout.exercises, newExercise],
    });
  };

  const addSetToExercise = (exerciseId: string) => {
    if (!currentWorkout) return;

    const newSet: Set = {
      id: Date.now().toString(),
      weight: '',
      reps: '',
    };

    setCurrentWorkout({
      ...currentWorkout,
      exercises: currentWorkout.exercises.map(exercise =>
        exercise.id === exerciseId
          ? { ...exercise, sets: [...exercise.sets, newSet] }
          : exercise
      ),
    });
  };

  const updateSet = (exerciseId: string, setId: string, field: 'weight' | 'reps', value: string) => {
    if (!currentWorkout) return;

    setCurrentWorkout({
      ...currentWorkout,
      exercises: currentWorkout.exercises.map(exercise =>
        exercise.id === exerciseId
          ? {
              ...exercise,
              sets: exercise.sets.map(set =>
                set.id === setId ? { ...set, [field]: value } : set
              ),
            }
          : exercise
      ),
    });
  };

  const removeSet = (exerciseId: string, setId: string) => {
    if (!currentWorkout) return;

    setCurrentWorkout({
      ...currentWorkout,
      exercises: currentWorkout.exercises.map(exercise =>
        exercise.id === exerciseId
          ? { ...exercise, sets: exercise.sets.filter(set => set.id !== setId) }
          : exercise
      ),
    });
  };

  const removeExercise = (exerciseId: string) => {
    if (!currentWorkout) return;

    setCurrentWorkout({
      ...currentWorkout,
      exercises: currentWorkout.exercises.filter(exercise => exercise.id !== exerciseId),
    });
  };

  const reorderExercises = (fromIndex: number, toIndex: number) => {
    if (!currentWorkout) return;

    const newExercises = [...currentWorkout.exercises];
    const [movedExercise] = newExercises.splice(fromIndex, 1);
    newExercises.splice(toIndex, 0, movedExercise);

    setCurrentWorkout({
      ...currentWorkout,
      exercises: newExercises,
    });
  };

  const saveWorkout = () => {
    if (!currentWorkout || currentWorkout.exercises.length === 0) {
      Alert.alert('Error', 'Please add at least one exercise to save the workout.');
      return;
    }

    // Here you would typically save to AsyncStorage or a database
    Alert.alert('Success', 'Workout saved successfully!', [
      {
        text: 'OK',
        onPress: () => {
          setCurrentWorkout(null);
          setWorkoutName('');
        },
      },
    ]);
  };

  const ExerciseCard: React.FC<{ exercise: Exercise; index: number }> = ({ exercise, index }) => {
    return (
      <View style={styles.exerciseCard}>
        <View style={styles.exerciseHeader}>
          <View style={styles.exerciseTitle}>
            <Ionicons name="reorder-three" size={20} color="#666" />
            <Text style={styles.exerciseName}>{exercise.name}</Text>
          </View>
          <Pressable
            onPress={() => removeExercise(exercise.id)}
            style={styles.removeButton}
          >
            <Ionicons name="trash-outline" size={18} color="#ff4444" />
          </Pressable>
        </View>

        <View style={styles.setsHeader}>
          <Text style={styles.setHeaderText}>Set</Text>
          <Text style={styles.setHeaderText}>LBS</Text>
          <Text style={styles.setHeaderText}>REPS</Text>
          <View style={styles.setHeaderSpacer} />
        </View>

        {exercise.sets.map((set, setIndex) => (
          <View key={set.id} style={styles.setRow}>
            <Text style={styles.setNumber}>{setIndex + 1}</Text>
            <TextInput
              style={styles.setInput}
              value={set.weight}
              onChangeText={(value) => updateSet(exercise.id, set.id, 'weight', value)}
              placeholder="0"
              keyboardType="numeric"
              placeholderTextColor="#999"
            />
            <TextInput
              style={styles.setInput}
              value={set.reps}
              onChangeText={(value) => updateSet(exercise.id, set.id, 'reps', value)}
              placeholder="0"
              keyboardType="numeric"
              placeholderTextColor="#999"
            />
            <Pressable
              onPress={() => removeSet(exercise.id, set.id)}
              style={styles.removeSetButton}
            >
              <Ionicons name="close-circle" size={20} color="#ff4444" />
            </Pressable>
          </View>
        ))}

        <View style={styles.addSetButtonContainer}>
          <Pressable
            onPress={() => addSetToExercise(exercise.id)}
            style={styles.addSetButton}
          >
            <Ionicons name="add-circle-outline" size={20} color="#007AFF" />
            <Text style={styles.addSetButtonText}>Add Set</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  if (!currentWorkout) {
    return (
      <View style={styles.container}>
        <View style={styles.startWorkoutContainer}>
          <Text style={styles.title}>Start New Workout</Text>
          
          <TextInput
            style={styles.workoutNameInput}
            value={workoutName}
            onChangeText={setWorkoutName}
            placeholder="Enter workout name (optional)"
            placeholderTextColor="#999"
          />

          <View style={styles.startButtonContainer}>
            <Pressable onPress={startNewWorkout} style={styles.startButton}>
              <Text style={styles.startButtonText}>Start Empty Workout</Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.workoutHeader}>
        <Text style={styles.workoutTitle}>{currentWorkout.name}</Text>
        <Text style={styles.workoutDate}>{new Date(currentWorkout.date).toLocaleDateString()}</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {currentWorkout.exercises.map((exercise, index) => (
          <ExerciseCard key={exercise.id} exercise={exercise} index={index} />
        ))}

        <View style={styles.addExerciseContainer}>
          <Pressable
            onPress={() => addExerciseToWorkout('Push Up')}
            style={styles.addExerciseButton}
          >
            <Ionicons name="add-outline" size={24} color="#007AFF" />
            <Text style={styles.addExerciseButtonText}>Add Exercise</Text>
          </Pressable>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.footerButtonContainer}>
          <Pressable
            onPress={() => {
              setCurrentWorkout(null);
              setWorkoutName('');
            }}
            style={styles.cancelButton}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </Pressable>
          
          <Pressable onPress={saveWorkout} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save Workout</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  startWorkoutContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 32,
    textAlign: 'center',
  },
  workoutNameInput: {
    width: '100%',
    height: 48,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#e1e5e9',
    color: '#333',
  },
  startButtonContainer: {
    width: '100%',
  },
  startButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    overflow: 'hidden',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  workoutHeader: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e5e9',
  },
  workoutTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  workoutDate: {
    fontSize: 14,
    color: '#666',
  },
  scrollView: {
    flex: 1,
  },
  exerciseCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  exerciseTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  removeButton: {
    padding: 4,
  },
  setsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e5e9',
    marginBottom: 12,
  },
  setHeaderText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    width: 60,
  },
  setHeaderSpacer: {
    width: 30,
  },
  setRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  setNumber: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    width: 60,
    textAlign: 'center',
  },
  setInput: {
    width: 60,
    height: 36,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#e1e5e9',
  },
  removeSetButton: {
    marginLeft: 10,
    padding: 4,
  },
  addSetButtonContainer: {
    marginTop: 8,
  },
  addSetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: '#f0f8ff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#007AFF',
    borderStyle: 'dashed',
  },
  addSetButtonText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
    marginLeft: 4,
  },
  addExerciseContainer: {
    marginHorizontal: 16,
    marginVertical: 16,
  },
  addExerciseButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#007AFF',
    borderStyle: 'dashed',
  },
  addExerciseButtonText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
    marginLeft: 8,
  },
  footer: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#e1e5e9',
  },
  footerButtonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e1e5e9',
    overflow: 'hidden',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    flex: 2,
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    overflow: 'hidden',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default WorkoutLogScreen;