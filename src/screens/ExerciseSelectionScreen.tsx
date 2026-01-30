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
  { id: '73', name: 'Jump Squats', category: 'Cardio', equipment: 'bodyweight', muscleGroup: 'Full Body' },
  { id: '74', name: 'Battle Ropes', category: 'Cardio', equipment: 'cable', muscleGroup: 'Full Body' },
];

const MUSCLE_GROUPS = [
  'All', 'Chest', 'Back', 'Shoulders', 'Biceps', 'Triceps', 
  'Quadriceps', 'Hamstrings', 'Glutes', 'Calves', 'Core', 'Full Body'
];

const EQUIPMENT_TYPES = ['All', 'bodyweight', 'dumbbells', 'barbell', 'machine', 'cable'];

type SortType = 'alphabetical' | 'muscle-group';

const ExerciseSelectionScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState('All');
  const [selectedEquipment, setSelectedEquipment] = useState('All');
  const [sortType, setSortType] = useState<SortType>('alphabetical');

  const filteredAndSortedExercises = useMemo(() => {
    let filtered = EXERCISES.filter((exercise) => {
      const matchesSearch = exercise.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesMuscleGroup = selectedMuscleGroup === 'All' || exercise.muscleGroup === selectedMuscleGroup;
      const matchesEquipment = selectedEquipment === 'All' || exercise.equipment === selectedEquipment;
      return matchesSearch && matchesMuscleGroup && matchesEquipment;
    });

    if (sortType === 'alphabetical') {
      filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      filtered = filtered.sort((a, b) => {
        if (a.muscleGroup !== b.muscleGroup) {
          return a.muscleGroup.localeCompare(b.muscleGroup);
        }
        return a.name.localeCompare(b.name);
      });
    }

    return filtered;
  }, [searchQuery, selectedMuscleGroup, selectedEquipment, sortType]);

  const handleExerciseSelect = (exercise: Exercise) => {
    console.log('Selected exercise:', exercise);
    // Here you can add exercise to workout or navigate to exercise details
  };

  const getEquipmentIcon = (equipment: string) => {
    switch (equipment) {
      case 'bodyweight':
        return 'person';
      case 'dumbbells':
        return 'fitness';
      case 'barbell':
        return 'barbell';
      case 'machine':
        return 'hardware-chip';
      case 'cable':
        return 'git-network';
      default:
        return 'help';
    }
  };

  const renderExerciseItem = ({ item }: { item: Exercise }) => (
    <View style={styles.exerciseItemWrapper}>
      <Pressable
        style={styles.exerciseItem}
        onPress={() => handleExerciseSelect(item)}
      >
        <View style={styles.exerciseInfo}>
          <Text style={styles.exerciseName}>{item.name}</Text>
          <View style={styles.exerciseDetails}>
            <Text style={styles.exerciseMuscleGroup}>{item.muscleGroup}</Text>
            <View style={styles.equipmentContainer}>
              <Ionicons
                name={getEquipmentIcon(item.equipment) as any}
                size={14}
                color="#666"
              />
              <Text style={styles.equipmentText}>{item.equipment}</Text>
            </View>
          </View>
        </View>
        <View style={styles.addButtonWrapper}>
          <Pressable style={styles.addButton}>
            <Ionicons name="add" size={20} color="#007AFF" />
          </Pressable>
        </View>
      </Pressable>
    </View>
  );

  const renderMuscleGroupButton = (muscleGroup: string) => (
    <View key={muscleGroup} style={styles.filterButtonWrapper}>
      <Pressable
        style={[
          styles.filterButton,
          selectedMuscleGroup === muscleGroup && styles.filterButtonActive,
        ]}
        onPress={() => setSelectedMuscleGroup(muscleGroup)}
      >
        <Text
          style={[
            styles.filterButtonText,
            selectedMuscleGroup === muscleGroup && styles.filterButtonTextActive,
          ]}
        >
          {muscleGroup}
        </Text>
      </Pressable>
    </View>
  );

  const renderEquipmentButton = (equipment: string) => (
    <View key={equipment} style={styles.filterButtonWrapper}>
      <Pressable
        style={[
          styles.filterButton,
          selectedEquipment === equipment && styles.filterButtonActive,
        ]}
        onPress={() => setSelectedEquipment(equipment)}
      >
        <Text
          style={[
            styles.filterButtonText,
            selectedEquipment === equipment && styles.filterButtonTextActive,
          ]}
        >
          {equipment === 'All' ? 'All Equipment' : equipment}
        </Text>
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Exercise Library</Text>
        <Text style={styles.headerSubtitle}>Choose exercises for your workout</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputWrapper}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search exercises..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
          />
        </View>
      </View>

      {/* Sort Toggle */}
      <View style={styles.sortContainer}>
        <Text style={styles.sortLabel}>Sort by:</Text>
        <View style={styles.sortButtonWrapper}>
          <Pressable
            style={[
              styles.sortButton,
              sortType === 'alphabetical' && styles.sortButtonActive,
            ]}
            onPress={() => setSortType('alphabetical')}
          >
            <Text
              style={[
                styles.sortButtonText,
                sortType === 'alphabetical' && styles.sortButtonTextActive,
              ]}
            >
              A-Z
            </Text>
          </Pressable>
        </View>
        <View style={styles.sortButtonWrapper}>
          <Pressable
            style={[
              styles.sortButton,
              sortType === 'muscle-group' && styles.sortButtonActive,
            ]}
            onPress={() => setSortType('muscle-group')}
          >
            <Text
              style={[
                styles.sortButtonText,
                sortType === 'muscle-group' && styles.sortButtonTextActive,
              ]}
            >
              Muscle Groups
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Muscle Group Filter */}
      <View style={styles.filterSection}>
        <Text style={styles.filterTitle}>Muscle Groups</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}
        >
          {MUSCLE_GROUPS.map(renderMuscleGroupButton)}
        </ScrollView>
      </View>

      {/* Equipment Filter */}
      <View style={styles.filterSection}>
        <Text style={styles.filterTitle}>Equipment</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}
        >
          {EQUIPMENT_TYPES.map(renderEquipmentButton)}
        </ScrollView>
      </View>

      {/* Exercise List */}
      <View style={styles.exerciseListContainer}>
        <Text style={styles.resultsCount}>
          {filteredAndSortedExercises.length} exercise{filteredAndSortedExercises.length !== 1 ? 's' : ''}
        </Text>
        <FlatList
          data={filteredAndSortedExercises}
          renderItem={renderExerciseItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.exerciseList}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  sortLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginRight: 12,
  },
  sortButtonWrapper: {
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 8,
  },
  sortButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f8f9fa',
  },
  sortButtonActive: {
    backgroundColor: '#007AFF',
  },
  sortButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  sortButtonTextActive: {
    color: '#fff',
  },
  filterSection: {
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  filterTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  filterScroll: {
    paddingLeft: 20,
  },
  filterButtonWrapper: {
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f8f9fa',
  },
  filterButtonActive: {
    backgroundColor: '#007AFF',
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  filterButtonTextActive: {
    color: '#fff',
  },
  exerciseListContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  resultsCount: {
    fontSize: 14,
    color: '#666',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  exerciseList: {
    paddingVertical: 8,
  },
  exerciseItemWrapper: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginVertical: 4,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
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
  exerciseDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  exerciseMuscleGroup: {
    fontSize: 14,
    color: '#666',
    marginRight: 12,
  },
  equipmentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  equipmentText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
    textTransform: 'capitalize',
  },
  addButtonWrapper: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  addButton: {
    width: 36,
    height: 36,
    backgroundColor: '#f0f8ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ExerciseSelectionScreen;