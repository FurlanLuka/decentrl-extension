import { DidData, DidDocument } from '@decentrl/ssi-utils';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { chromeSessionStorageWrapper } from './utils';

export interface Identity {
  did: string;
  alias: string;
  didDocument: DidDocument;
  didData: DidData;
}

export interface IdentityStore {
  identities: {
    [key: string]: Identity;
  };
  setIdentity: (identity: Identity) => void;
  getIdentity: (did: string) => Identity | undefined;
}

export const useIdentityStore = create(
  persist<IdentityStore>(
    (set, get) => ({
      identities: {},
      setIdentity: (identity: Identity) =>
        set((state) => ({
          ...state,
          identities: {
            ...state.identities,
            [identity.did]: identity,
          },
        })),
      getIdentity: (did: string) => {
        return get().identities[did];
      },
    }),
    {
      name: 'identity-store',
      storage: createJSONStorage(() => chromeSessionStorageWrapper),
    }
  )
);
