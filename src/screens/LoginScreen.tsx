import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import BigButton from '../components/BigButton';
import Icon from '../components/Icon';
import { colors } from '../theme/colors';
import { ur } from '../i18n/ur';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Icon name="leaf" size={44} color={colors.ink} />
      </View>
      <Text style={styles.name}>{ur.appName}</Text>
      <Text style={styles.tagline}>{ur.tagline}</Text>

      <Text style={styles.label}>{ur.login.enterPhone}</Text>
      <TextInput
        style={styles.field}
        placeholder={ur.login.placeholder}
        placeholderTextColor="#8A9A8C"
        keyboardType="phone-pad"
        textAlign="left"
      />
      {/* Abhi Firebase nahi juda, isliye seedha Home par jate hain. */}
      <BigButton
        title={ur.login.sendCode}
        variant="gold"
        style={styles.btn}
        onPress={() => navigation.replace('Main')}
      />
      <Text style={styles.lang}>{ur.login.language}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.primary, justifyContent: 'center', padding: 26 },
  logo: {
    width: 76, height: 76, borderRadius: 24, backgroundColor: colors.gold,
    alignItems: 'center', justifyContent: 'center', alignSelf: 'center',
  },
  name: { color: colors.white, fontSize: 28, fontWeight: '700', textAlign: 'center', marginTop: 14 },
  tagline: { color: colors.white, opacity: 0.9, textAlign: 'center', marginBottom: 20 },
  label: { color: colors.white, textAlign: 'center', marginBottom: 8, fontSize: 16 },
  field: {
    backgroundColor: colors.white, borderRadius: 14, padding: 12, fontSize: 17,
    color: colors.ink, writingDirection: 'ltr', letterSpacing: 0.7,
  },
  btn: { marginTop: 14 },
  lang: { color: colors.white, opacity: 0.85, textAlign: 'center', marginTop: 14, fontSize: 13 },
});
