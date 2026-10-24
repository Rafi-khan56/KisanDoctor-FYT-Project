import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Chip from '../components/Chip';
import ScreenHeader from '../components/ScreenHeader';
import Tag from '../components/Tag';
import { colors } from '../theme/colors';
import { ur } from '../i18n/ur';

// Garam ilaqa: teen gol tehen, bahar se andar gehri hoti hui.
function Heat({ x, y, size, color }: { x: string; y: string; size: number; color: string }) {
  return (
    <View style={{ position: 'absolute', left: x as any, top: y as any }}>
      {[1, 0.66, 0.33].map((k, i) => (
        <View
          key={i}
          style={{
            position: 'absolute',
            width: size * k, height: size * k, borderRadius: size,
            left: -(size * k) / 2, top: -(size * k) / 2,
            backgroundColor: color, opacity: 0.16 + i * 0.14,
          }}
        />
      ))}
    </View>
  );
}

export default function OutbreakMapScreen() {
  const filters = [ur.map.all, ur.crops.tomato, ur.crops.potato, ur.crops.wheat];
  const [active, setActive] = useState(0);

  return (
    <View style={styles.container}>
      <ScreenHeader small={ur.map.subtitle} title={ur.map.title} />
      <View style={styles.chips}>
        {filters.map((f, i) => (
          <Chip key={f} label={f} active={active === i} onPress={() => setActive(i)} />
        ))}
      </View>

      {/* TODO (baad mein): asli nakshaa aur Firestore ke reports. Abhi design ka namoona hai. */}
      <View style={styles.map}>
        <View style={styles.roadV} />
        <View style={styles.roadH} />
        <Heat x="38%" y="42%" size={130} color={colors.red} />
        <Heat x="72%" y="28%" size={100} color={colors.orange} />
        <Heat x="66%" y="74%" size={90} color={colors.orange} />
        <View style={styles.pin} />
      </View>

      <View style={styles.sheet}>
        <View style={styles.sheetRow}>
          <Text style={styles.sheetTitle}>{ur.map.disease}</Text>
          <Tag text={ur.map.cases} tone="bad" />
        </View>
        <Text style={styles.sheetSub}>{ur.map.range}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, paddingHorizontal: 14, paddingVertical: 10 },
  map: { flex: 1, backgroundColor: '#E7EFDF', overflow: 'hidden' },
  roadV: { position: 'absolute', left: '49%', top: 0, bottom: 0, width: 6, backgroundColor: '#D8E3D0' },
  roadH: { position: 'absolute', top: '59%', left: 0, right: 0, height: 6, backgroundColor: '#D8E3D0' },
  pin: {
    position: 'absolute', left: '48%', top: '55%', width: 16, height: 16, borderRadius: 8,
    backgroundColor: colors.primary, borderWidth: 3, borderColor: colors.white,
  },
  sheet: {
    backgroundColor: colors.white, borderTopLeftRadius: 18, borderTopRightRadius: 18,
    paddingVertical: 10, paddingHorizontal: 14, borderTopWidth: 1, borderColor: colors.line,
  },
  sheetRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  sheetTitle: { fontWeight: '700', fontSize: 16, color: colors.ink },
  sheetSub: { fontSize: 13, color: colors.muted },
});
