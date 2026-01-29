import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProgressTrackerScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Progress Tracker</Text>
      <Text style={styles.subtitle}>Monitor your fitness journey</Text>
      <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>
          • Workout history charts
        </Text>
        <Text style={styles.placeholderText}>
          • Strength progression graphs
        </Text>
        <Text style={styles.placeholderText}>
          • Weekly/monthly summaries
        </Text>
        <Text style={styles.placeholderText}>
          • Personal records
        </Text>
        <Text style={styles.placeholderText}>
          • Body measurements tracking
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