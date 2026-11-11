import {
  getAuth,
  onAuthStateChanged,
  signInWithPhoneNumber,
  signOut as fbSignOut,
} from '@react-native-firebase/auth';

// Pakistani nambar ko +92 wali shakal mein badalta hai.
// 0300 1234567, 300 1234567, 923001234567, +923001234567 sab chalenge.
export function toE164(input: string): string | null {
  const d = input.replace(/[^\d+]/g, '');
  if (/^\+92\d{10}$/.test(d)) return d;
  if (/^92\d{10}$/.test(d)) return '+' + d;
  if (/^0\d{10}$/.test(d)) return '+92' + d.slice(1);
  if (/^3\d{9}$/.test(d)) return '+92' + d;
  return null;
}

// SMS (ya test number ka code) bhejta hai. Wapas ek "confirmation" milta hai.
export function sendCode(phoneE164: string) {
  return signInWithPhoneNumber(getAuth(), phoneE164);
}

// Types alag import nahi kiye, seedha functions se nikaal liye (naye aur purane version dono mein chalta hai).
export type Confirmation = Awaited<ReturnType<typeof sendCode>>;
export type AuthUser = ReturnType<typeof getAuth>['currentUser'];

export function signOut() {
  return fbSignOut(getAuth());
}

export function currentPhone(): string {
  return getAuth().currentUser?.phoneNumber ?? '';
}

export function watchAuth(cb: (user: AuthUser) => void) {
  return onAuthStateChanged(getAuth(), cb);
}

export type AuthErrorKind = 'tooMany' | 'wrongCode' | 'network' | 'badPhone' | 'other';

export function authErrorKind(e: unknown): AuthErrorKind {
  const code = (e as { code?: string })?.code ?? '';
  if (code === 'auth/too-many-requests') return 'tooMany';
  if (code === 'auth/invalid-verification-code' || code === 'auth/code-expired') return 'wrongCode';
  if (code === 'auth/network-request-failed') return 'network';
  if (code === 'auth/invalid-phone-number') return 'badPhone';
  return 'other';
}
