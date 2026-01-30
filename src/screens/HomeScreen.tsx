import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();

  const handleStartWorkout = () => {
    navigation.navigate('ExerciseSelection' as never);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Ready to train?</Text>
          <Text style={styles.subtitle}>Start your workout journey</Text>
        </View>

        {/* Main Action Button */}
        <View style={styles.buttonContainer}>
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            style={styles.gradientButton}
          >
            <Pressable
              style={styles.startButton}
              onPress={handleStartWorkout}
            >
              <View style={styles.buttonContent}>
                <Ionicons name="barbell" size={32} color="#fff" />
                <Text style={styles.buttonTitle}>Start Empty Workout</Text>
                <Text style={styles.buttonSubtitle}>Begin tracking your exercises</Text>
              </View>
            </Pressable>
          </LinearGradient>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Workouts</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>3.2k</Text>
            <Text style={styles.statLabel}>Calories</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>45m</Text>
            <Text style={styles.statLabel}>Avg Duration</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 60,
  },
  greeting: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  buttonContainer: {
    marginBottom: 60,
  },
  gradientButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  startButton: {
    padding: 0,
  },
  buttonContent: {
    paddingVertical: 40,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  buttonTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 12,
    marginBottom: 4,
  },
  buttonSubtitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
});

export default HomeScreen;