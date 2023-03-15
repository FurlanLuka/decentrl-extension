import { StateStorage } from 'zustand/middleware';

export const chromeLocalStorageWrapper: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    const result = await chrome.storage.local.get(name);

    if (!result[name]) {
      return null;
    }

    return result[name];
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await chrome.storage.local.set({
      [name]: value,
    });
  },
  removeItem: async (name: string): Promise<void> =>
    chrome.storage.local.remove(name),
};

export const chromeSessionStorageWrapper: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    const result = await chrome.storage.sync.get(name);

    if (!result[name]) {
      return null;
    }

    return result[name];
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await chrome.storage.sync.set({
      [name]: value,
    });
  },
  removeItem: async (name: string): Promise<void> =>
    chrome.storage.sync.remove(name),
};
