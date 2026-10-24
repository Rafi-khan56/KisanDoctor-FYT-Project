import React, { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import BigButton from '../components/BigButton';
import Card from '../components/Card';
import Chip from '../components/Chip';
import ScreenHeader from '../components/ScreenHeader';
import { colors } from '../theme/colors';
import { ur } from '../i18n/ur';
import { RootStackParamList, TabParamList } from '../types/navigation';

type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Profile'>,
  NativeStackScreenProps<RootStackParamList>
>;

export default function ProfileScreen({ navigation }: Props) {
  const [urdu, setUrdu] = useState(true);
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
            <Text style={styles.phone}>{ur.profile.phone}</Text>
          </View>
        </Card>

        <Card style={styles.row}>
          <Text style={styles.label}>{ur.profile.language}</Text>
          <View style={styles.chips}>
            <Chip label="اردو" active={urdu} onPress={() => setUrdu(true)} />
            <Chip label="English" active={!urdu} onPress={() => setUrdu(false)} />
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

        <BigButton title={ur.profile.logout} variant="ghost" onPress={() => navigation.navigate('Login')} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  body: { padding: 14, gap: 10 },
  userRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 14 },
  avatar: {
    width: 56, height: 56, borderRadius: 28, backgroundColor: colors.primary,
    alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { color: colors.white, fontSize: 26, fontWeight: '700' },
  userInfo: { flex: 1 },
  name: { fontSize: 18, fontWeight: '700', color: colors.ink },
  phone: { fontSize: 14, color: colors.muted, writingDirection: 'ltr', textAlign: 'right' },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12 },
  label: { fontSize: 16, color: colors.ink },
  value: { fontSize: 15, color: colors.muted },
  chips: { flexDirection: 'row', gap: 6 },
});
