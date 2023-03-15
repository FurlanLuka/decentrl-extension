import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { chromeSessionStorageWrapper } from './utils';

export interface LoginRequestStore {
  url?: string;
  tabId?: string;
  setData: (url: string | undefined, tabId: string | undefined) => void;
}

export const useLoginRequestStore = create(
  persist<LoginRequestStore>(
    (set) => ({
      url: undefined,
      tab: undefined,
      setData: (url: string | undefined, tabId: string | undefined) =>
        set({
          url: url,
          tabId: tabId,
        }),
    }),
    {
      name: 'login-request-store',
      storage: createJSONStorage(() => chromeSessionStorageWrapper),
    }
  )
);
