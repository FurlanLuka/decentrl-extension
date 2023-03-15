import React, { PropsWithChildren } from 'react';
import Register from '../pages/register';
import Unlock from '../pages/unlock';
import Loader from '../pages/loader';
import Dashboard from '../pages/dashboard';
import Login from '../pages/login';
import { RouterState, useRouterStore } from '../store/router.store';
import AddMediatorNode from '../pages/add-mediator-node';

export function Router({ children }: PropsWithChildren) {
  const state = useRouterStore((state) => state.state);

  switch (state.route) {
    case RouterState.LOADING:
      return <Loader />;
    case RouterState.REGISTER:
      return <Register />;
    case RouterState.DASHBOARD:
      return <Dashboard />;
    case RouterState.LOGIN:
      return <Login />;
    case RouterState.UNLOCK:
      return <Unlock />;
    case RouterState.ADD_MEDIATOR_NODE:
      return <AddMediatorNode />;
    default:
      return <>{children}</>;
  }
}
