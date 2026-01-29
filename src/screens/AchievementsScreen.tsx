import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AchievementsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Achievements</Text>
      <Text style={styles.subtitle}>Celebrate your fitness milestones</Text>
      <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>
          • Workout streak badges
        </Text>
        <Text style={styles.placeholderText}>
          • Weight lifting milestones
        </Text>
        <Text style={styles.placeholderText}>
          • Consistency rewards
        </Text>
        <Text style={styles.placeholderText}>
          • Personal best celebrations
        </Text>
        <Text style={styles.placeholderText}>
          • Social sharing features
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