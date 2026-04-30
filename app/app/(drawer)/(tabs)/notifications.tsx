import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';

import {
  Ionicons,
  Feather,
  MaterialIcons,
} from '@expo/vector-icons';

import themes from '@/src/themes';
import { useThemeStore } from '@/store/themeStore';
import { useState } from 'react';

export default function NotificationsScreen() {
  const { currentTheme } = useThemeStore();
  const theme = themes[currentTheme];

  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);

  const [preferences, setPreferences] = useState({
    newBooks: true,
    readingReminders: true,
    achievements: true,
    recommendations: false,
    newsletter: false,
    promotions: false,
  });

  const notifications = [
    {
      id: 1,
      title: 'New book recommendation',
      message: 'Based on your reading history, you might enjoy "Atomic Habits"',
      time: '2 hours ago',
      type: 'recommendation',
      read: false,
      icon: '📚',
    },
    {
      id: 2,
      title: 'Reading streak milestone!',
      message: 'Congratulations! You\'ve maintained a 7-day reading streak 🎉',
      time: 'Yesterday',
      type: 'achievement',
      read: false,
      icon: '🔥',
    },
    {
      id: 3,
      title: 'New feature alert',
      message: 'Dark mode themes are now available! Try Ocean and Forest themes.',
      time: '2 days ago',
      type: 'feature',
      read: true,
      icon: '✨',
    },
    {
      id: 4,
      title: 'Book club invitation',
      message: 'Join the "Philosophy Readers" book club discussion on "Meditations"',
      time: '3 days ago',
      type: 'social',
      read: true,
      icon: '👥',
    },
    {
      id: 5,
      title: 'Weekly reading summary',
      message: 'You read 245 pages this week! That\'s 15% more than last week.',
      time: '5 days ago',
      type: 'summary',
      read: true,
      icon: '📊',
    },
  ];

  const togglePreference = (key: keyof typeof preferences) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const markAsRead = (id: number) => {
    Alert.alert('Mark as read', 'This notification has been marked as read');
  };

  const clearAll = () => {
    Alert.alert(
      'Clear All Notifications',
      'Are you sure you want to clear all notifications?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear All', 
          style: 'destructive',
          onPress: () => Alert.alert('Success', 'All notifications cleared')
        },
      ]
    );
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'recommendation':
        return theme.colors.primary;
      case 'achievement':
        return '#FFC107';
      case 'feature':
        return '#4CAF50';
      case 'social':
        return '#9C27B0';
      case 'summary':
        return '#2196F3';
      default:
        return theme.colors.icon;
    }
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <Text
          style={[
            styles.title,
            { color: theme.colors.textPrimary },
          ]}
        >
          Notifications
        </Text>
        
        <Text
          style={[
            styles.subtitle,
            { color: theme.colors.textSecondary },
          ]}
        >
          Stay updated with your reading journey
        </Text>
      </View>

      {/* NOTIFICATION PREFERENCES */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text
            style={[
              styles.sectionTitle,
              { color: theme.colors.textPrimary },
            ]}
          >
            Notification Preferences
          </Text>
          <TouchableOpacity onPress={() => Alert.alert('Settings', 'Notification settings')}>
            <Feather
              name="settings"
              size={20}
              color={theme.colors.icon}
            />
          </TouchableOpacity>
        </View>

        <View
          style={[
            styles.preferenceCard,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
            },
          ]}
        >
          <View style={styles.preferenceItem}>
            <View style={styles.preferenceLeft}>
              <Ionicons
                name="notifications"
                size={22}
                color={theme.colors.primary}
              />
              <Text
                style={[
                  styles.preferenceText,
                  { color: theme.colors.textPrimary },
                ]}
              >
                Push Notifications
              </Text>
            </View>
            <Switch
              value={pushEnabled}
              onValueChange={setPushEnabled}
              trackColor={{ false: '#767577', true: theme.colors.primary }}
              thumbColor={pushEnabled ? '#fff' : '#f4f3f4'}
            />
          </View>

          <View style={styles.preferenceItem}>
            <View style={styles.preferenceLeft}>
              <Ionicons
                name="mail"
                size={22}
                color={theme.colors.primary}
              />
              <Text
                style={[
                  styles.preferenceText,
                  { color: theme.colors.textPrimary },
                ]}
              >
                Email Notifications
              </Text>
            </View>
            <Switch
              value={emailEnabled}
              onValueChange={setEmailEnabled}
              trackColor={{ false: '#767577', true: theme.colors.primary }}
              thumbColor={emailEnabled ? '#fff' : '#f4f3f4'}
            />
          </View>

          <View style={styles.preferenceItem}>
            <View style={styles.preferenceLeft}>
              <Ionicons
                name="volume-high"
                size={22}
                color={theme.colors.primary}
              />
              <Text
                style={[
                  styles.preferenceText,
                  { color: theme.colors.textPrimary },
                ]}
              >
                Sound
              </Text>
            </View>
            <Switch
              value={soundEnabled}
              onValueChange={setSoundEnabled}
              trackColor={{ false: '#767577', true: theme.colors.primary }}
              thumbColor={soundEnabled ? '#fff' : '#f4f3f4'}
            />
          </View>

          <View style={styles.preferenceItem}>
            <View style={styles.preferenceLeft}>
              <MaterialIcons
                name="vibration"
                size={22}
                color={theme.colors.primary}
              />
              <Text
                style={[
                  styles.preferenceText,
                  { color: theme.colors.textPrimary },
                ]}
              >
                Vibration
              </Text>
            </View>
            <Switch
              value={vibrationEnabled}
              onValueChange={setVibrationEnabled}
              trackColor={{ false: '#767577', true: theme.colors.primary }}
              thumbColor={vibrationEnabled ? '#fff' : '#f4f3f4'}
            />
          </View>
        </View>
      </View>

      {/* WHAT TO NOTIFY */}
      <View style={styles.section}>
        <Text
          style={[
            styles.sectionTitle,
            { color: theme.colors.textPrimary },
          ]}
        >
          Notify me about
        </Text>

        <View
          style={[
            styles.preferenceCard,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
            },
          ]}
        >
          {Object.entries(preferences).map(([key, value]) => (
            <View key={key} style={styles.preferenceItem}>
              <Text
                style={[
                  styles.preferenceText,
                  { color: theme.colors.textPrimary },
                ]}
              >
                {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
              </Text>
              <Switch
                value={value}
                onValueChange={() => togglePreference(key as keyof typeof preferences)}
                trackColor={{ false: '#767577', true: theme.colors.primary }}
                thumbColor={value ? '#fff' : '#f4f3f4'}
              />
            </View>
          ))}
        </View>
      </View>

      {/* RECENT NOTIFICATIONS */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text
            style={[
              styles.sectionTitle,
              { color: theme.colors.textPrimary },
            ]}
          >
            Recent Notifications
          </Text>
          <TouchableOpacity onPress={clearAll}>
            <Text
              style={[
                styles.clearText,
                { color: theme.colors.primary },
              ]}
            >
              Clear All
            </Text>
          </TouchableOpacity>
        </View>

        {notifications.map((notification) => (
          <TouchableOpacity
            key={notification.id}
            style={[
              styles.notificationCard,
              {
                backgroundColor: notification.read 
                  ? theme.colors.surface 
                  : theme.colors.surface + '80',
                borderColor: theme.colors.border,
                borderLeftColor: getNotificationColor(notification.type),
              },
            ]}
            onPress={() => markAsRead(notification.id)}
          >
            <View style={styles.notificationIcon}>
              <Text style={styles.notificationIconText}>
                {notification.icon}
              </Text>
            </View>
            
            <View style={styles.notificationContent}>
              <View style={styles.notificationHeader}>
                <Text
                  style={[
                    styles.notificationTitle,
                    {
                      color: theme.colors.textPrimary,
                      fontWeight: notification.read ? '500' : '700',
                    },
                  ]}
                >
                  {notification.title}
                </Text>
                {!notification.read && (
                  <View
                    style={[
                      styles.unreadBadge,
                      { backgroundColor: theme.colors.primary },
                    ]}
                  />
                )}
              </View>
              
              <Text
                style={[
                  styles.notificationMessage,
                  { color: theme.colors.textSecondary },
                ]}
              >
                {notification.message}
              </Text>
              
              <Text
                style={[
                  styles.notificationTime,
                  { color: theme.colors.textSecondary + '80' },
                ]}
              >
                {notification.time}
              </Text>
            </View>
            
            <Feather
              name="more-horizontal"
              size={18}
              color={theme.colors.icon}
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* EMPTY STATE (if no notifications) */}
      {notifications.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateIcon}>🔔</Text>
          <Text
            style={[
              styles.emptyStateTitle,
              { color: theme.colors.textPrimary },
            ]}
          >
            No Notifications
          </Text>
          <Text
            style={[
              styles.emptyStateText,
              { color: theme.colors.textSecondary },
            ]}
          >
            You're all caught up! New notifications will appear here.
          </Text>
        </View>
      )}

      {/* FOOTER */}
      <View style={styles.footer}>
        <Text
          style={[
            styles.footerText,
            { color: theme.colors.textSecondary },
          ]}
        >
          Stay tuned for updates and reading insights 📖
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },

  title: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 15,
    lineHeight: 22,
  },

  section: {
    marginTop: 8,
    paddingHorizontal: 20,
    marginBottom: 24,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
  },

  clearText: {
    fontSize: 14,
    fontWeight: '600',
  },

  preferenceCard: {
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
  },

  preferenceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },

  preferenceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  preferenceText: {
    fontSize: 16,
  },

  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderLeftWidth: 4,
    marginBottom: 12,
  },

  notificationIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  notificationIconText: {
    fontSize: 28,
  },

  notificationContent: {
    flex: 1,
  },

  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 8,
  },

  notificationTitle: {
    fontSize: 16,
    flex: 1,
  },

  unreadBadge: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },

  notificationMessage: {
    fontSize: 13,
    marginBottom: 6,
    lineHeight: 18,
  },

  notificationTime: {
    fontSize: 11,
  },

  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },

  emptyStateIcon: {
    fontSize: 64,
    marginBottom: 16,
  },

  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },

  emptyStateText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },

  footer: {
    alignItems: 'center',
    paddingVertical: 32,
  },

  footerText: {
    fontSize: 13,
  },
});