import aes from 'crypto-js/aes';
import crypto from 'crypto-js';

export async function storeIdentity(didData, didDocument, password) {
  const payload = {
    didData,
    didDocument,
  };

  await chrome.storage.local.set({
    'encrypted-identity': aes
      .encrypt(JSON.stringify(payload), password)
      .toString(),
  });
}

export async function storeIdentityToSessionStorage(didData, didDocument) {
  await chrome.storage.session.set({
    identity: JSON.stringify({
      didData,
      didDocument,
    }),
  });
}

export async function retrieveIdentity(password) {
  const storageResult = await chrome.storage.local.get(['encrypted-identity']);

  const dec = aes.decrypt(storageResult['encrypted-identity'], password);

  return JSON.parse(dec.toString(crypto.enc.Utf8));
}

export async function retrieveIdentityFromSessionStorage() {
  const storageResult = await chrome.storage.session.get(['identity']);

  return JSON.parse(storageResult['identity']);
}

export async function isRegistered() {
  const storageResult = await chrome.storage.local.get(['encrypted-identity']);

  return storageResult['encrypted-identity'] !== undefined;
}

export async function isUnlocked() {
  const storageResult = await chrome.storage.session.get(['identity']);

  return storageResult['identity'] !== undefined;
}

export async function hasRequestedLogin() {
  const storageResult = await chrome.storage.session.get(['login-request']);

  return storageResult['login-request'] !== undefined;
}

export async function retrieveLoginRequestData() {
  const storageResult = await chrome.storage.session.get(['login-request']);

  return JSON.parse(storageResult['login-request']);
}

export async function removeLoginRequest() {
  await chrome.storage.session.remove('login-request')
}