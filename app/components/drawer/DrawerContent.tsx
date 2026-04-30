import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DrawerItem from './DrawerItem';
import { router, usePathname } from 'expo-router';
import themes from '@/src/themes';
import { useThemeStore } from '@/store/themeStore';

export default function DrawerContent() {
  const { currentTheme } = useThemeStore();
  const theme = themes[currentTheme];
  const pathname = usePathname();

  const menuItems = [
    { label: 'Home', route: '/', iconName: 'home-outline', activeIcon: 'home' },
    { label: 'Explore', route: '/explore', iconName: 'compass-outline', activeIcon: 'compass' },
    { label: 'Library', route: '/library', iconName: 'library-outline', activeIcon: 'library' },
    { label: 'Profile', route: '/profile', iconName: 'person-outline', activeIcon: 'person' },
    { label: 'Notifications', route: '/notifications', iconName: 'notifications-outline', activeIcon: 'notifications' },
    { label: 'Settings', route: '/settings', iconName: 'settings-outline', activeIcon: 'settings' },
    { label: 'About', route: '/about', iconName: 'information-circle-outline', activeIcon: 'information-circle' },
  ];

  const isActive = (route: string) => {
    return pathname === route;
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
        <Text style={[styles.logo, { color: theme.colors.textPrimary }]}>
          BookQubit 📚
        </Text>
        <Text style={[styles.tagline, { color: theme.colors.textSecondary }]}>
          Your reading companion
        </Text>
      </View>

      {menuItems.map((item) => (
        <DrawerItem
          key={item.label}
          label={item.label}
          iconName={isActive(item.route) ? item.activeIcon : item.iconName}
          isActive={isActive(item.route)}
          onPress={() => router.push(item.route)}
        />
      ))}

      <View style={[styles.footer, { borderTopColor: theme.colors.border }]}>
        <Text style={[styles.version, { color: theme.colors.textSecondary }]}>
          Version 1.0.0
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    marginBottom: 10,
  },

  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 6,
  },

  tagline: {
    fontSize: 14,
  },

  footer: {
    marginTop: 'auto',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    alignItems: 'center',
  },

  version: {
    fontSize: 12,
  },
});