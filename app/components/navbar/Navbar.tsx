import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Platform,
} from 'react-native';

import { useState } from 'react';

import {
  Ionicons,
  Feather,
  MaterialIcons,
} from '@expo/vector-icons';

import HamburgerButton from './HamburgerButton';

import themes from '@/src/themes';

import { useThemeStore } from '@/store/themeStore';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const {
    currentTheme,
    setTheme,
  } = useThemeStore();

  const theme = themes[currentTheme];
  const insets = useSafeAreaInsets();

  const themeOptions = [
    { id: 'light', name: 'Light', icon: 'sunny' },
    { id: 'dark', name: 'Dark', icon: 'moon' },
    { id: 'ocean', name: 'Ocean', icon: 'water' },
    { id: 'forest', name: 'Forest', icon: 'leaf' },
    { id: 'sunset', name: 'Sunset', icon: 'sunny' },
  ];

  const getThemeIcon = (themeId: string) => {
    switch (themeId) {
      case 'light': return '☀️';
      case 'dark': return '🌙';
      case 'ocean': return '🌊';
      case 'forest': return '🌲';
      case 'sunset': return '🌅';
      default: return '🎨';
    }
  };

  const toggleTheme = () => {
    const themeIndex = themeOptions.findIndex(t => t.id === currentTheme);
    const nextTheme = themeOptions[(themeIndex + 1) % themeOptions.length].id;
    setTheme(nextTheme as any);
  };

  return (
    <>
      <View
        style={[
          styles.container,
          {
            backgroundColor: theme.colors.surface,
            borderBottomColor: theme.colors.border,
            paddingTop: Platform.OS === 'ios' ? insets.top : insets.top,
            height: Platform.OS === 'ios' ? 74 + insets.top : 74 + insets.top,
          },
        ]}
      >
        {/* LEFT SECTION */}
        <View style={styles.leftSection}>
          <View
            style={[
              styles.logoContainer,
              {
                backgroundColor: theme.colors.background,
              },
            ]}
          >
            <Ionicons
              name="book"
              size={22}
              color={theme.colors.primary}
            />
          </View>

          <View>
            <Text
              style={[
                styles.title,
                {
                  color: theme.colors.textPrimary,
                },
              ]}
            >
              BookQubit
            </Text>

            <Text
              style={[
                styles.subtitle,
                {
                  color: theme.colors.textSecondary,
                },
              ]}
            >
              Read Beyond Limits
            </Text>
          </View>
        </View>

        {/* RIGHT SECTION */}
        <View style={styles.rightSection}>
          {/* Dark Mode Toggle Button */}
          <TouchableOpacity
            style={[styles.iconButton, { backgroundColor: theme.colors.background }]}
            onPress={toggleTheme}
          >
            <Text style={styles.themeIcon}>
              {getThemeIcon(currentTheme)}
            </Text>
          </TouchableOpacity>

          {/* SETTINGS BUTTON */}
          <TouchableOpacity
            style={[styles.iconButton, { backgroundColor: theme.colors.background }]}
            onPress={() => setOpen(true)}
          >
            <Ionicons
              name="settings-outline"
              size={20}
              color={theme.colors.icon}
            />
          </TouchableOpacity>

          {/* PROFILE BUTTON */}
          <TouchableOpacity
            style={[styles.iconButton, { backgroundColor: theme.colors.background }]}
          >
            <MaterialIcons
              name="account-circle"
              size={24}
              color={theme.colors.icon}
            />
          </TouchableOpacity>

          {/* MENU BUTTON */}
          <View style={styles.menuButton}>
            <HamburgerButton />
          </View>
        </View>
      </View>

      {/* THEME MODAL */}
      <Modal
        visible={open}
        transparent
        animationType="slide"
        onRequestClose={() => setOpen(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setOpen(false)}
        >
          <View
            style={[
              styles.modalContent,
              {
                backgroundColor: theme.colors.surface,
              },
            ]}
          >
            <View style={styles.modalHeader}>
              <Text
                style={[
                  styles.modalTitle,
                  {
                    color: theme.colors.textPrimary,
                  },
                ]}
              >
                Choose Your Theme
              </Text>
              <TouchableOpacity onPress={() => setOpen(false)}>
                <Ionicons
                  name="close"
                  size={24}
                  color={theme.colors.icon}
                />
              </TouchableOpacity>
            </View>

            <Text
              style={[
                styles.modalSubtitle,
                {
                  color: theme.colors.textSecondary,
                },
              ]}
            >
              Select a theme to customize your experience
            </Text>

            {themeOptions.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.themeButton,
                  {
                    borderColor: theme.colors.border,
                    backgroundColor: currentTheme === item.id
                      ? theme.colors.primary + '20'
                      : 'transparent',
                  },
                ]}
                onPress={() => {
                  setTheme(item.id as any);
                  setOpen(false);
                }}
              >
                <View style={styles.themeButtonLeft}>
                  <Text style={styles.themeButtonIcon}>
                    {getThemeIcon(item.id)}
                  </Text>
                  <View>
                    <Text
                      style={[
                        styles.themeButtonText,
                        {
                          color: theme.colors.textPrimary,
                          fontWeight: currentTheme === item.id ? '700' : '500',
                        },
                      ]}
                    >
                      {item.name}
                    </Text>
                    {currentTheme === item.id && (
                      <Text
                        style={[
                          styles.activeThemeText,
                          { color: theme.colors.primary },
                        ]}
                      >
                        Active
                      </Text>
                    )}
                  </View>
                </View>
                {currentTheme === item.id && (
                  <Ionicons
                    name="checkmark-circle"
                    size={24}
                    color={theme.colors.primary}
                  />
                )}
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={[
                styles.closeButton,
                {
                  backgroundColor: theme.colors.primary,
                },
              ]}
              onPress={() => setOpen(false)}
            >
              <Text
                style={[
                  styles.closeButtonText,
                  {
                    color: '#fff',
                  },
                ]}
              >
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },

  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logoContainer: {
    width: 42,
    height: 42,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  title: {
    fontSize: 20,
    fontWeight: '800',
  },

  subtitle: {
    fontSize: 12,
    marginTop: 2,
  },

  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },

  themeIcon: {
    fontSize: 20,
  },

  menuButton: {
    marginLeft: 10,
  },

  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  modalContent: {
    padding: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },

  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  modalSubtitle: {
    fontSize: 14,
    marginBottom: 20,
  },

  themeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderWidth: 1,
    borderRadius: 14,
    marginBottom: 12,
  },

  themeButtonLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  themeButtonIcon: {
    fontSize: 24,
  },

  themeButtonText: {
    fontSize: 16,
  },

  activeThemeText: {
    fontSize: 12,
    marginTop: 2,
  },

  closeButton: {
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 8,
  },

  closeButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});