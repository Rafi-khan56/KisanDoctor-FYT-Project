import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';

type Props = { small?: string; title: string };

export default function ScreenHeader({ small, title }: Props) {
  return (
    <View style={styles.bar}>
      {small ? <Text style={styles.small}>{small}</Text> : null}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: { backgroundColor: colors.primary, paddingHorizontal: 16, paddingTop: 16, paddingBottom: 12 },
  small: { color: colors.white, opacity: 0.85, fontSize: 12 },
  title: { color: colors.white, fontSize: 20, fontWeight: '700' },
});
