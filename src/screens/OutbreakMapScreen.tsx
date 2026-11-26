import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, LayoutChangeEvent, StyleSheet, Text, View } from 'react-native';
import BigButton from '../components/BigButton';
import Chip from '../components/Chip';
import ScreenHeader from '../components/ScreenHeader';
import Tag from '../components/Tag';
import { colors } from '../theme/colors';
import { useT } from '../i18n';
import { Coords, getLocation, offsetKm } from '../services/location';
import { useOutbreaks } from '../services/outbreaks';
import { CropKey, LabelKey } from '../types/scan';

const RADIUS_KM = 5;
const DAYS = 7;
const DAY_MS = 24 * 60 * 60 * 1000;
const CROP_FILTERS: (CropKey | null)[] = [null, 'tomato', 'potato', 'wheat'];
const SEVERE: LabelKey[] = ['lateBlight', 'bacterialSpot', 'yellowLeafCurl'];

// Garam ilaqa: teen gol tehen, bahar se andar gehri hoti hui.
function Heat({ x, y, size, color }: { x: number; y: number; size: number; color: string }) {
  return (
    <View style={{ position: 'absolute', left: x, top: y }}>
      {[1, 0.66, 0.33].map((k, i) => (
        <View
          key={i}
          style={{
            position: 'absolute',
            width: size * k, height: size * k, borderRadius: size,
            left: -(size * k) / 2, top: -(size * k) / 2,
            backgroundColor: color, opacity: 0.1 + i * 0.1,
          }}
        />
      ))}
    </View>
  );
}

export default function OutbreakMapScreen() {
  const ur = useT();
  const filters = [ur.map.all, ur.crops.tomato, ur.crops.potato, ur.crops.wheat];
  const [active, setActive] = useState(0);
  const [me, setMe] = useState<Coords | null>(null);
  const [locLoading, setLocLoading] = useState(true);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const { reports, loading, error } = useOutbreaks();

  const locate = useCallback(async () => {
    setLocLoading(true);
    setMe(await getLocation());
    setLocLoading(false);
  }, []);
  useEffect(() => {
    locate();
  }, [locate]);

  const nearby = useMemo(() => {
    if (!me) return [];
    const crop = CROP_FILTERS[active];
    const now = Date.now();
    return reports
      .filter(r => (crop ? r.crop === crop : true))
      .filter(r => now - (r.createdAt?.getTime() ?? now) <= DAYS * DAY_MS)
      .map(r => ({ ...r, ...offsetKm(me, r) }))
      .filter(r => r.dist <= RADIUS_KM);
  }, [reports, me, active]);

  const top = useMemo(() => {
    const counts: Partial<Record<LabelKey, number>> = {};
    nearby.forEach(r => {
      counts[r.label] = (counts[r.label] ?? 0) + 1;
    });
    const best = (Object.keys(counts) as LabelKey[]).sort((a, b) => (counts[b] ?? 0) - (counts[a] ?? 0))[0];
    return best ? { label: best, count: counts[best] ?? 0 } : null;
  }, [nearby]);

  const onLayout = (e: LayoutChangeEvent) =>
    setSize({ w: e.nativeEvent.layout.width, h: e.nativeEvent.layout.height });
  const cx = size.w / 2;
  const cy = size.h / 2;
  const scale = (Math.min(size.w, size.h) / 2) * 0.9 / RADIUS_KM; // pixel per km
  const ring = 2 * RADIUS_KM * scale;

  return (
    <View style={styles.container}>
      <ScreenHeader small={ur.map.subtitle} title={ur.map.title} />
      <View style={styles.chips}>
        {filters.map((f, i) => (
          <Chip key={f} label={f} active={active === i} onPress={() => setActive(i)} />
        ))}
      </View>

      <View style={styles.map} onLayout={onLayout}>
        {locLoading || loading ? (
          <ActivityIndicator style={styles.center} color={colors.primary} />
        ) : !me ? (
          <View style={styles.center}>
            <Text style={styles.msg}>{ur.map.noLocation}</Text>
            <BigButton title={ur.map.retry} variant="ghost" onPress={locate} />
          </View>
        ) : (
          <>
            <View style={[styles.ringBox, { width: ring, height: ring, borderRadius: ring, left: cx - ring / 2, top: cy - ring / 2 }]} />
            {nearby.map(r => (
              <Heat
                key={r.id}
                x={cx + r.dx * scale}
                y={cy - r.dy * scale}
                size={70}
                color={SEVERE.includes(r.label) ? colors.red : colors.orange}
              />
            ))}
            <View style={[styles.pin, { left: cx - 8, top: cy - 8 }]} />
          </>
        )}
      </View>

      <View style={styles.sheet}>
        {error ? (
          <Text style={styles.sheetSub}>{ur.records.loadError}</Text>
        ) : top ? (
          <>
            <View style={styles.sheetRow}>
              <Text style={styles.sheetTitle}>{ur.tags[top.label]}</Text>
              <Tag text={`${top.count} ${ur.map.casesWord}`} tone="bad" />
            </View>
            <Text style={styles.sheetSub}>{ur.map.range}</Text>
          </>
        ) : (
          <Text style={styles.sheetSub}>{me ? ur.map.noCases : ur.map.noLocation}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, paddingHorizontal: 14, paddingVertical: 10 },
  map: { flex: 1, backgroundColor: '#E7EFDF', overflow: 'hidden' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20, gap: 10 },
  msg: { fontSize: 15, color: colors.ink, textAlign: 'center' },
  ringBox: { position: 'absolute', borderWidth: 1.5, borderColor: '#B9CBB0', borderStyle: 'dashed' },
  pin: {
    position: 'absolute', width: 16, height: 16, borderRadius: 8,
    backgroundColor: colors.primary, borderWidth: 3, borderColor: colors.white,
  },
  sheet: {
    backgroundColor: colors.white, borderTopLeftRadius: 18, borderTopRightRadius: 18,
    paddingTop: 10, paddingBottom: 38, paddingHorizontal: 14, borderTopWidth: 1, borderColor: colors.line,
  },
  sheetRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  sheetTitle: { fontWeight: '700', fontSize: 16, color: colors.ink },
  sheetSub: { fontSize: 13, color: colors.muted },
});
