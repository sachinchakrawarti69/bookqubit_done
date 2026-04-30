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
  FontAwesome5,
} from '@expo/vector-icons';

import themes from '@/src/themes';
import { useThemeStore } from '@/store/themeStore';
import { useState } from 'react';

export default function SettingsScreen() {
  const { currentTheme, setTheme } = useThemeStore();
  const theme = themes[currentTheme];

  const [notifications, setNotifications] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [autoPlayNext, setAutoPlayNext] = useState(false);
  const [downloadOnlyWifi, setDownloadOnlyWifi] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);

  const [readingFont, setReadingFont] = useState('System');
  const [fontSize, setFontSize] = useState('Medium');
  const [lineSpacing, setLineSpacing] = useState('Normal');

  const readingPreferences = [
    { label: 'Default Font', value: readingFont, icon: 'text' },
    { label: 'Font Size', value: fontSize, icon: 'format-size' },
    { label: 'Line Spacing', value: lineSpacing, icon: 'format-line-spacing' },
  ];

  const themeOptions = [
    { id: 'light', name: 'Light', icon: 'sunny', color: '#FFD700' },
    { id: 'dark', name: 'Dark', icon: 'moon', color: '#6366F1' },
    { id: 'ocean', name: 'Ocean', icon: 'water', color: '#0EA5E9' },
    { id: 'sunset', name: 'Sunset', icon: 'sunny', color: '#F59E0B' },
    { id: 'forest', name: 'Forest', icon: 'leaf', color: '#10B981' },
  ];

  const handleThemeChange = (themeId: string) => {
    setTheme(themeId);
    Alert.alert('Theme Changed', `Switched to ${themeId} theme`);
  };

  const handleClearCache = () => {
    Alert.alert(
      'Clear Cache',
      'This will clear temporary files and downloaded content. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear', 
          style: 'destructive',
          onPress: () => Alert.alert('Success', 'Cache cleared successfully')
        },
      ]
    );
  };

  const handleResetSettings = () => {
    Alert.alert(
      'Reset Settings',
      'Are you sure you want to reset all settings to default?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Reset', 
          style: 'destructive',
          onPress: () => Alert.alert('Success', 'Settings reset to default')
        },
      ]
    );
  };

  const handleReportIssue = () => {
    Alert.alert('Report Issue', 'Please describe the issue you\'re facing');
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
          Settings
        </Text>
        
        <Text
          style={[
            styles.subtitle,
            { color: theme.colors.textSecondary },
          ]}
        >
          Customize your reading experience
        </Text>
      </View>

      {/* THEMES SECTION */}
      <View style={styles.section}>
        <Text
          style={[
            styles.sectionTitle,
            { color: theme.colors.textPrimary },
          ]}
        >
          Themes
        </Text>
        
        <View style={styles.themesGrid}>
          {themeOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.themeCard,
                {
                  backgroundColor: theme.colors.surface,
                  borderColor: currentTheme === option.id 
                    ? theme.colors.primary 
                    : theme.colors.border,
                  borderWidth: currentTheme === option.id ? 2 : 1,
                },
              ]}
              onPress={() => handleThemeChange(option.id)}
            >
              <View
                style={[
                  styles.themeIcon,
                  { backgroundColor: option.color + '20' },
                ]}
              >
                <Ionicons
                  name={option.icon as any}
                  size={24}
                  color={option.color}
                />
              </View>
              <Text
                style={[
                  styles.themeName,
                  { color: theme.colors.textPrimary },
                ]}
              >
                {option.name}
              </Text>
              {currentTheme === option.id && (
                <View style={[styles.activeBadge, { backgroundColor: theme.colors.primary }]}>
                  <Ionicons name="checkmark" size={14} color="#fff" />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* READING PREFERENCES */}
      <View style={styles.section}>
        <Text
          style={[
            styles.sectionTitle,
            { color: theme.colors.textPrimary },
          ]}
        >
          Reading Preferences
        </Text>
        
        {readingPreferences.map((pref, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.settingItem,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
              },
            ]}
            onPress={() => Alert.alert(pref.label, `Change ${pref.label} setting`)}
          >
            <View style={styles.settingLeft}>
              <MaterialIcons
                name={pref.icon as any}
                size={22}
                color={theme.colors.primary}
              />
              <Text
                style={[
                  styles.settingText,
                  { color: theme.colors.textPrimary },
                ]}
              >
                {pref.label}
              </Text>
            </View>
            <View style={styles.settingRight}>
              <Text
                style={[
                  styles.settingValue,
                  { color: theme.colors.textSecondary },
                ]}
              >
                {pref.value}
              </Text>
              <Feather
                name="chevron-right"
                size={20}
                color={theme.colors.icon}
              />
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* APP PREFERENCES */}
      <View style={styles.section}>
        <Text
          style={[
            styles.sectionTitle,
            { color: theme.colors.textPrimary },
          ]}
        >
          App Preferences
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
          <View style={styles.preferenceItem}>
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

          <View style={styles.preferenceItem}>
            <View style={styles.settingLeft}>
              <Ionicons
                name="volume-high"
                size={22}
                color={theme.colors.primary}
              />
              <Text
                style={[
                  styles.settingText,
                  { color: theme.colors.textPrimary },
                ]}
              >
                Sound Effects
              </Text>
            </View>
            <Switch
              value={soundEffects}
              onValueChange={setSoundEffects}
              trackColor={{ false: '#767577', true: theme.colors.primary }}
              thumbColor={soundEffects ? '#fff' : '#f4f3f4'}
            />
          </View>

          <View style={styles.preferenceItem}>
            <View style={styles.settingLeft}>
              <Ionicons
                name="play-skip-forward"
                size={22}
                color={theme.colors.primary}
              />
              <Text
                style={[
                  styles.settingText,
                  { color: theme.colors.textPrimary },
                ]}
              >
                Auto-play Next Chapter
              </Text>
            </View>
            <Switch
              value={autoPlayNext}
              onValueChange={setAutoPlayNext}
              trackColor={{ false: '#767577', true: theme.colors.primary }}
              thumbColor={autoPlayNext ? '#fff' : '#f4f3f4'}
            />
          </View>

          <View style={styles.preferenceItem}>
            <View style={styles.settingLeft}>
              <Ionicons
                name="download"
                size={22}
                color={theme.colors.primary}
              />
              <Text
                style={[
                  styles.settingText,
                  { color: theme.colors.textPrimary },
                ]}
              >
                Download Only on Wi-Fi
              </Text>
            </View>
            <Switch
              value={downloadOnlyWifi}
              onValueChange={setDownloadOnlyWifi}
              trackColor={{ false: '#767577', true: theme.colors.primary }}
              thumbColor={downloadOnlyWifi ? '#fff' : '#f4f3f4'}
            />
          </View>

          <View style={styles.preferenceItem}>
            <View style={styles.settingLeft}>
              <MaterialIcons
                name="accessibility-new"
                size={22}
                color={theme.colors.primary}
              />
              <Text
                style={[
                  styles.settingText,
                  { color: theme.colors.textPrimary },
                ]}
              >
                Reduce Motion
              </Text>
            </View>
            <Switch
              value={reduceMotion}
              onValueChange={setReduceMotion}
              trackColor={{ false: '#767577', true: theme.colors.primary }}
              thumbColor={reduceMotion ? '#fff' : '#f4f3f4'}
            />
          </View>

          <View style={styles.preferenceItem}>
            <View style={styles.settingLeft}>
              <FontAwesome5
                name="chart-line"
                size={20}
                color={theme.colors.primary}
              />
              <Text
                style={[
                  styles.settingText,
                  { color: theme.colors.textPrimary },
                ]}
              >
                Analytics & Usage Data
              </Text>
            </View>
            <Switch
              value={analyticsEnabled}
              onValueChange={setAnalyticsEnabled}
              trackColor={{ false: '#767577', true: theme.colors.primary }}
              thumbColor={analyticsEnabled ? '#fff' : '#f4f3f4'}
            />
          </View>
        </View>
      </View>

      {/* DATA & STORAGE */}
      <View style={styles.section}>
        <Text
          style={[
            styles.sectionTitle,
            { color: theme.colors.textPrimary },
          ]}
        >
          Data & Storage
        </Text>
        
        <TouchableOpacity
          style={[
            styles.actionButton,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
            },
          ]}
          onPress={handleClearCache}
        >
          <Ionicons
            name="trash-bin"
            size={22}
            color={theme.colors.primary}
          />
          <Text
            style={[
              styles.actionButtonText,
              { color: theme.colors.textPrimary },
            ]}
          >
            Clear Cache
          </Text>
          <Text
            style={[
              styles.actionButtonValue,
              { color: theme.colors.textSecondary },
            ]}
          >
            24.5 MB
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.actionButton,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
            },
          ]}
          onPress={() => Alert.alert('Storage Info', 'Total storage used: 156 MB')}
        >
          <Ionicons
            name="hardware-chip"
            size={22}
            color={theme.colors.primary}
          />
          <Text
            style={[
              styles.actionButtonText,
              { color: theme.colors.textPrimary },
            ]}
          >
            Storage Information
          </Text>
          <Feather
            name="chevron-right"
            size={20}
            color={theme.colors.icon}
          />
        </TouchableOpacity>
      </View>

      {/* SUPPORT */}
      <View style={styles.section}>
        <Text
          style={[
            styles.sectionTitle,
            { color: theme.colors.textPrimary },
          ]}
        >
          Support
        </Text>
        
        <TouchableOpacity
          style={[
            styles.actionButton,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
            },
          ]}
          onPress={handleReportIssue}
        >
          <Ionicons
            name="bug"
            size={22}
            color={theme.colors.primary}
          />
          <Text
            style={[
              styles.actionButtonText,
              { color: theme.colors.textPrimary },
            ]}
          >
            Report an Issue
          </Text>
          <Feather
            name="chevron-right"
            size={20}
            color={theme.colors.icon}
          />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.actionButton,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
            },
          ]}
          onPress={() => Alert.alert('Rate App', 'Thank you for your feedback!')}
        >
          <Ionicons
            name="star"
            size={22}
            color={theme.colors.primary}
          />
          <Text
            style={[
              styles.actionButtonText,
              { color: theme.colors.textPrimary },
            ]}
          >
            Rate BookQubit
          </Text>
          <Feather
            name="chevron-right"
            size={20}
            color={theme.colors.icon}
          />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.actionButton,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
            },
          ]}
          onPress={() => Alert.alert('About', 'BookQubit Version 1.0.0')}
        >
          <Ionicons
            name="information-circle"
            size={22}
            color={theme.colors.primary}
          />
          <Text
            style={[
              styles.actionButtonText,
              { color: theme.colors.textPrimary },
            ]}
          >
            About
          </Text>
          <Feather
            name="chevron-right"
            size={20}
            color={theme.colors.icon}
          />
        </TouchableOpacity>
      </View>

      {/* DANGER ZONE */}
      <View style={styles.section}>
        <Text
          style={[
            styles.sectionTitle,
            { color: '#FF4444' },
          ]}
        >
          Danger Zone
        </Text>
        
        <TouchableOpacity
          style={[
            styles.dangerButton,
            {
              backgroundColor: theme.colors.surface,
              borderColor: '#FF4444',
            },
          ]}
          onPress={handleResetSettings}
        >
          <Ionicons
            name="refresh"
            size={22}
            color="#FF4444"
          />
          <Text
            style={[
              styles.dangerButtonText,
              { color: '#FF4444' },
            ]}
          >
            Reset All Settings
          </Text>
        </TouchableOpacity>
      </View>

      {/* FOOTER */}
      <View style={styles.footer}>
        <Text
          style={[
            styles.version,
            { color: theme.colors.textSecondary },
          ]}
        >
          Version 1.0.0 (Build 2024.001)
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

  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },

  themesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },

  themeCard: {
    width: '30%',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    position: 'relative',
  },

  themeIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },

  themeName: {
    fontSize: 14,
    fontWeight: '600',
  },

  activeBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
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

  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  settingValue: {
    fontSize: 14,
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

  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 12,
    gap: 12,
  },

  actionButtonText: {
    flex: 1,
    fontSize: 16,
  },

  actionButtonValue: {
    fontSize: 14,
    marginRight: 8,
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

  version: {
    fontSize: 12,
  },
});