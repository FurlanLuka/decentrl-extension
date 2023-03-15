import React, { useEffect } from 'react';
import {
  Title,
  Center,
  createStyles,
  Paper,
  Divider,
  Button,
} from '@mantine/core';
import { useEncryptedIdentityStore } from '../store/encrypted-identity.store';
import { BottomLink } from './bottom-link';
import { RouterState, useRouterStore } from '../store/router.store';
import { getMediatorClientServices } from '@decentrl/ssi-utils';

export interface IdentitySettingsProps {
  onBack: () => void;
  selectedIdentityDid: string;
}

const useStyle = createStyles((theme) => ({
  Mediator: {
    backgroundColor: theme.colors.dark[5],
    padding: 15,
  },
}));

export function IdentitySettings(props: IdentitySettingsProps) {
  const encryptedIdentityStore = useEncryptedIdentityStore();
  const routerStore = useRouterStore();

  const styles = useStyle();

  useEffect(() => {
    if (encryptedIdentityStore.list[props.selectedIdentityDid] === undefined) {
      props.onBack();
    }
  }, [encryptedIdentityStore.list]);

  const identity = encryptedIdentityStore.list[props.selectedIdentityDid];

  const onAddNewNode = () =>
    routerStore.setState(RouterState.ADD_MEDIATOR_NODE, {
      selectedIdentityDid: props.selectedIdentityDid,
    });

  const mediatorNodes = getMediatorClientServices(identity.didDocument);

  return (
    <>
      <Title order={1}>{identity.alias}</Title>
      <Divider my="sm" />
      <Title order={5}>Mediator nodes</Title>
      <Paper>
        {mediatorNodes.length > 0 ? (
          mediatorNodes.map((node) => (
            <Paper mt={'xs'} className={styles.classes.Mediator}>
              {node.serviceEndpoint}
            </Paper>
          ))
        ) : (
          <>
            You have no mediator nodes setup. If you want to use Decentrl
            network, you have to add a node.<br />
          </>
        )}
        <Button mt={'md'} onClick={onAddNewNode}>
          Add node
        </Button>
      </Paper>
      <Divider my="sm" />
      <Center>
        <BottomLink onClick={props.onBack}>
          Back to identity selection
        </BottomLink>
      </Center>
    </>
  );
}
