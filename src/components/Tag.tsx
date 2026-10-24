import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';

type Props = { text: string; tone?: 'ok' | 'bad' | 'review' };

export default function Tag({ text, tone = 'ok' }: Props) {
  const bg = tone === 'bad' ? colors.redLight : tone === 'review' ? colors.amberLight : colors.greenLight;
  const fg = tone === 'bad' ? '#A52A1E' : tone === 'review' ? '#9A5200' : colors.primary;
  return (
    <View style={[styles.tag, { backgroundColor: bg }]}>
      <Text style={[styles.text, { color: fg }]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tag: { borderRadius: 99, paddingHorizontal: 10, paddingVertical: 2 },
  text: { fontSize: 12 },
});
