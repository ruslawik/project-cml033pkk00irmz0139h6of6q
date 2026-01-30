import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Modal,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import ExerciseSelectionScreen from './ExerciseSelectionScreen';

interface Exercise {
  id: string;
  name: string;
  category: string;
  equipment: 'bodyweight' | 'dumbbells' | 'barbell' | 'machine' | 'cable';
}

const HomeScreen: React.FC = () => {
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [showExerciseSelection, setShowExerciseSelection] = useState(false);

  const handleExerciseSelect = (exercise: Exercise) => {
    console.log('Selected exercise:', exercise);
    // Here you can navigate to workout screen or add exercise to current workout
  };

  const QuickActionButton = ({ icon, title, onPress, color }: {
    icon: string;
    title: string;
    onPress: () => void;
    color: string;
  }) => (
    <View style={[styles.quickActionButtonWrapper, { backgroundColor: color }]}>
      <Pressable style={styles.quickActionButton} onPress={onPress}>
        <Ionicons name={icon as any} size={24} color="#fff" />
        <Text style={styles.quickActionText}>{title}</Text>
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning!</Text>
            <Text style={styles.username}>Ready for your workout?</Text>
          </View>
          <View style={styles.notificationWrapper}>
            <Pressable style={styles.notificationButton}>
              <Ionicons name="notifications-outline" size={24} color="#333" />
            </Pressable>
          </View>
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
            <Text style={styles.statLabel}>Duration</Text>
          </View>
        </View>

        {/* Today's Plan */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Plan</Text>
          <View style={styles.planCardWrapper}>
            <LinearGradient
              colors={['#667eea', '#764ba2']}
              style={styles.planCard}
            >
              <View style={styles.planContent}>
                <Text style={styles.planTitle}>Upper Body Strength</Text>
                <Text style={styles.planDescription}>
                  Focus on chest, shoulders, and arms
                </Text>
                <Text style={styles.planTime}>45 minutes • 8 exercises</Text>
              </View>
              <Ionicons name="fitness" size={40} color="#fff" style={styles.planIcon} />
            </LinearGradient>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.addButtonWrapper}>
              <Pressable
                style={styles.addButton}
                onPress={() => setShowQuickActions(true)}
              >
                <Ionicons name="add" size={20} color="#007AFF" />
              </Pressable>
            </View>
          </View>
          
          <View style={styles.quickActionsGrid}>
            <QuickActionButton
              icon="barbell"
              title="Start Workout"
              onPress={() => console.log('Start workout')}
              color="#FF6B6B"
            />
            <QuickActionButton
              icon="time"
              title="Quick Timer"
              onPress={() => console.log('Quick timer')}
              color="#4ECDC4"
            />
            <QuickActionButton
              icon="stats-chart"
              title="View Progress"
              onPress={() => console.log('View progress')}
              color="#45B7D1"
            />
            <QuickActionButton
              icon="nutrition"
              title="Log Meal"
              onPress={() => console.log('Log meal')}
              color="#96CEB4"
            />
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityList}>
            <View style={styles.activityItem}>
              <View style={styles.activityIconWrapper}>
                <Ionicons name="barbell" size={20} color="#007AFF" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Push Day Workout</Text>
                <Text style={styles.activityDescription}>
                  Completed • 42 minutes ago
                </Text>
              </View>
            </View>
            
            <View style={styles.activityItem}>
              <View style={styles.activityIconWrapper}>
                <Ionicons name="trophy" size={20} color="#FFD700" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>New Personal Record</Text>
                <Text style={styles.activityDescription}>
                  Bench Press: 80kg • Yesterday
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Quick Actions Modal */}
      <Modal
        visible={showQuickActions}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowQuickActions(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Quick Actions</Text>
              <View style={styles.modalCloseWrapper}>
                <Pressable
                  style={styles.modalCloseButton}
                  onPress={() => setShowQuickActions(false)}
                >
                  <Ionicons name="close" size={24} color="#333" />
                </Pressable>
              </View>
            </View>
            
            <View style={styles.modalContent}>
              <QuickActionButton
                icon="barbell"
                title="Exercise"
                onPress={() => {
                  setShowQuickActions(false);
                  setShowExerciseSelection(true);
                }}
                color="#FF6B6B"
              />
              <QuickActionButton
                icon="timer"
                title="Timer"
                onPress={() => {
                  setShowQuickActions(false);
                  console.log('Timer');
                }}
                color="#4ECDC4"
              />
              <QuickActionButton
                icon="nutrition"
                title="Meal"
                onPress={() => {
                  setShowQuickActions(false);
                  console.log('Meal');
                }}
                color="#96CEB4"
              />
              <QuickActionButton
                icon="water"
                title="Water"
                onPress={() => {
                  setShowQuickActions(false);
                  console.log('Water');
                }}
                color="#74B9FF"
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* Exercise Selection Screen */}
      <ExerciseSelectionScreen
        visible={showExerciseSelection}
        onClose={() => setShowExerciseSelection(false)}
        onSelectExercise={handleExerciseSelect}
      />
    </SafeAreaView>
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
    paddingTop: 20,
    paddingBottom: 10,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  username: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  notificationWrapper: {
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  notificationButton: {
    padding: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginVertical: 20,
    paddingVertical: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  addButtonWrapper: {
    backgroundColor: '#f0f8ff',
    borderRadius: 16,
    overflow: 'hidden',
  },
  addButton: {
    padding: 8,
  },
  planCardWrapper: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  planCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  planContent: {
    flex: 1,
  },
  planTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  planDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  planTime: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 8,
  },
  planIcon: {
    opacity: 0.3,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  quickActionButtonWrapper: {
    width: '48%',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  quickActionButton: {
    alignItems: 'center',
    padding: 20,
  },
  quickActionText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
  },
  activityList: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  activityIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  activityDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  modalCloseWrapper: {
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    overflow: 'hidden',
  },
  modalCloseButton: {
    padding: 8,
  },
  modalContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 12,
  },
});

export default HomeScreen;