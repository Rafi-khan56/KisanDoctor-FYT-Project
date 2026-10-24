import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Card from '../components/Card';
import Icon from '../components/Icon';
import ScanRow from '../components/ScanRow';
import ScreenHeader from '../components/ScreenHeader';
import { mockScans } from '../data/mockScans';
import { colors } from '../theme/colors';
import { ur } from '../i18n/ur';
import { RootStackParamList, TabParamList } from '../types/navigation';

type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Home'>,
  NativeStackScreenProps<RootStackParamList>
>;

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <ScreenHeader small={ur.home.weather} title={`${ur.home.greeting}، ${ur.profile.name}`} />
      <ScrollView contentContainerStyle={styles.body}>
        <Pressable
          style={({ pressed }) => [styles.scanBtn, pressed && { opacity: 0.85 }]}
          onPress={() => navigation.navigate('Scan')}>
          <Icon name="camera" size={34} color={colors.ink} />
          <Text style={styles.scanText}>{ur.home.scanLeaf}</Text>
        </Pressable>

        <Card style={styles.warn}>
          <Text style={styles.warnIcon}>⚠️</Text>
          <Text style={styles.warnText}>{ur.home.warning}</Text>
        </Card>

        <Text style={styles.section}>{ur.home.recentScans}</Text>
        {mockScans.slice(0, 2).map(s => (
          <ScanRow key={s.id} scan={s} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  body: { padding: 14, gap: 10 },
  scanBtn: {
    backgroundColor: colors.gold, borderRadius: 16, paddingVertical: 22,
    alignItems: 'center', gap: 2,
  },
  scanText: { fontSize: 19, fontWeight: '700', color: colors.ink },
  warn: {
    backgroundColor: colors.warnBg, borderColor: colors.gold,
    flexDirection: 'row', alignItems: 'center', gap: 8,
  },
  warnIcon: { fontSize: 16 },
  warnText: { flex: 1, fontSize: 14, color: colors.ink },
  section: { fontWeight: '700', fontSize: 16, color: colors.ink, marginTop: 4 },
});
