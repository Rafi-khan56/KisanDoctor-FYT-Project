import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import BigButton from '../components/BigButton';
import Icon from '../components/Icon';
import {
  authErrorKind,
  Confirmation,
  sendCode,
  toE164,
} from '../services/auth';
import { colors } from '../theme/colors';
import { useLanguage } from '../i18n';

export default function LoginScreen() {
  const { lang, setLang, t: ur } = useLanguage();
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function onSend() {
    const e164 = toE164(phone);
    if (!e164) {
      setError(ur.login.errors.badPhone);
      return;
    }
    setError('');
    setBusy(true);
    try {
      setConfirmation(await sendCode(e164));
    } catch (e) {
      setError(ur.login.errors[authErrorKind(e)]);
    } finally {
      setBusy(false);
    }
  }

  async function onVerify() {
    if (!confirmation) return;
    setError('');
    setBusy(true);
    try {
      // Kamyab hone par Firebase khud login kar deta hai, aur RootNavigator Home khol deta hai.
      await confirmation.confirm(code.trim());
    } catch (e) {
      setError(ur.login.errors[authErrorKind(e)]);
      setBusy(false);
    }
  }

  function onChangeNumber() {
    setConfirmation(null);
    setCode('');
    setError('');
  }

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Icon name="leaf" size={44} color={colors.ink} />
      </View>
      <Text style={styles.name}>{ur.appName}</Text>
      <Text style={styles.tagline}>{ur.tagline}</Text>

      {!confirmation ? (
        <>
          <Text style={styles.label}>{ur.login.enterPhone}</Text>
          <TextInput
            style={styles.field}
            placeholder={ur.login.placeholder}
            placeholderTextColor="#8A9A8C"
            keyboardType="phone-pad"
            textAlign="left"
            value={phone}
            onChangeText={setPhone}
            editable={!busy}
          />
          <BigButton
            title={busy ? ur.login.sending : ur.login.sendCode}
            variant="gold"
            style={styles.btn}
            disabled={busy}
            onPress={onSend}
          />
        </>
      ) : (
        <>
          <Text style={styles.label}>{ur.login.enterCode}</Text>
          <TextInput
            style={[styles.field, styles.codeField]}
            placeholder="______"
            placeholderTextColor="#8A9A8C"
            keyboardType="number-pad"
            maxLength={6}
            textAlign="center"
            value={code}
            onChangeText={setCode}
            editable={!busy}
          />
          <BigButton
            title={busy ? ur.login.sending : ur.login.verify}
            variant="gold"
            style={styles.btn}
            disabled={busy || code.trim().length < 6}
            onPress={onVerify}
          />
          <Text style={styles.link} onPress={onChangeNumber}>
            {ur.login.changeNumber}
          </Text>
        </>
      )}

      {error !== '' && <Text style={styles.error}>{error}</Text>}
      <Text
        style={styles.lang}
        onPress={() => setLang(lang === 'ur' ? 'en' : 'ur')}
      >
        {ur.login.language}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    padding: 26,
  },
  logo: {
    width: 76,
    height: 76,
    borderRadius: 24,
    backgroundColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  name: {
    color: colors.white,
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 14,
  },
  tagline: {
    color: colors.white,
    opacity: 0.9,
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    color: colors.white,
    textAlign: 'center',
    marginBottom: 8,
    fontSize: 16,
  },
  field: {
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 12,
    fontSize: 17,
    color: colors.ink,
    writingDirection: 'ltr',
    letterSpacing: 0.7,
  },
  codeField: { fontSize: 24, letterSpacing: 8 },
  btn: { marginTop: 14 },
  link: {
    color: colors.gold,
    textAlign: 'center',
    marginTop: 14,
    fontSize: 15,
  },
  error: {
    color: colors.white,
    backgroundColor: colors.red,
    borderRadius: 10,
    padding: 10,
    textAlign: 'center',
    marginTop: 14,
    overflow: 'hidden',
  },
  lang: {
    color: colors.white,
    opacity: 0.85,
    textAlign: 'center',
    marginTop: 14,
    fontSize: 13,
  },
});
