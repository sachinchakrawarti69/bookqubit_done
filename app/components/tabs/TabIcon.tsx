import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeStore } from '@/store/themeStore';
import themes from '@/src/themes';

type Props = {
  name: keyof typeof Ionicons.glyphMap;
  color: string;
  size: number;
  focused?: boolean;
  label?: string;
  badge?: number;
};

export default function TabIcon({ 
  name, 
  color, 
  size, 
  focused = false,
  label,
  badge 
}: Props) {
  const { currentTheme } = useThemeStore();
  const theme = themes[currentTheme];

  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer, focused && styles.focusedContainer]}>
        <Ionicons 
          name={focused ? name : `${name}-outline` as any} 
          size={size} 
          color={color} 
        />
        {badge && badge > 0 && (
          <View style={[styles.badge, { backgroundColor: theme.colors.primary }]}>
            <Text style={styles.badgeText}>
              {badge > 9 ? '9+' : badge}
            </Text>
          </View>
        )}
      </View>
      {label && (
        <Text 
          style={[
            styles.label, 
            { 
              color: focused ? theme.colors.primary : theme.colors.textSecondary,
              fontSize: focused ? 11 : 10,
            }
          ]}
        >
          {label}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  focusedContainer: {
    transform: [{ scale: 1.05 }],
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -12,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  label: {
    marginTop: 4,
    fontWeight: '500',
  },
});