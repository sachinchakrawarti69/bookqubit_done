import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import themes from '@/src/themes';
import { useThemeStore } from '@/store/themeStore';

type Props = {
  label: string;
  onPress: () => void;
  iconName?: keyof typeof Ionicons.glyphMap;
  isActive?: boolean;
};

export default function DrawerItem({
  label,
  onPress,
  iconName,
  isActive = false,
}: Props) {
  const { currentTheme } = useThemeStore();
  const theme = themes[currentTheme];

  return (
    <TouchableOpacity
      style={[
        styles.item,
        {
          borderBottomColor: theme.colors.border,
          backgroundColor: isActive ? theme.colors.primary + '20' : 'transparent',
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {iconName && (
        <Ionicons
          name={iconName}
          size={22}
          color={isActive ? theme.colors.primary : theme.colors.icon}
          style={styles.icon}
        />
      )}
      <Text
        style={[
          styles.text,
          {
            color: isActive ? theme.colors.primary : theme.colors.textPrimary,
            fontWeight: isActive ? '600' : '400',
          },
        ]}
      >
        {label}
      </Text>
      {isActive && (
        <View
          style={[
            styles.activeIndicator,
            { backgroundColor: theme.colors.primary },
          ]}
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },

  icon: {
    marginRight: 12,
  },

  text: {
    fontSize: 16,
    flex: 1,
  },

  activeIndicator: {
    width: 4,
    height: 24,
    borderRadius: 2,
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
});