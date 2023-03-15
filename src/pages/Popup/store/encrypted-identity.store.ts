import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { chromeLocalStorageWrapper } from './utils';
import { DidData, DidDocument } from '@decentrl/ssi-utils';

export interface Identity {
  did: string;
  alias: string;
  didDocument: DidDocument;
  didData: DidData;
}

export interface IdentityList {
  [key: string]: Identity;
}

export interface EncryptedIdentityStore {
  list: IdentityList;
  set: (identities: IdentityList) => void;
  get: () => IdentityList;
}

export const useEncryptedIdentityStore = create(
  persist<EncryptedIdentityStore>(
    (set, get) => ({
      list: {},
      set: (identities: IdentityList) => {
        set((state) => ({
          ...state,
          list: identities,
        }));
      },
      get: () => {
        return get().list;
      },
    }),
    {
      name: 'encrypted-identity-store',
      storage: createJSONStorage(() => chromeLocalStorageWrapper),
    }
  )
);
