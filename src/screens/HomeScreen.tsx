import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  const handleRoutinePress = () => {
    // TODO: Navigate to routine creation
    setModalVisible(false);
  };

  const handleExercisePress = () => {
    // TODO: Navigate to exercise creation
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fitness Tracker</Text>
      <Text style={styles.subtitle}>Welcome to your fitness journey!</Text>
      
      <View style={styles.startWorkoutContainer}>
        <View style={styles.buttonWrapper}>
          <Pressable 
            style={styles.startWorkoutButton}
            onPress={() => setModalVisible(true)}
          >
            <Ionicons name="add-circle" size={24} color="#fff" />
            <Text style={styles.startWorkoutText}>Start Empty Workout</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>
          • Quick stats overview
        </Text>
        <Text style={styles.placeholderText}>
          • Recent workouts
        </Text>
        <Text style={styles.placeholderText}>
          • Current streak
        </Text>
        <Text style={styles.placeholderText}>
          • Quick action buttons
        </Text>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choose an option</Text>
            
            <View style={styles.modalButtonWrapper}>
              <Pressable 
                style={styles.modalButton}
                onPress={handleRoutinePress}
              >
                <Ionicons name="list" size={20} color="#fff" />
                <Text style={styles.modalButtonText}>+ Routine</Text>
              </Pressable>
            </View>

            <View style={styles.modalButtonWrapper}>
              <Pressable 
                style={styles.modalButton}
                onPress={handleExercisePress}
              >
                <Ionicons name="fitness" size={20} color="#fff" />
                <Text style={styles.modalButtonText}>+ Exercise</Text>
              </Pressable>
            </View>

            <View style={styles.cancelButtonWrapper}>
              <Pressable 
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  startWorkoutContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonWrapper: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    overflow: 'hidden',
  },
  startWorkoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    gap: 8,
  },
  startWorkoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  placeholder: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e9ecef',
    borderStyle: 'dashed',
  },
  placeholderText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    width: '80%',
    maxWidth: 300,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#333',
  },
  modalButtonWrapper: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 12,
    width: '100%',
  },
  modalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    gap: 8,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButtonWrapper: {
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 12,
    width: '100%',
  },
  cancelButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '500',
  },
});