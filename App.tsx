import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/navigation/RootNavigator';
import { LanguageProvider } from './src/i18n';
import { colors } from './src/theme/colors';

// Zubaan aur likhne ki simt (Urdu = right-to-left) LanguageProvider sambhalta hai.
export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <LanguageProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </LanguageProvider>
    </SafeAreaProvider>
  );
}
