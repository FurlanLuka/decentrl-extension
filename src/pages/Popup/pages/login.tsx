import React from 'react';
import { useLoginRequestStore } from '../store/login-request.store';
import IdentitySelector from '../components/identity-selector';
import { Identity } from '../store/encrypted-identity.store';

export function Login() {
  const loginRequestStore = useLoginRequestStore();

  const signIn = async (identity: Identity) => {
    await chrome.runtime.sendMessage({
      type: 'DECENTRL_REQUEST_IDENTITY_AUTHORIZATION_RESPONSE',
      didData: identity.didData,
      didDocument: identity.didDocument,
    });

    loginRequestStore.setData(undefined, undefined);

    window.close();
  };

  // const reject = async () => {
  //   await chrome.runtime.sendMessage({
  //     type: 'DECENTRL_REQUEST_IDENTITY_AUTHORIZATION_RESPONSE',
  //   });

  //   loginRequestStore.setData(undefined, undefined);
  //   window.close();
  // };

  return (
    <>
      <IdentitySelector
        title="Select Identity"
        actionButtonText="Login"
        ignoreAddNewIdentity
        onIdentitySelection={signIn}
      />
    </>
  );
}

export default Login;
