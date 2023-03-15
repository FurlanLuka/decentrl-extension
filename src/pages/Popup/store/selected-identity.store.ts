import { createStore } from 'zustand';

export interface SelectedIdentityStore {
  identityDid?: string;
  selectIdentity: (did: string) => void;
}

export const useSelectedIdentityStore = createStore<SelectedIdentityStore>(
  (set) => ({
    identityDid: undefined,
    selectIdentity: (did: string) =>
      set((state) => ({ ...state, identityDid: did })),
  })
);
