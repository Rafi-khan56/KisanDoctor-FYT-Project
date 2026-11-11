import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Alert, I18nManager } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Strings, ur } from './ur';
import { en } from './en';

export type Lang = 'ur' | 'en';

const KEY = 'kd_language';
const dictionaries: Record<Lang, Strings> = { ur, en };

type Ctx = { lang: Lang; t: Strings; setLang: (l: Lang) => void };
const LanguageContext = createContext<Ctx>({
  lang: 'ur',
  t: ur,
  setLang: () => {},
});

// Urdu = right-to-left, English = left-to-right.
// Android ye badlav sirf app dobara khulne par laagu karta hai.
function applyDirection(lang: Lang) {
  const rtl = lang === 'ur';
  I18nManager.allowRTL(rtl);
  I18nManager.forceRTL(rtl);
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('ur');

  // App khulte hi pichli chuni hui zubaan wapas lao
  useEffect(() => {
    AsyncStorage.getItem(KEY)
      .then(saved => {
        const l: Lang = saved === 'en' ? 'en' : 'ur';
        setLangState(l);
        applyDirection(l);
      })
      .catch(() => applyDirection('ur'));
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      lang,
      t: dictionaries[lang],
      setLang: (l: Lang) => {
        setLangState(l);
        AsyncStorage.setItem(KEY, l).catch(() => {});
        applyDirection(l);
        if (I18nManager.isRTL !== (l === 'ur')) {
          Alert.alert('', dictionaries[l].restartNote);
        }
      },
    }),
    [lang],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
export const useT = () => useContext(LanguageContext).t;
