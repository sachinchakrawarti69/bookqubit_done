import { Drawer } from 'expo-router/drawer';
import DrawerContent from '@/components/drawer/DrawerContent';

export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={() => <DrawerContent />}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          headerShown: false,
          title: 'Home',
        }}
      />

      <Drawer.Screen name="notifications" />
      <Drawer.Screen name="settings" />
      <Drawer.Screen name="about" />
    </Drawer>
  );
}