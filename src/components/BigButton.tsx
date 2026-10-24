import React from 'react';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { colors } from '../theme/colors';

type Props = {
  title: string;
  onPress?: () => void;
  variant?: 'primary' | 'gold' | 'ghost';
  style?: ViewStyle;
};

export default function BigButton({ title, onPress, variant = 'primary', style }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.base, styles[variant], pressed && styles.pressed, style]}>
      <Text style={[styles.text, variant === 'primary' && styles.textLight, variant === 'ghost' && styles.textGhost]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { borderRadius: 16, paddingVertical: 14, paddingHorizontal: 12, alignItems: 'center' },
  primary: { backgroundColor: colors.primary },
  gold: { backgroundColor: colors.gold },
  ghost: { backgroundColor: colors.white, borderWidth: 2, borderColor: colors.primary },
  pressed: { opacity: 0.85 },
  text: { fontSize: 18, fontWeight: '700', color: colors.ink },
  textLight: { color: colors.white },
  textGhost: { color: colors.primary },
});
