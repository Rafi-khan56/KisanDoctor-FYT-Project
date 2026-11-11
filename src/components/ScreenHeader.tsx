import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';

type Props = { small?: string; title: string };

export default function ScreenHeader({ small, title }: Props) {
  // Naye Android mein app status bar ke neeche tak failti hai, isliye upar ki jagah chhorte hain.
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.bar, { paddingTop: insets.top + 12 }]}>
      {small ? <Text style={styles.small}>{small}</Text> : null}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  small: { color: colors.white, opacity: 0.85, fontSize: 12 },
  title: { color: colors.white, fontSize: 20, fontWeight: '700' },
});
