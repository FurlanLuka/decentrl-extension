import React from 'react';
import IdentitySelector from '../components/identity-selector';
import { IdentitySettings } from '../components/identity-settings';
import { RouterState, useRouterStore } from '../store/router.store';

export function Dashboard() {
  const routerStore = useRouterStore();

  if (routerStore.state.metadata.selectedIdentityDid === undefined) {
    return (
      <>
        <IdentitySelector
          onIdentitySelection={(identity) =>
            routerStore.setState(RouterState.DASHBOARD, {
              selectedIdentityDid: identity.did,
            })
          }
        />
      </>
    );
  }

  return (
    <>
      <IdentitySettings
        selectedIdentityDid={routerStore.state.metadata.selectedIdentityDid}
        onBack={() =>
          routerStore.setState(RouterState.DASHBOARD, {
            selectedIdentityDid: undefined,
          })
        }
      />
    </>
  );
}

export default Dashboard;
