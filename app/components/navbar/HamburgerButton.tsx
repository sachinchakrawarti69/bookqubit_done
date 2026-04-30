import { TouchableOpacity, Text } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';

export default function HamburgerButton() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.dispatch(DrawerActions.openDrawer())
      }
      style={{ padding: 8 }}
    >
      <Text style={{ fontSize: 22 }}>☰</Text>
    </TouchableOpacity>
  );
}