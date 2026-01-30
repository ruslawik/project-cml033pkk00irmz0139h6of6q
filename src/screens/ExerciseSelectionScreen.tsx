import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Exercise {
  id: string;
  name: string;
  category: string;
  equipment: 'bodyweight' | 'dumbbells' | 'barbell' | 'machine' | 'cable';
  muscleGroup: string;
}

const EXERCISES: Exercise[] = [
  // Chest
  { id: '1', name: 'Push-ups', category: 'Chest', equipment: 'bodyweight', muscleGroup: 'Chest' },
  { id: '2', name: 'Bench Press', category: 'Chest', equipment: 'barbell', muscleGroup: 'Chest' },
  { id: '3', name: 'Incline Bench Press', category: 'Chest', equipment: 'barbell', muscleGroup: 'Chest' },
  { id: '4', name: 'Dumbbell Flyes', category: 'Chest', equipment: 'dumbbells', muscleGroup: 'Chest' },
  { id: '5', name: 'Chest Press Machine', category: 'Chest', equipment: 'machine', muscleGroup: 'Chest' },
  { id: '6', name: 'Cable Crossover', category: 'Chest', equipment: 'cable', muscleGroup: 'Chest' },
  { id: '7', name: 'Dips', category: 'Chest', equipment: 'bodyweight', muscleGroup: 'Chest' },
  { id: '8', name: 'Decline Bench Press', category: 'Chest', equipment: 'barbell', muscleGroup: 'Chest' },
  { id: '9', name: 'Incline Dumbbell Press', category: 'Chest', equipment: 'dumbbells', muscleGroup: 'Chest' },
  { id: '10', name: 'Pec Deck Machine', category: 'Chest', equipment: 'machine', muscleGroup: 'Chest' },

  // Back
  { id: '11', name: 'Pull-ups', category: 'Back', equipment: 'bodyweight', muscleGroup: 'Back' },
  { id: '12', name: 'Deadlift', category: 'Back', equipment: 'barbell', muscleGroup: 'Back' },
  { id: '13', name: 'Bent-over Row', category: 'Back', equipment: 'barbell', muscleGroup: 'Back' },
  { id: '14', name: 'Lat Pulldown', category: 'Back', equipment: 'machine', muscleGroup: 'Back' },
  { id: '15', name: 'Seated Cable Row', category: 'Back', equipment: 'cable', muscleGroup: 'Back' },
  { id: '16', name: 'T-bar Row', category: 'Back', equipment: 'machine', muscleGroup: 'Back' },
  { id: '17', name: 'Single-arm Dumbbell Row', category: 'Back', equipment: 'dumbbells', muscleGroup: 'Back' },
  { id: '18', name: 'Hyperextension', category: 'Back', equipment: 'machine', muscleGroup: 'Back' },
  { id: '19', name: 'Chin-ups', category: 'Back', equipment: 'bodyweight', muscleGroup: 'Back' },
  { id: '20', name: 'Cable Face Pulls', category: 'Back', equipment: 'cable', muscleGroup: 'Back' },

  // Shoulders
  { id: '21', name: 'Shoulder Press', category: 'Shoulders', equipment: 'dumbbells', muscleGroup: 'Shoulders' },
  { id: '22', name: 'Military Press', category: 'Shoulders', equipment: 'barbell', muscleGroup: 'Shoulders' },
  { id: '23', name: 'Lateral Raises', category: 'Shoulders', equipment: 'dumbbells', muscleGroup: 'Shoulders' },
  { id: '24', name: 'Front Raises', category: 'Shoulders', equipment: 'dumbbells', muscleGroup: 'Shoulders' },
  { id: '25', name: 'Rear Delt Flyes', category: 'Shoulders', equipment: 'dumbbells', muscleGroup: 'Shoulders' },
  { id: '26', name: 'Arnold Press', category: 'Shoulders', equipment: 'dumbbells', muscleGroup: 'Shoulders' },
  { id: '27', name: 'Upright Row', category: 'Shoulders', equipment: 'barbell', muscleGroup: 'Shoulders' },
  { id: '28', name: 'Pike Push-ups', category: 'Shoulders', equipment: 'bodyweight', muscleGroup: 'Shoulders' },
  { id: '29', name: 'Shoulder Shrugs', category: 'Shoulders', equipment: 'dumbbells', muscleGroup: 'Shoulders' },
  { id: '30', name: 'Cable Lateral Raises', category: 'Shoulders', equipment: 'cable', muscleGroup: 'Shoulders' },

  // Arms - Biceps
  { id: '31', name: 'Bicep Curls', category: 'Arms', equipment: 'dumbbells', muscleGroup: 'Biceps' },
  { id: '32', name: 'Hammer Curls', category: 'Arms', equipment: 'dumbbells', muscleGroup: 'Biceps' },
  { id: '33', name: 'Barbell Curl', category: 'Arms', equipment: 'barbell', muscleGroup: 'Biceps' },
  { id: '34', name: 'Cable Bicep Curls', category: 'Arms', equipment: 'cable', muscleGroup: 'Biceps' },
  { id: '35', name: 'Concentration Curls', category: 'Arms', equipment: 'dumbbells', muscleGroup: 'Biceps' },
  { id: '36', name: 'Preacher Curls', category: 'Arms', equipment: 'barbell', muscleGroup: 'Biceps' },

  // Arms - Triceps
  { id: '37', name: 'Tricep Dips', category: 'Arms', equipment: 'bodyweight', muscleGroup: 'Triceps' },
  { id: '38', name: 'Overhead Tricep Extension', category: 'Arms', equipment: 'dumbbells', muscleGroup: 'Triceps' },
  { id: '39', name: 'Close-grip Bench Press', category: 'Arms', equipment: 'barbell', muscleGroup: 'Triceps' },
  { id: '40', name: 'Tricep Pushdown', category: 'Arms', equipment: 'cable', muscleGroup: 'Triceps' },
  { id: '41', name: 'Diamond Push-ups', category: 'Arms', equipment: 'bodyweight', muscleGroup: 'Triceps' },
  { id: '42', name: 'Skull Crushers', category: 'Arms', equipment: 'barbell', muscleGroup: 'Triceps' },

  // Legs - Quads
  { id: '43', name: 'Squats', category: 'Legs', equipment: 'bodyweight', muscleGroup: 'Quadriceps' },
  { id: '44', name: 'Barbell Squat', category: 'Legs', equipment: 'barbell', muscleGroup: 'Quadriceps' },
  { id: '45', name: 'Leg Press', category: 'Legs', equipment: 'machine', muscleGroup: 'Quadriceps' },
  { id: '46', name: 'Leg Extension', category: 'Legs', equipment: 'machine', muscleGroup: 'Quadriceps' },
  { id: '47', name: 'Bulgarian Split Squats', category: 'Legs', equipment: 'bodyweight', muscleGroup: 'Quadriceps' },
  { id: '48', name: 'Front Squats', category: 'Legs', equipment: 'barbell', muscleGroup: 'Quadriceps' },

  // Legs - Hamstrings
  { id: '49', name: 'Romanian Deadlift', category: 'Legs', equipment: 'barbell', muscleGroup: 'Hamstrings' },
  { id: '50', name: 'Leg Curls', category: 'Legs', equipment: 'machine', muscleGroup: 'Hamstrings' },
  { id: '51', name: 'Stiff Leg Deadlift', category: 'Legs', equipment: 'dumbbells', muscleGroup: 'Hamstrings' },
  { id: '52', name: 'Good Mornings', category: 'Legs', equipment: 'barbell', muscleGroup: 'Hamstrings' },

  // Legs - Glutes
  { id: '53', name: 'Hip Thrusts', category: 'Legs', equipment: 'barbell', muscleGroup: 'Glutes' },
  { id: '54', name: 'Lunges', category: 'Legs', equipment: 'bodyweight', muscleGroup: 'Glutes' },
  { id: '55', name: 'Walking Lunges', category: 'Legs', equipment: 'dumbbells', muscleGroup: 'Glutes' },
  { id: '56', name: 'Glute Bridges', category: 'Legs', equipment: 'bodyweight', muscleGroup: 'Glutes' },

  // Legs - Calves
  { id: '57', name: 'Calf Raises', category: 'Legs', equipment: 'bodyweight', muscleGroup: 'Calves' },
  { id: '58', name: 'Seated Calf Raises', category: 'Legs', equipment: 'machine', muscleGroup: 'Calves' },
  { id: '59', name: 'Standing Calf Raises', category: 'Legs', equipment: 'machine', muscleGroup: 'Calves' },

  // Core
  { id: '60', name: 'Plank', category: 'Core', equipment: 'bodyweight', muscleGroup: 'Core' },
  { id: '61', name: 'Crunches', category: 'Core', equipment: 'bodyweight', muscleGroup: 'Core' },
  { id: '62', name: 'Russian Twists', category: 'Core', equipment: 'bodyweight', muscleGroup: 'Core' },
  { id: '63', name: 'Mountain Climbers', category: 'Core', equipment: 'bodyweight', muscleGroup: 'Core' },
  { id: '64', name: 'Dead Bug', category: 'Core', equipment: 'bodyweight', muscleGroup: 'Core' },
  { id: '65', name: 'Bicycle Crunches', category: 'Core', equipment: 'bodyweight', muscleGroup: 'Core' },
  { id: '66', name: 'Leg Raises', category: 'Core', equipment: 'bodyweight', muscleGroup: 'Core' },
  { id: '67', name: 'Cable Crunches', category: 'Core', equipment: 'cable', muscleGroup: 'Core' },
  { id: '68', name: 'Hanging Knee Raises', category: 'Core', equipment: 'bodyweight', muscleGroup: 'Core' },
  { id: '69', name: 'Side Plank', category: 'Core', equipment: 'bodyweight', muscleGroup: 'Core' },

  // Cardio
  { id: '70', name: 'Burpees', category: 'Cardio', equipment: 'bodyweight', muscleGroup: 'Full Body' },
  { id: '71', name: 'Jumping Jacks', category: 'Cardio', equipment: 'bodyweight', muscleGroup: 'Full Body' },
  { id: '72', name: 'High Knees', category: 'Cardio', equipment: 'bodyweight', muscleGroup: 'Full Body' },
  { id: '73', name: 'Jump Rope', category: 'Cardio', equipment: 'bodyweight', muscleGroup: 'Full Body' },
  { id: '74', name: 'Box Jumps', category: 'Cardio', equipment: 'bodyweight', muscleGroup: 'Full Body' },
];

type SortType = 'alphabetical' | 'muscle';

const ExerciseSelectionScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortType, setSortType] = useState<SortType>('alphabetical');
  const [selectedExercises, setSelectedExercises] = useState<Set<string>>(new Set());

  const filteredAndSortedExercises = useMemo(() => {
    let filtered = EXERCISES.filter(exercise =>
      exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exercise.muscleGroup.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exercise.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sortType === 'alphabetical') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      filtered.sort((a, b) => {
        if (a.muscleGroup !== b.muscleGroup) {
          return a.muscleGroup.localeCompare(b.muscleGroup);
        }
        return a.name.localeCompare(b.name);
      });
    }

    return filtered;
  }, [searchQuery, sortType]);

  const groupedExercises = useMemo(() => {
    if (sortType !== 'muscle') return [];
    
    const groups: { [key: string]: Exercise[] } = {};
    filteredAndSortedExercises.forEach(exercise => {
      if (!groups[exercise.muscleGroup]) {
        groups[exercise.muscleGroup] = [];
      }
      groups[exercise.muscleGroup].push(exercise);
    });
    
    return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
  }, [filteredAndSortedExercises, sortType]);

  const handleExerciseSelect = (exerciseId: string) => {
    const newSelected = new Set(selectedExercises);
    if (newSelected.has(exerciseId)) {
      newSelected.delete(exerciseId);
    } else {
      newSelected.add(exerciseId);
    }
    setSelectedExercises(newSelected);
  };

  const getEquipmentIcon = (equipment: Exercise['equipment']) => {
    switch (equipment) {
      case 'bodyweight':
        return 'body';
      case 'dumbbells':
        return 'barbell-outline';
      case 'barbell':
        return 'barbell';
      case 'machine':
        return 'hardware-chip';
      case 'cable':
        return 'git-network';
      default:
        return 'fitness';
    }
  };

  const renderExerciseItem = ({ item }: { item: Exercise }) => (
    <Pressable
      style={[
        styles.exerciseItem,
        selectedExercises.has(item.id) && styles.selectedExerciseItem
      ]}
      onPress={() => handleExerciseSelect(item.id)}
    >
      <View style={styles.exerciseContent}>
        <View style={styles.exerciseInfo}>
          <Text style={styles.exerciseName}>{item.name}</Text>
          <View style={styles.exerciseMeta}>
            <View style={styles.metaItem}>
              <Ionicons
                name={getEquipmentIcon(item.equipment)}
                size={14}
                color="#666"
              />
              <Text style={styles.metaText}>{item.equipment}</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="fitness" size={14} color="#666" />
              <Text style={styles.metaText}>{item.muscleGroup}</Text>
            </View>
          </View>
        </View>
        <View style={styles.exerciseActions}>
          {selectedExercises.has(item.id) ? (
            <Ionicons name="checkmark-circle" size={24} color="#007AFF" />
          ) : (
            <Ionicons name="add-circle-outline" size={24} color="#666" />
          )}
        </View>
      </View>
    </Pressable>
  );

  const renderGroupedContent = () => {
    return (
      <ScrollView style={styles.groupedContent}>
        {groupedExercises.map(([muscleGroup, exercises]) => (
          <View key={muscleGroup} style={styles.muscleGroup}>
            <Text style={styles.muscleGroupTitle}>{muscleGroup}</Text>
            {exercises.map(exercise => (
              <View key={exercise.id}>
                {renderExerciseItem({ item: exercise })}
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search exercises..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <Pressable onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#666" />
            </Pressable>
          )}
        </View>

        {/* Sort Toggle */}
        <View style={styles.sortContainer}>
          <View style={styles.sortToggle}>
            <Pressable
              style={[
                styles.sortButton,
                sortType === 'alphabetical' && styles.activeSortButton
              ]}
              onPress={() => setSortType('alphabetical')}
            >
              <Text style={[
                styles.sortButtonText,
                sortType === 'alphabetical' && styles.activeSortButtonText
              ]}>
                A-Z
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.sortButton,
                sortType === 'muscle' && styles.activeSortButton
              ]}
              onPress={() => setSortType('muscle')}
            >
              <Text style={[
                styles.sortButtonText,
                sortType === 'muscle' && styles.activeSortButtonText
              ]}>
                Muscle Groups
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Selected Count */}
        {selectedExercises.size > 0 && (
          <View style={styles.selectedCounter}>
            <Text style={styles.selectedCounterText}>
              {selectedExercises.size} exercise{selectedExercises.size !== 1 ? 's' : ''} selected
            </Text>
          </View>
        )}
      </View>

      {/* Exercise List */}
      <View style={styles.listContainer}>
        {sortType === 'muscle' ? (
          renderGroupedContent()
        ) : (
          <FlatList
            data={filteredAndSortedExercises}
            renderItem={renderExerciseItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          />
        )}
      </View>

      {/* Action Button */}
      {selectedExercises.size > 0 && (
        <View style={styles.actionButtonContainer}>
          <View style={styles.actionButtonWrapper}>
            <Pressable style={styles.actionButton} onPress={() => console.log('Start workout with selected exercises')}>
              <Text style={styles.actionButtonText}>
                Start Workout ({selectedExercises.size})
              </Text>
            </Pressable>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  sortContainer: {
    marginBottom: 12,
  },
  sortToggle: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 2,
  },
  sortButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
  },
  activeSortButton: {
    backgroundColor: '#007AFF',
  },
  sortButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  activeSortButtonText: {
    color: '#fff',
  },
  selectedCounter: {
    alignItems: 'center',
    marginTop: 8,
  },
  selectedCounterText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
  listContainer: {
    flex: 1,
  },
  listContent: {
    padding: 16,
  },
  groupedContent: {
    flex: 1,
    padding: 16,
  },
  muscleGroup: {
    marginBottom: 24,
  },
  muscleGroupTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#007AFF',
  },
  exerciseItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  selectedExerciseItem: {
    backgroundColor: '#e3f2fd',
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  exerciseContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  exerciseMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  metaText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
    textTransform: 'capitalize',
  },
  exerciseActions: {
    marginLeft: 12,
  },
  actionButtonContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  actionButtonWrapper: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    overflow: 'hidden',
  },
  actionButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default ExerciseSelectionScreen;