import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import BigButton from '../components/BigButton';
import Card from '../components/Card';
import Chip from '../components/Chip';
import ScreenHeader from '../components/ScreenHeader';
import { colors } from '../theme/colors';
import { useLanguage } from '../i18n';
import { currentPhone, signOut } from '../services/auth';
import { classify, IMG_SIZE } from '../model/classifier';

// Sirf jaanchne ke liye: model phone par load hota aur chalta hai ya nahi.
// Ek saaf bhoori tasveer (sab pixel 128) deta hai, nateeja bekaar hoga, lekin 3 numbers aane chahiye.
async function runModelTest() {
  try {
    const gray = new Float32Array(IMG_SIZE * IMG_SIZE * 3).fill(128);
    const t0 = Date.now();
    const r = await classify(gray);
    const ms = Date.now() - t0;
    Alert.alert(
      'Model test OK',
      `${r.label} ${r.confidence.toFixed(0)}%\n${r.probs
        .map(p => p.toFixed(3))
        .join(' | ')}\n${ms} ms`,
    );
  } catch (e) {
    Alert.alert('Model test FAIL', String((e as Error)?.message ?? e));
  }
}

export default function ProfileScreen() {
  const { lang, setLang, t: ur } = useLanguage();
  const phone = currentPhone();
  const [alerts, setAlerts] = useState(true);

  return (
    <View style={styles.container}>
      <ScreenHeader title={ur.profile.title} />
      <ScrollView contentContainerStyle={styles.body}>
        <Card style={styles.userRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>ا</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.name}>{ur.profile.name}</Text>
            <Text style={styles.phone}>{phone}</Text>
          </View>
        </Card>

        <Card style={styles.row}>
          <Text style={styles.label}>{ur.profile.language}</Text>
          <View style={styles.chips}>
            <Chip
              label="اردو"
              active={lang === 'ur'}
              onPress={() => setLang('ur')}
            />
            <Chip
              label="English"
              active={lang === 'en'}
              onPress={() => setLang('en')}
            />
          </View>
        </Card>

        <Card style={styles.row}>
          <Text style={styles.label}>{ur.profile.myFields}</Text>
          <Text style={styles.value}>{ur.profile.fieldsCount}</Text>
        </Card>

        <Card style={styles.row}>
          <Text style={styles.label}>{ur.profile.notifications}</Text>
          <Switch
            value={alerts}
            onValueChange={setAlerts}
            trackColor={{ true: colors.primary, false: '#C9D6C4' }}
            thumbColor={colors.white}
          />
        </Card>

        <BigButton
          title="Model test (dev)"
          variant="gold"
          onPress={runModelTest}
        />
        <BigButton
          title={ur.profile.logout}
          variant="ghost"
          onPress={signOut}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  body: { padding: 14, gap: 10 },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: colors.white, fontSize: 26, fontWeight: '700' },
  userInfo: { flex: 1 },
  name: { fontSize: 18, fontWeight: '700', color: colors.ink },
  phone: {
    fontSize: 14,
    color: colors.muted,
    writingDirection: 'ltr',
    textAlign: 'right',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  label: { fontSize: 16, color: colors.ink },
  value: { fontSize: 15, color: colors.muted },
  chips: { flexDirection: 'row', gap: 6 },
});
