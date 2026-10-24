import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import OutbreakMapScreen from '../screens/OutbreakMapScreen';
import RecordsScreen from '../screens/RecordsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Icon, { IconName } from '../components/Icon';
import { colors } from '../theme/colors';
import { ur } from '../i18n/ur';
import { TabParamList } from '../types/navigation';

const Tab = createBottomTabNavigator<TabParamList>();

// Beech ka Scan tab sirf ek button hai. Dabane par Scan screen (stack) khulti hai.
function Empty() {
  return null;
}

const icons: Record<keyof TabParamList, IconName> = {
  Home: 'home',
  Map: 'map',
  ScanTab: 'camera',
  Records: 'records',
  Profile: 'profile',
};
const labels: Record<keyof TabParamList, string> = {
  Home: ur.tabs.home,
  Map: ur.tabs.map,
  ScanTab: ur.tabs.scan,
  Records: ur.tabs.records,
  Profile: ur.tabs.profile,
};

const INACTIVE = '#6B7C6E';

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: INACTIVE,
        tabBarLabel: labels[route.name],
        tabBarLabelStyle: { fontSize: 11 },
        tabBarIcon: ({ color }) => <Icon name={icons[route.name]} color={color} />,
        tabBarStyle: { height: 64, paddingBottom: 6, paddingTop: 4, backgroundColor: colors.white },
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Map" component={OutbreakMapScreen} />
      <Tab.Screen
        name="ScanTab"
        component={Empty}
        options={({ navigation }) => ({
          tabBarButton: () => (
            <View style={styles.scanWrap}>
              <Pressable style={styles.scanBtn} onPress={() => (navigation as any).navigate('Scan')}>
                <Icon name="camera" color={colors.ink} size={26} />
              </Pressable>
              <Text style={styles.scanLabel}>{ur.tabs.scan}</Text>
            </View>
          ),
        })}
      />
      <Tab.Screen name="Records" component={RecordsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  scanWrap: { flex: 1, alignItems: 'center', marginTop: -26 },
  scanBtn: {
    width: 56, height: 56, borderRadius: 28, backgroundColor: colors.gold,
    borderWidth: 4, borderColor: colors.white, alignItems: 'center', justifyContent: 'center',
  },
  scanLabel: { fontSize: 11, color: INACTIVE, marginTop: 2 },
});
