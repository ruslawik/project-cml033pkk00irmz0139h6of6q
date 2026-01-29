import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function WorkoutLogScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workout Log</Text>
      <Text style={styles.subtitle}>Track your exercises and sets</Text>
      <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>
          • Add new workout button
        </Text>
        <Text style={styles.placeholderText}>
          • Exercise selection
        </Text>
        <Text style={styles.placeholderText}>
          • Sets and reps tracking
        </Text>
        <Text style={styles.placeholderText}>
          • Weight logging
        </Text>
        <Text style={styles.placeholderText}>
          • Workout timer
        </Text>
      </View>
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
});