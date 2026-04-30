import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { useThemeStore } from '@/store/themeStore';
import themes from '@/src/themes';
import TabIcon from './TabIcon';

type TabBarProps = {
  state: any;
  descriptors: any;
  navigation: any;
};

export default function TabBar({ state, descriptors, navigation }: TabBarProps) {
  const { currentTheme } = useThemeStore();
  const theme = themes[currentTheme];

  // Sample badge counts (you can connect these to your state management)
  const badgeCounts = {
    index: 0,
    explore: 0,
    library: 3, // 3 new books added
    profile: 0,
    settings: 0,
  };

  const getTabLabel = (routeName: string) => {
    const labels: Record<string, string> = {
      index: 'Home',
      explore: 'Explore',
      library: 'Library',
      profile: 'Profile',
      settings: 'Settings',
    };
    return labels[routeName] || routeName;
  };

  const getTabIcon = (routeName: string) => {
    const icons: Record<string, any> = {
      index: 'home',
      explore: 'compass',
      library: 'library',
      profile: 'person',
      settings: 'settings',
    };
    return icons[routeName] || 'ellipse';
  };

  const isTabVisible = (routeName: string) => {
    // Hide specific tabs if needed
    const hiddenTabs: string[] = [];
    return !hiddenTabs.includes(routeName);
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
          shadowColor: theme.colors.textPrimary,
        },
      ]}
    >
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label = getTabLabel(route.name);
        const isFocused = state.index === index;
        const iconName = getTabIcon(route.name);
        const badge = badgeCounts[route.name as keyof typeof badgeCounts] || 0;

        if (!isTabVisible(route.name)) {
          return null;
        }

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tab}
            activeOpacity={0.7}
          >
            <TabIcon
              name={iconName}
              color={isFocused ? theme.colors.primary : theme.colors.textSecondary}
              size={24}
              focused={isFocused}
              label={label}
              badge={badge}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: Platform.OS === 'ios' ? 85 : 65,
    paddingBottom: Platform.OS === 'ios' ? 25 : 8,
    paddingTop: 8,
    borderTopWidth: 1,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 5,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});