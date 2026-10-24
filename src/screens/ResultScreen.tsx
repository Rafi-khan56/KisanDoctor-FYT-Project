import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import BigButton from '../components/BigButton';
import Card from '../components/Card';
import LeafThumb from '../components/LeafThumb';
import ScreenHeader from '../components/ScreenHeader';
import { colors } from '../theme/colors';
import { ur } from '../i18n/ur';
import { confidenceColor, isConfidentEnough } from '../utils/confidence';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Result'>;

export default function ResultScreen({ route }: Props) {
  const { disease, confidence } = route.params;
  const sure = isConfidentEnough(confidence);

  return (
    <View style={styles.container}>
      <ScreenHeader small={ur.result.title} title={sure ? disease : ur.result.notSure} />
      <ScrollView contentContainerStyle={styles.body}>
        <View style={styles.top}>
          <LeafThumb size={56} sick />
          <View style={styles.confBox}>
            <Text style={styles.conf}>
              {ur.result.confidence}: {confidence}%
            </Text>
            <View style={styles.meter}>
              <View
                style={[styles.fill, { width: `${confidence}%`, backgroundColor: confidenceColor(confidence) }]}
              />
            </View>
          </View>
        </View>

        {sure ? (
          <>
            <Card>
              <Text style={styles.cardTitle}>{ur.result.symptoms}</Text>
              <Text style={styles.cardText}>{ur.result.symptomsText}</Text>
            </Card>
            <Card>
              <Text style={styles.cardTitle}>{ur.result.treatment}</Text>
              <Text style={styles.cardText}>{ur.result.treatmentText}</Text>
            </Card>
          </>
        ) : (
          <Card>
            <Text style={styles.cardText}>{ur.result.notSureHelp}</Text>
          </Card>
        )}

        <BigButton title={ur.result.askExpert} variant="ghost" />
        <Text style={styles.note}>{ur.result.disclaimer}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  body: { padding: 14, gap: 12 },
  top: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  confBox: { flex: 1 },
  conf: { fontSize: 13, color: colors.ink, marginBottom: 4 },
  meter: { height: 12, borderRadius: 9, backgroundColor: '#E3EADD', overflow: 'hidden' },
  fill: { height: '100%' },
  cardTitle: { fontSize: 16, fontWeight: '700', color: colors.ink },
  cardText: { fontSize: 15, color: colors.ink, marginTop: 2 },
  note: {
    fontSize: 12, color: colors.noteInk, backgroundColor: colors.noteBg,
    borderRadius: 10, padding: 8,
  },
});
