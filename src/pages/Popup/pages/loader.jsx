import React, { useEffect, useState } from 'react';
import { useEncryptedIdentityStore } from '../store/encrypted-identity.store';
import { RouterState, useRouterStore } from '../store/router.store';
import { LoaderIcon } from '../components/loader';
import { useLoginRequestStore } from '../store/login-request.store';

export function Loader() {
  const routerStore = useRouterStore();
  const encryptedIdentityStore = useEncryptedIdentityStore();
  const loginRequestStore = useLoginRequestStore();
  const [isHydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (!useEncryptedIdentityStore.persist.hasHydrated()) {
      useEncryptedIdentityStore.persist.onFinishHydration(() =>
        setHydrated(true)
      );

      return;
    }

    if (loginRequestStore.tabId && loginRequestStore.url) {
      return routerStore.setState(RouterState.LOGIN);
    }

    console.log('LIST', Object.keys(encryptedIdentityStore.list))

    if (Object.keys(encryptedIdentityStore.list).length === 0) {
      return routerStore.setState(RouterState.REGISTER);
    }

    return routerStore.setState(RouterState.DASHBOARD);
  }, [isHydrated]);

  return <LoaderIcon />;
}

export default Loader;
