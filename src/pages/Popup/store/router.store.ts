import { create } from 'zustand';

export enum RouterState {
  LOADING = 'LOADING',
  REGISTER = 'REGISTER',
  UNLOCK = 'UNLOCK',
  DASHBOARD = 'DASHBOARD',
  LOGIN = 'LOGIN',
  ADD_MEDIATOR_NODE = 'ADD_MEDIATOR_NODE',
}

export interface RouterStore {
  state: {
    route: RouterState;
    metadata: Record<string, any>;
  };
  setState: (route: RouterState, metadata?: Record<string, any>) => void;
}

export const useRouterStore = create<RouterStore>((set) => ({
  state: {
    route: RouterState.LOADING,
    metadata: {},
  },
  setState: (route, metadata = {}) =>
    set((state) => ({
      ...state,
      state: {
        route,
        metadata: metadata ?? {},
      },
    })),
}));
