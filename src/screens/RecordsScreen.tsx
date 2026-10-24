import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Chip from '../components/Chip';
import ScanRow from '../components/ScanRow';
import ScreenHeader from '../components/ScreenHeader';
import { mockScans } from '../data/mockScans';
import { colors } from '../theme/colors';
import { ur } from '../i18n/ur';

export default function RecordsScreen() {
  const [field, setField] = useState<0 | 1 | 2>(0); // 0 = sab
  const shown = mockScans.filter(s => field === 0 || s.field === field);

  return (
    <View style={styles.container}>
      <ScreenHeader small={ur.records.subtitle} title={ur.records.title} />
      <ScrollView contentContainerStyle={styles.body}>
        <View style={styles.chips}>
          <Chip label={ur.records.all} active={field === 0} onPress={() => setField(0)} />
          <Chip label={ur.records.field1} active={field === 1} onPress={() => setField(1)} />
          <Chip label={ur.records.field2} active={field === 2} onPress={() => setField(2)} />
        </View>
        {shown.map(s => (
          <ScanRow key={s.id} scan={s} />
        ))}
        {shown.length === 0 && <Text style={styles.empty}>—</Text>}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  body: { padding: 14, gap: 10 },
  chips: { flexDirection: 'row', gap: 6 },
  empty: { textAlign: 'center', color: colors.muted, marginTop: 20 },
});
