/* eslint-disable react-refresh/only-export-components */
import { ConfigProvider, theme } from 'antd';
import { createContext, useContext, type ReactNode } from 'react';

export type DSMode = 'light' | 'dark';

// Seed values must stay identical to tokens/design-tokens.json; the guard
// lives in tests/ds-provider.test.tsx.
export const dsSeedTokens: Record<DSMode, Record<string, string | number>> = {
  light: {
    colorPrimary: '#1677ff',
    colorInfo: '#1677ff',
    colorLink: '#1677ff',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#ff4d4f',
    borderRadius: 6,
    fontSize: 14,
  },
  dark: {
    colorPrimary: '#1668dc',
    colorInfo: '#1668dc',
    colorLink: '#1668dc',
    colorSuccess: '#49aa19',
    colorWarning: '#d89614',
    colorError: '#dc4446',
    borderRadius: 6,
    fontSize: 14,
  },
};

// Purple is reserved for AI affordances (ADR 0002). Applied through a nested
// ConfigProvider by the `ai` button variant.
export const dsAiTokens: Record<DSMode, Record<string, string>> = {
  light: {
    colorPrimary: '#722ed1',
    colorPrimaryHover: '#9254de',
    colorPrimaryActive: '#531dab',
  },
  dark: {
    colorPrimary: '#642ab5',
    colorPrimaryHover: '#854eca',
    colorPrimaryActive: '#854eca',
  },
};

const DSModeContext = createContext<DSMode>('light');

export function useDSMode(): DSMode {
  return useContext(DSModeContext);
}

export interface DSProviderProps {
  /** Antd algorithm switch. CSS variables follow `data-theme` separately. */
  mode?: DSMode;
  children: ReactNode;
}

export function DSProvider({ mode = 'light', children }: DSProviderProps) {
  return (
    <DSModeContext.Provider value={mode}>
      <ConfigProvider
        theme={{
          hashed: true,
          algorithm: mode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
          token: dsSeedTokens[mode],
        }}
      >
        {children}
      </ConfigProvider>
    </DSModeContext.Provider>
  );
}
