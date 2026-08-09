"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { defaultLocale, isLocale, type Locale } from "./config";

const storageKey = "fiddelis:locale";

type LocaleContextValue = {
  locale: Locale;
  setLocale: Dispatch<SetStateAction<Locale>>;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function getPreferredLocale(): Locale {
  const savedLocale = window.localStorage.getItem(storageKey);

  if (isLocale(savedLocale)) {
    return savedLocale;
  }

  return window.navigator.language.toLowerCase().startsWith("pt")
    ? "pt"
    : defaultLocale;
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(defaultLocale);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setLocale(getPreferredLocale());
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;

    window.localStorage.setItem(storageKey, locale);
    document.documentElement.lang = locale;
  }, [isReady, locale]);

  const value = useMemo(() => ({ locale, setLocale }), [locale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);

  if (!context) {
    throw new Error("useLocale must be used inside LocaleProvider");
  }

  return context;
}
