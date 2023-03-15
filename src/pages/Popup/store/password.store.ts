import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { chromeSessionStorageWrapper } from './utils';

export interface PasswordStore {
  password?: string;
  setPassword: (password: string) => void;
}

export const usePasswordStore = create(
  persist<PasswordStore>(
    (set) => ({
      password: undefined,
      setPassword: (password: string) =>
        set((state) => ({
          ...state,
          password,
        })),
    }),
    {
      name: 'password-store',
      storage: createJSONStorage(() => chromeSessionStorageWrapper),
    }
  )
);
