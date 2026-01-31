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
import { useNavigation, NavigationProp } from '@react-navigation/native';

interface Exercise {
  id: string;
  name: string;
  category: string;
  equipment: 'bodyweight' | 'dumbbells' | 'barbell' | 'machine' | 'cable';
  muscleGroup: string;
}

type RootStackParamList = {
  Workout: { selectedExercises?: Exercise[] };
};

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
  { id: '74', name: 'Sprint Intervals', category: 'Cardio', equipment: 'bodyweight', muscleGroup: 'Full Body' },
  { id: '75', name: 'Battle Ropes', category: 'Cardio', equipment: 'cable', muscleGroup: 'Full Body' },
];

const CATEGORIES = ['All', 'Chest', 'Back', 'Shoulders', 'Arms', 'Legs', 'Core', 'Cardio'];
const EQUIPMENT_TYPES = ['All', 'bodyweight', 'dumbbells', 'barbell', 'machine', 'cable'];

const ExerciseSelectionScreen: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedEquipment, setSelectedEquipment] = useState<string>('All');
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);
  
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const filteredExercises = useMemo(() => {
    return EXERCISES.filter(exercise => {
      const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          exercise.muscleGroup.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || exercise.category === selectedCategory;
      const matchesEquipment = selectedEquipment === 'All' || exercise.equipment === selectedEquipment;
      
      return matchesSearch && matchesCategory && matchesEquipment;
    });
  }, [searchTerm, selectedCategory, selectedEquipment]);

  const toggleExerciseSelection = (exercise: Exercise) => {
    setSelectedExercises(prev => {
      const isSelected = prev.some(e => e.id === exercise.id);
      if (isSelected) {
        return prev.filter(e => e.id !== exercise.id);
      } else {
        return [...prev, exercise];
      }
    });
  };

  const startWorkout = () => {
    navigation.navigate('Workout', { selectedExercises });
  };

  const getEquipmentIcon = (equipment: string) => {
    switch (equipment) {
      case 'bodyweight':
        return 'body-outline';
      case 'dumbbells':
        return 'barbell-outline';
      case 'barbell':
        return 'barbell';
      case 'machine':
        return 'hardware-chip-outline';
      case 'cable':
        return 'link-outline';
      default:
        return 'fitness-outline';
    }
  };

  const ExerciseItem: React.FC<{ item: Exercise }> = ({ item }) => {
    const isSelected = selectedExercises.some(e => e.id === item.id);
    
    return (
      <View style={[styles.exerciseItem, isSelected && styles.selectedExercise]}>
        <Pressable
          onPress={() => toggleExerciseSelection(item)}
          style={styles.exerciseContent}
        >
          <View style={styles.exerciseIconContainer}>
            <Ionicons 
              name={getEquipmentIcon(item.equipment)} 
              size={24} 
              color={isSelected ? '#007AFF' : '#666'} 
            />
          </View>
          
          <View style={styles.exerciseInfo}>
            <Text style={[styles.exerciseName, isSelected && styles.selectedExerciseName]}>
              {item.name}
            </Text>
            <View style={styles.exerciseDetails}>
              <Text style={styles.exerciseCategory}>{item.category}</Text>
              <Text style={styles.exerciseDivider}>•</Text>
              <Text style={styles.exerciseMuscleGroup}>{item.muscleGroup}</Text>
            </View>
          </View>
          
          <View style={styles.selectionIndicator}>
            {isSelected && (
              <Ionicons name="checkmark-circle" size={24} color="#007AFF" />
            )}
          </View>
        </Pressable>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search exercises..."
            value={searchTerm}
            onChangeText={setSearchTerm}
            placeholderTextColor="#999"
          />
        </View>
      </View>

      {/* Category Filter */}
      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Category:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
          {CATEGORIES.map((category) => (
            <Pressable
              key={category}
              onPress={() => setSelectedCategory(category)}
              style={[
                styles.filterChip,
                selectedCategory === category && styles.selectedFilterChip
              ]}
            >
              <Text style={[
                styles.filterChipText,
                selectedCategory === category && styles.selectedFilterChipText
              ]}>
                {category}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* Equipment Filter */}
      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Equipment:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
          {EQUIPMENT_TYPES.map((equipment) => (
            <Pressable
              key={equipment}
              onPress={() => setSelectedEquipment(equipment)}
              style={[
                styles.filterChip,
                selectedEquipment === equipment && styles.selectedFilterChip
              ]}
            >
              <Text style={[
                styles.filterChipText,
                selectedEquipment === equipment && styles.selectedFilterChipText
              ]}>
                {equipment === 'All' ? 'All' : equipment.charAt(0).toUpperCase() + equipment.slice(1)}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* Selected Count */}
      {selectedExercises.length > 0 && (
        <View style={styles.selectedCountContainer}>
          <Text style={styles.selectedCountText}>
            {selectedExercises.length} exercise{selectedExercises.length !== 1 ? 's' : ''} selected
          </Text>
        </View>
      )}

      {/* Exercise List */}
      <FlatList
        data={filteredExercises}
        renderItem={ExerciseItem}
        keyExtractor={(item) => item.id}
        style={styles.exerciseList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.exerciseListContent}
      />

      {/* Start Workout Button */}
      {selectedExercises.length > 0 && (
        <View style={styles.startWorkoutContainer}>
          <View style={styles.startWorkoutButton}>
            <Pressable
              onPress={startWorkout}
              style={styles.startWorkoutPressable}
            >
              <Ionicons name="play-circle" size={24} color="#fff" />
              <Text style={styles.startWorkoutText}>Start Workout</Text>
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
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontSize: 16,
    color: '#333',
  },
  filterContainer: {
    paddingLeft: 16,
    marginBottom: 12,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  filterScroll: {
    flexGrow: 0,
  },
  filterChip: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e1e5e9',
  },
  selectedFilterChip: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  filterChipText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  selectedFilterChipText: {
    color: '#fff',
  },
  selectedCountContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  selectedCountText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
  },
  exerciseList: {
    flex: 1,
  },
  exerciseListContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  exerciseItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    overflow: 'hidden',
  },
  selectedExercise: {
    borderColor: '#007AFF',
    borderWidth: 2,
  },
  exerciseContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  exerciseIconContainer: {
    marginRight: 12,
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
  selectedExerciseName: {
    color: '#007AFF',
  },
  exerciseDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  exerciseCategory: {
    fontSize: 14,
    color: '#666',
  },
  exerciseDivider: {
    fontSize: 14,
    color: '#999',
    marginHorizontal: 8,
  },
  exerciseMuscleGroup: {
    fontSize: 14,
    color: '#666',
  },
  selectionIndicator: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startWorkoutContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#e1e5e9',
  },
  startWorkoutButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    overflow: 'hidden',
  },
  startWorkoutPressable: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  startWorkoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default ExerciseSelectionScreen;