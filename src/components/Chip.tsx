import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../theme/colors';

type Props = { label: string; active?: boolean; onPress?: () => void };

export default function Chip({ label, active = false, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={[styles.chip, active && styles.on]}>
      <Text style={[styles.text, active && styles.textOn]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 99,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: '#C9D6C4',
  },
  on: { backgroundColor: colors.primary, borderColor: colors.primary },
  text: { fontSize: 13, color: colors.ink },
  textOn: { color: colors.white },
});
