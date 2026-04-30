import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
  Alert,
} from 'react-native';

import {
  Ionicons,
  Feather,
  MaterialIcons,
  FontAwesome5,
} from '@expo/vector-icons';

import themes from '@/src/themes';
import { useThemeStore } from '@/store/themeStore';
import { useState } from 'react';

export default function ProfileScreen() {
  const { currentTheme, setTheme } = useThemeStore();
  const theme = themes[currentTheme];
  
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(false);
  const [darkMode, setDarkMode] = useState(currentTheme === 'dark');

  const userStats = {
    booksRead: 42,
    readingStreak: 15,
    totalHours: 128,
    badges: 8,
  };

  const readingGoals = {
    yearly: 50,
    completed: 42,
    percentage: 84,
  };

  const recentActivities = [
    {
      id: 1,
      type: 'finished',
      book: 'Atomic Habits',
      date: '2 days ago',
      icon: 'checkmark-circle',
      color: '#4CAF50',
    },
    {
      id: 2,
      type: 'started',
      book: 'Deep Work',
      date: '5 days ago',
      icon: 'play-circle',
      color: '#2196F3',
    },
    {
      id: 3,
      type: 'reviewed',
      book: 'The Psychology of Money',
      date: '1 week ago',
      icon: 'star',
      color: '#FFC107',
    },
    {
      id: 4,
      type: 'shared',
      book: 'Sapiens',
      date: '2 weeks ago',
      icon: 'share-social',
      color: '#9C27B0',
    },
  ];

  const handleDarkModeToggle = (value: boolean) => {
    setDarkMode(value);
    setTheme(value ? 'dark' : 'light');
  };

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'This feature will be available soon!');
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: () => Alert.alert('Logged out', 'You have been logged out successfully')
        },
      ]
    );
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* HEADER WITH COVER IMAGE */}
      <View style={styles.coverContainer}>
        <View
          style={[
            styles.coverImage,
            { backgroundColor: theme.colors.primary + '30' },
          ]}
        >
          <View style={styles.coverOverlay} />
        </View>
        
        {/* PROFILE INFO */}
        <View style={styles.profileInfo}>
          <View
            style={[
              styles.avatarContainer,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.primary,
              },
            ]}
          >
            <Text style={styles.avatarText}>📚</Text>
          </View>
          
          <Text
            style={[
              styles.userName,
              { color: theme.colors.textPrimary },
            ]}
          >
            John Doe
          </Text>
          
          <Text
            style={[
              styles.userEmail,
              { color: theme.colors.textSecondary },
            ]}
          >
            john.doe@example.com
          </Text>
          
          <Text
            style={[
              styles.userBio,
              { color: theme.colors.textSecondary },
            ]}
          >
            Avid reader | Book lover | Knowledge seeker
          </Text>
          
          <TouchableOpacity
            style={[
              styles.editButton,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
              },
            ]}
            onPress={handleEditProfile}
          >
            <Feather
              name="edit-2"
              size={16}
              color={theme.colors.primary}
            />
            <Text
              style={[
                styles.editButtonText,
                { color: theme.colors.primary },
              ]}
            >
              Edit Profile
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* STATS CARDS */}
      <View style={styles.statsContainer}>
        <View
          style={[
            styles.statCard,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
            },
          ]}
        >
          <Ionicons
            name="book"
            size={24}
            color={theme.colors.primary}
          />
          <Text
            style={[
              styles.statNumber,
              { color: theme.colors.textPrimary },
            ]}
          >
            {userStats.booksRead}
          </Text>
          <Text
            style={[
              styles.statLabel,
              { color: theme.colors.textSecondary },
            ]}
          >
            Books Read
          </Text>
        </View>

        <View
          style={[
            styles.statCard,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
            },
          ]}
        >
          <MaterialIcons
            name="local-fire-department"
            size={24}
            color={theme.colors.primary}
          />
          <Text
            style={[
              styles.statNumber,
              { color: theme.colors.textPrimary },
            ]}
          >
            {userStats.readingStreak}
          </Text>
          <Text
            style={[
              styles.statLabel,
              { color: theme.colors.textSecondary },
            ]}
          >
            Day Streak
          </Text>
        </View>

        <View
          style={[
            styles.statCard,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
            },
          ]}
        >
          <Ionicons
            name="time"
            size={24}
            color={theme.colors.primary}
          />
          <Text
            style={[
              styles.statNumber,
              { color: theme.colors.textPrimary },
            ]}
          >
            {userStats.totalHours}
          </Text>
          <Text
            style={[
              styles.statLabel,
              { color: theme.colors.textSecondary },
            ]}
          >
            Hours Read
          </Text>
        </View>

        <View
          style={[
            styles.statCard,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
            },
          ]}
        >
          <FontAwesome5
            name="medal"
            size={22}
            color={theme.colors.primary}
          />
          <Text
            style={[
              styles.statNumber,
              { color: theme.colors.textPrimary },
            ]}
          >
            {userStats.badges}
          </Text>
          <Text
            style={[
              styles.statLabel,
              { color: theme.colors.textSecondary },
            ]}
          >
            Badges Earned
          </Text>
        </View>
      </View>

      {/* READING GOAL */}
      <View style={styles.section}>
        <Text
          style={[
            styles.sectionTitle,
            { color: theme.colors.textPrimary },
          ]}
        >
          Reading Goal 2024
        </Text>
        
        <View
          style={[
            styles.goalCard,
            {
              backgroundColor: theme.colors.surface,
            },
          ]}
        >
          <View style={styles.goalHeader}>
            <Text
              style={[
                styles.goalText,
                { color: theme.colors.textPrimary },
              ]}
            >
              {readingGoals.completed} / {readingGoals.yearly} books
            </Text>
            <Text
              style={[
                styles.goalPercentage,
                { color: theme.colors.primary },
              ]}
            >
              {readingGoals.percentage}%
            </Text>
          </View>
          
          <View
            style={[
              styles.progressBar,
              { backgroundColor: theme.colors.border },
            ]}
          >
            <View
              style={[
                styles.progressFill,
                {
                  width: `${readingGoals.percentage}%`,
                  backgroundColor: theme.colors.primary,
                },
              ]}
            />
          </View>
          
          <Text
            style={[
              styles.goalSubtext,
              { color: theme.colors.textSecondary },
            ]}
          >
            {readingGoals.yearly - readingGoals.completed} more books to reach your yearly goal!
          </Text>
        </View>
      </View>

      {/* RECENT ACTIVITY */}
      <View style={styles.section}>
        <Text
          style={[
            styles.sectionTitle,
            { color: theme.colors.textPrimary },
          ]}
        >
          Recent Activity
        </Text>
        
        {recentActivities.map((activity) => (
          <View
            key={activity.id}
            style={[
              styles.activityItem,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
              },
            ]}
          >
            <View
              style={[
                styles.activityIcon,
                { backgroundColor: activity.color + '20' },
              ]}
            >
              <Ionicons
                name={activity.icon}
                size={24}
                color={activity.color}
              />
            </View>
            
            <View style={styles.activityContent}>
              <Text
                style={[
                  styles.activityText,
                  { color: theme.colors.textPrimary },
                ]}
              >
                You {activity.type} "{activity.book}"
              </Text>
              <Text
                style={[
                  styles.activityDate,
                  { color: theme.colors.textSecondary },
                ]}
              >
                {activity.date}
              </Text>
            </View>
            
            <Feather
              name="more-horizontal"
              size={20}
              color={theme.colors.icon}
            />
          </View>
        ))}
      </View>

      {/* SETTINGS SECTION */}
      <View style={styles.section}>
        <Text
          style={[
            styles.sectionTitle,
            { color: theme.colors.textPrimary },
          ]}
        >
          Preferences
        </Text>
        
        <View
          style={[
            styles.settingItem,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
            },
          ]}
        >
          <View style={styles.settingLeft}>
            <Ionicons
              name="notifications"
              size={22}
              color={theme.colors.primary}
            />
            <Text
              style={[
                styles.settingText,
                { color: theme.colors.textPrimary },
              ]}
            >
              Push Notifications
            </Text>
          </View>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: '#767577', true: theme.colors.primary }}
            thumbColor={notifications ? '#fff' : '#f4f3f4'}
          />
        </View>
        
        <View
          style={[
            styles.settingItem,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
            },
          ]}
        >
          <View style={styles.settingLeft}>
            <Ionicons
              name="mail"
              size={22}
              color={theme.colors.primary}
            />
            <Text
              style={[
                styles.settingText,
                { color: theme.colors.textPrimary },
              ]}
            >
              Email Updates
            </Text>
          </View>
          <Switch
            value={emailUpdates}
            onValueChange={setEmailUpdates}
            trackColor={{ false: '#767577', true: theme.colors.primary }}
            thumbColor={emailUpdates ? '#fff' : '#f4f3f4'}
          />
        </View>
        
        <View
          style={[
            styles.settingItem,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
            },
          ]}
        >
          <View style={styles.settingLeft}>
            <Ionicons
              name="moon"
              size={22}
              color={theme.colors.primary}
            />
            <Text
              style={[
                styles.settingText,
                { color: theme.colors.textPrimary },
              ]}
            >
              Dark Mode
            </Text>
          </View>
          <Switch
            value={darkMode}
            onValueChange={handleDarkModeToggle}
            trackColor={{ false: '#767577', true: theme.colors.primary }}
            thumbColor={darkMode ? '#fff' : '#f4f3f4'}
          />
        </View>
      </View>

      {/* DANGER ZONE */}
      <View style={styles.section}>
        <Text
          style={[
            styles.sectionTitle,
            { color: theme.colors.textPrimary },
          ]}
        >
          Account
        </Text>
        
        <TouchableOpacity
          style={[
            styles.dangerButton,
            {
              backgroundColor: theme.colors.surface,
              borderColor: '#FF4444',
            },
          ]}
          onPress={handleLogout}
        >
          <Ionicons
            name="log-out"
            size={22}
            color="#FF4444"
          />
          <Text
            style={[
              styles.dangerButtonText,
              { color: '#FF4444' },
            ]}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </View>

      {/* FOOTER */}
      <View style={styles.footer}>
        <Text
          style={{
            color: theme.colors.textSecondary,
          }}
        >
          Version 1.0.0 • BookQubit 📚
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  coverContainer: {
    marginBottom: 20,
  },
  
  coverImage: {
    height: 150,
    width: '100%',
    position: 'relative',
  },
  
  coverOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  
  profileInfo: {
    alignItems: 'center',
    marginTop: -50,
    paddingHorizontal: 20,
  },
  
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  
  avatarText: {
    fontSize: 48,
  },
  
  userName: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 4,
  },
  
  userEmail: {
    fontSize: 14,
    marginBottom: 8,
  },
  
  userBio: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
  },
  
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    gap: 8,
  },
  
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 24,
  },
  
  statCard: {
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  
  statNumber: {
    fontSize: 28,
    fontWeight: '800',
    marginTop: 8,
  },
  
  statLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  
  section: {
    marginTop: 8,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  
  goalCard: {
    padding: 20,
    borderRadius: 20,
  },
  
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 12,
  },
  
  goalText: {
    fontSize: 16,
    fontWeight: '600',
  },
  
  goalPercentage: {
    fontSize: 18,
    fontWeight: '800',
  },
  
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 12,
  },
  
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  
  goalSubtext: {
    fontSize: 13,
  },
  
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 12,
  },
  
  activityIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  
  activityContent: {
    flex: 1,
  },
  
  activityText: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 4,
  },
  
  activityDate: {
    fontSize: 12,
  },
  
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 12,
  },
  
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  
  settingText: {
    fontSize: 16,
  },
  
  dangerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    gap: 8,
  },
  
  dangerButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  
  footer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
});