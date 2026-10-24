import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors } from '../theme/colors';
import { ur } from '../i18n/ur';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Scan'>;

const spot = (left: number, top: number, d: number, color: string) => (
  <View
    style={{
      position: 'absolute', left, top, width: d, height: d, borderRadius: d, backgroundColor: color,
    }}
  />
);

export default function ScanScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      {/* TODO (hafta 4): yahan asli camera (react-native-vision-camera) lagega. */}
      <View style={styles.cam}>
        <View style={styles.hint}>
          <Text style={styles.hintText}>{ur.scan.hint}</Text>
        </View>
        <View style={styles.frame}>
          <View style={styles.leaf}>
            {spot(40, 50, 18, '#5A3A1C')}
            {spot(78, 74, 24, '#6B4423')}
            {spot(60, 100, 12, '#5A3A1C')}
          </View>
        </View>
      </View>
      <View style={styles.controls}>
        <Text style={styles.side}>{ur.scan.gallery}</Text>
        {/* Abhi namoona nateeja dikhate hain. Baad mein model ka asli nateeja aayega. */}
        <Pressable
          style={styles.shutter}
          onPress={() => navigation.navigate('Result', { disease: ur.tags.lateBlight, confidence: 87 })}
        />
        <Text style={styles.side}>{ur.scan.flash}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#17281B' },
  cam: { flex: 1, backgroundColor: '#223A28', alignItems: 'center', justifyContent: 'center' },
  hint: {
    position: 'absolute', top: 16, left: 16, right: 16,
    backgroundColor: '#000A', borderRadius: 12, paddingVertical: 8, paddingHorizontal: 10,
  },
  hintText: { color: colors.white, textAlign: 'center', fontSize: 14 },
  frame: {
    width: 230, height: 230, borderRadius: 26, borderWidth: 3,
    borderColor: colors.gold, borderStyle: 'dashed', alignItems: 'center', justifyContent: 'center',
  },
  leaf: {
    width: 150, height: 150, backgroundColor: '#4F9140',
    borderTopLeftRadius: 0, borderTopRightRadius: 120, borderBottomRightRadius: 0, borderBottomLeftRadius: 120,
  },
  controls: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 24, paddingVertical: 16,
  },
  side: { color: colors.white, fontSize: 14, width: 60, textAlign: 'center' },
  shutter: {
    width: 68, height: 68, borderRadius: 34, backgroundColor: colors.gold,
    borderWidth: 5, borderColor: colors.white,
  },
});
