import React, { useState } from 'react';
import { ActivityIndicator, Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { ImagePickerResponse, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors } from '../theme/colors';
import { useT } from '../i18n';
import { addScan } from '../services/scans';
import { classify } from '../model/classifier';
import { greenRatio, jpegBase64ToPixels, MIN_GREEN_RATIO } from '../model/imageToPixels';
import { LABEL_MAP } from '../model/labels';
import { isConfidentEnough } from '../utils/confidence';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Scan'>;

const spot = (left: number, top: number, d: number, color: string) => (
  <View
    style={{
      position: 'absolute', left, top, width: d, height: d, borderRadius: d, backgroundColor: color,
    }}
  />
);

// Tasveer ko 448 tak chhota karwate hain (tez), phir hum 224x224 ka chaukor hissa nikalte hain.
const PICK_OPTIONS = {
  mediaType: 'photo',
  maxWidth: 448,
  maxHeight: 448,
  quality: 0.9,
  includeBase64: true,
  saveToPhotos: false,
} as const;

export default function ScanScreen({ navigation }: Props) {
  const ur = useT();
  const [busy, setBusy] = useState(false);

  // Dev mein asli wajah bhi dikhate hain (release mein sirf Urdu/English message).
  function fail(detail: string) {
    console.log('SCAN ERROR', detail);
    Alert.alert('', ur.scan.error + (__DEV__ ? '\n\n' + detail : ''));
  }

  async function analyse(res: ImagePickerResponse) {
    if (res.didCancel) return;
    const asset = res.assets?.[0];
    if (res.errorCode) {
      fail(`picker: ${res.errorCode} ${res.errorMessage ?? ''}`);
      return;
    }
    if (!asset?.base64) {
      fail(`base64 nahi mila. asset keys: ${JSON.stringify(Object.keys(asset ?? {}))}`);
      return;
    }
    setBusy(true);
    try {
      const pixels = jpegBase64ToPixels(asset.base64);
      if (greenRatio(pixels) < MIN_GREEN_RATIO) {
        // hara rang bohat kam: patta nahi lagta (screenshot, ghari, wagaira)
        Alert.alert('', ur.scan.unsupported);
        return;
      }
      const pred = await classify(pixels);
      const info = LABEL_MAP[pred.label];
      if (!info) {
        // "Other": supported patta nahi, record save nahi karte
        Alert.alert('', ur.scan.unsupported);
        return;
      }
      const confidence = Math.round(pred.confidence);
      const sure = isConfidentEnough(confidence);

      // Record Firestore mein: yaqeen kam ho to "ماہر کا جائزہ" likhte hain
      addScan({
        crop: info.crop,
        label: sure ? info.label : 'expertReview',
        tone: sure ? info.tone : 'review',
        confidence,
        field: 1,
      }).catch(() => {});

      navigation.navigate('Result', { crop: info.crop, label: info.label, confidence });
    } catch (e) {
      fail(`analyse: ${String((e as Error)?.message ?? e)}`);
    } finally {
      setBusy(false);
    }
  }

  const takePhoto = async () => analyse(await launchCamera(PICK_OPTIONS));
  const pickPhoto = async () => analyse(await launchImageLibrary({ ...PICK_OPTIONS, selectionLimit: 1 }));

  return (
    <View style={styles.container}>
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
        {busy && (
          <View style={styles.busy}>
            <ActivityIndicator size="large" color={colors.gold} />
            <Text style={styles.busyText}>{ur.scan.analysing}</Text>
          </View>
        )}
      </View>
      <View style={styles.controls}>
        <Pressable disabled={busy} onPress={pickPhoto}>
          <Text style={styles.side}>{ur.scan.gallery}</Text>
        </Pressable>
        <Pressable style={[styles.shutter, busy && { opacity: 0.5 }]} disabled={busy} onPress={takePhoto} />
        <Text style={styles.side}>{ur.scan.takePhoto}</Text>
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
  busy: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: '#000B', alignItems: 'center', justifyContent: 'center', gap: 10,
  },
  busyText: { color: colors.white, fontSize: 16 },
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
