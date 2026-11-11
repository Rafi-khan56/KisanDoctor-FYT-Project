import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Card from './Card';
import LeafThumb from './LeafThumb';
import Tag from './Tag';
import { colors } from '../theme/colors';
import { Scan } from '../types/scan';
import { formatWhen } from '../utils/time';
import { useT } from '../i18n';

export default function ScanRow({ scan }: { scan: Scan }) {
  const t = useT();
  return (
    <Card style={styles.row}>
      <LeafThumb sick={scan.tone !== 'ok'} />
      <View style={styles.info}>
        <Text style={styles.crop}>{t.crops[scan.crop]}</Text>
        <Text style={styles.when}>{formatWhen(scan.createdAt, t)}</Text>
      </View>
      <Tag text={t.tags[scan.label]} tone={scan.tone} />
    </Card>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  info: { flex: 1 },
  crop: { fontSize: 16, color: colors.ink },
  when: { fontSize: 12, color: colors.muted },
});
