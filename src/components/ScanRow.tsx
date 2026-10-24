import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Card from './Card';
import LeafThumb from './LeafThumb';
import Tag from './Tag';
import { colors } from '../theme/colors';
import { Scan } from '../data/mockScans';

export default function ScanRow({ scan }: { scan: Scan }) {
  return (
    <Card style={styles.row}>
      <LeafThumb sick={scan.tone !== 'ok'} />
      <View style={styles.info}>
        <Text style={styles.crop}>{scan.crop}</Text>
        <Text style={styles.when}>{scan.when}</Text>
      </View>
      <Tag text={scan.label} tone={scan.tone} />
    </Card>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  info: { flex: 1 },
  crop: { fontSize: 16, color: colors.ink },
  when: { fontSize: 12, color: colors.muted },
});
