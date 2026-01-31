import React, { useState } from 'react';
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

const WorkoutLogScreen: React.FC = () => {
  const [currentWorkout, setCurrentWorkout] = useState<Workout | null>(null);
  const [workoutName, setWorkoutName] = useState<string>('');
  const [draggedIndex, setDraggedIndex] = useState<number>(-1);

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
        </View>
        <View style={styles.footerButtonContainer}>
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
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
  },
  workoutNameInput: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 30,
  },
  startButtonContainer: {
    width: '100%',
  },
  startButton: {
    backgroundColor: '#007AFF',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  workoutHeader: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  workoutTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  workoutDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  exerciseCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
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
    borderBottomColor: '#eee',
    marginBottom: 8,
  },
  setHeaderText: {
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
  },
  setHeaderSpacer: {
    width: 30,
  },
  setRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  setNumber: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
  setInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    paddingHorizontal: 8,
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 4,
    backgroundColor: '#f9f9f9',
  },
  removeSetButton: {
    width: 30,
    alignItems: 'center',
  },
  addSetButtonContainer: {
    marginTop: 12,
    alignItems: 'center',
  },
  addSetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  addSetButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 4,
  },
  addExerciseContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  addExerciseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#007AFF',
    borderStyle: 'dashed',
  },
  addExerciseButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  footer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  footerButtonContainer: {
    flex: 1,
    marginHorizontal: 8,
  },
  cancelButton: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '500',
  },
  saveButton: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default WorkoutLogScreen;