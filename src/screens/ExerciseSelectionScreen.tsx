import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Pressable,
  SafeAreaView,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Exercise {
  id: string;
  name: string;
  category: string;
  equipment: 'bodyweight' | 'dumbbells' | 'barbell' | 'machine' | 'cable';
}

const EXERCISES: Exercise[] = [
  // Chest
  { id: '1', name: 'Push-ups', category: 'Chest', equipment: 'bodyweight' },
  { id: '2', name: 'Bench Press', category: 'Chest', equipment: 'barbell' },
  { id: '3', name: 'Incline Bench Press', category: 'Chest', equipment: 'barbell' },
  { id: '4', name: 'Dumbbell Flyes', category: 'Chest', equipment: 'dumbbells' },
  { id: '5', name: 'Chest Press Machine', category: 'Chest', equipment: 'machine' },
  { id: '6', name: 'Cable Crossover', category: 'Chest', equipment: 'cable' },
  { id: '7', name: 'Dips', category: 'Chest', equipment: 'bodyweight' },
  { id: '8', name: 'Decline Bench Press', category: 'Chest', equipment: 'barbell' },

  // Back
  { id: '9', name: 'Pull-ups', category: 'Back', equipment: 'bodyweight' },
  { id: '10', name: 'Deadlift', category: 'Back', equipment: 'barbell' },
  { id: '11', name: 'Bent-over Row', category: 'Back', equipment: 'barbell' },
  { id: '12', name: 'Lat Pulldown', category: 'Back', equipment: 'machine' },
  { id: '13', name: 'Seated Cable Row', category: 'Back', equipment: 'cable' },
  { id: '14', name: 'T-bar Row', category: 'Back', equipment: 'machine' },
  { id: '15', name: 'Single-arm Dumbbell Row', category: 'Back', equipment: 'dumbbells' },
  { id: '16', name: 'Hyperextension', category: 'Back', equipment: 'machine' },

  // Shoulders
  { id: '17', name: 'Shoulder Press', category: 'Shoulders', equipment: 'dumbbells' },
  { id: '18', name: 'Military Press', category: 'Shoulders', equipment: 'barbell' },
  { id: '19', name: 'Lateral Raises', category: 'Shoulders', equipment: 'dumbbells' },
  { id: '20', name: 'Front Raises', category: 'Shoulders', equipment: 'dumbbells' },
  { id: '21', name: 'Rear Delt Flyes', category: 'Shoulders', equipment: 'dumbbells' },
  { id: '22', name: 'Arnold Press', category: 'Shoulders', equipment: 'dumbbells' },
  { id: '23', name: 'Upright Row', category: 'Shoulders', equipment: 'barbell' },
  { id: '24', name: 'Pike Push-ups', category: 'Shoulders', equipment: 'bodyweight' },

  // Arms
  { id: '25', name: 'Bicep Curls', category: 'Arms', equipment: 'dumbbells' },
  { id: '26', name: 'Hammer Curls', category: 'Arms', equipment: 'dumbbells' },
  { id: '27', name: 'Tricep Dips', category: 'Arms', equipment: 'bodyweight' },
  { id: '28', name: 'Overhead Tricep Extension', category: 'Arms', equipment: 'dumbbells' },
  { id: '29', name: 'Barbell Curl', category: 'Arms', equipment: 'barbell' },
  { id: '30', name: 'Close-grip Bench Press', category: 'Arms', equipment: 'barbell' },
  { id: '31', name: 'Cable Bicep Curls', category: 'Arms', equipment: 'cable' },
  { id: '32', name: 'Tricep Pushdown', category: 'Arms', equipment: 'cable' },

  // Legs
  { id: '33', name: 'Squats', category: 'Legs', equipment: 'bodyweight' },
  { id: '34', name: 'Barbell Squat', category: 'Legs', equipment: 'barbell' },
  { id: '35', name: 'Lunges', category: 'Legs', equipment: 'bodyweight' },
  { id: '36', name: 'Leg Press', category: 'Legs', equipment: 'machine' },
  { id: '37', name: 'Leg Curls', category: 'Legs', equipment: 'machine' },
  { id: '38', name: 'Leg Extension', category: 'Legs', equipment: 'machine' },
  { id: '39', name: 'Calf Raises', category: 'Legs', equipment: 'bodyweight' },
  { id: '40', name: 'Romanian Deadlift', category: 'Legs', equipment: 'barbell' },
  { id: '41', name: 'Bulgarian Split Squats', category: 'Legs', equipment: 'bodyweight' },
  { id: '42', name: 'Walking Lunges', category: 'Legs', equipment: 'dumbbells' },

  // Core
  { id: '43', name: 'Plank', category: 'Core', equipment: 'bodyweight' },
  { id: '44', name: 'Crunches', category: 'Core', equipment: 'bodyweight' },
  { id: '45', name: 'Russian Twists', category: 'Core', equipment: 'bodyweight' },
  { id: '46', name: 'Mountain Climbers', category: 'Core', equipment: 'bodyweight' },
  { id: '47', name: 'Dead Bug', category: 'Core', equipment: 'bodyweight' },
  { id: '48', name: 'Bicycle Crunches', category: 'Core', equipment: 'bodyweight' },
  { id: '49', name: 'Leg Raises', category: 'Core', equipment: 'bodyweight' },
  { id: '50', name: 'Cable Crunches', category: 'Core', equipment: 'cable' },
];

const CATEGORIES = ['All', 'Chest', 'Back', 'Shoulders', 'Arms', 'Legs', 'Core'];

type SortType = 'alphabetical' | 'category';

interface ExerciseSelectionScreenProps {
  visible: boolean;
  onClose: () => void;
  onSelectExercise: (exercise: Exercise) => void;
}

const ExerciseSelectionScreen: React.FC<ExerciseSelectionScreenProps> = ({
  visible,
  onClose,
  onSelectExercise,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortType, setSortType] = useState<SortType>('alphabetical');

  const filteredAndSortedExercises = useMemo(() => {
    let filtered = EXERCISES.filter((exercise) => {
      const matchesSearch = exercise.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || exercise.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    if (sortType === 'alphabetical') {
      filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      filtered = filtered.sort((a, b) => a.category.localeCompare(b.category));
    }

    return filtered;
  }, [searchQuery, selectedCategory, sortType]);

  const handleExerciseSelect = (exercise: Exercise) => {
    onSelectExercise(exercise);
    onClose();
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
            <Text style={styles.exerciseCategory}>{item.category}</Text>
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
        <Ionicons name="chevron-forward" size={20} color="#ccc" />
      </Pressable>
    </View>
  );

  const renderCategoryButton = (category: string) => (
    <View key={category} style={styles.categoryButtonWrapper}>
      <Pressable
        style={[
          styles.categoryButton,
          selectedCategory === category && styles.categoryButtonActive,
        ]}
        onPress={() => setSelectedCategory(category)}
      >
        <Text
          style={[
            styles.categoryButtonText,
            selectedCategory === category && styles.categoryButtonTextActive,
          ]}
        >
          {category}
        </Text>
      </Pressable>
    </View>
  );

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Select Exercise</Text>
          <View style={styles.closeButtonWrapper}>
            <Pressable style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={24} color="#333" />
            </Pressable>
          </View>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchInputWrapper}>
            <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search exercises..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        <View style={styles.sortContainer}>
          <Text style={styles.sortLabel}>Sort by:</Text>
          <View style={styles.sortButtons}>
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
                  sortType === 'category' && styles.sortButtonActive,
                ]}
                onPress={() => setSortType('category')}
              >
                <Text
                  style={[
                    styles.sortButtonText,
                    sortType === 'category' && styles.sortButtonTextActive,
                  ]}
                >
                  Category
                </Text>
              </Pressable>
            </View>
          </View>
        </View>

        <View style={styles.categoriesContainer}>
          <FlatList
            data={CATEGORIES}
            renderItem={({ item }) => renderCategoryButton(item)}
            keyExtractor={(item) => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />
        </View>

        <FlatList
          data={filteredAndSortedExercises}
          renderItem={renderExerciseItem}
          keyExtractor={(item) => item.id}
          style={styles.exercisesList}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButtonWrapper: {
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    overflow: 'hidden',
  },
  closeButton: {
    padding: 8,
  },
  searchContainer: {
    padding: 15,
    backgroundColor: '#fff',
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  sortLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginRight: 15,
  },
  sortButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  sortButtonWrapper: {
    backgroundColor: '#e9ecef',
    borderRadius: 20,
    overflow: 'hidden',
  },
  sortButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
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
  categoriesContainer: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  categoriesList: {
    paddingHorizontal: 15,
  },
  categoryButtonWrapper: {
    backgroundColor: '#f8f9fa',
    borderRadius: 20,
    marginHorizontal: 5,
    overflow: 'hidden',
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  categoryButtonActive: {
    backgroundColor: '#007AFF',
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  categoryButtonTextActive: {
    color: '#fff',
  },
  exercisesList: {
    flex: 1,
    paddingTop: 10,
  },
  exerciseItemWrapper: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginBottom: 8,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
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
    justifyContent: 'space-between',
  },
  exerciseCategory: {
    fontSize: 14,
    color: '#666',
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
});

export default ExerciseSelectionScreen;