import React from 'react';
import {
  Title,
  Button,
  Center,
  createStyles,
  Paper,
  SimpleGrid,
  Divider,
} from '@mantine/core';
import { Identity, IdentityList, useEncryptedIdentityStore } from '../store/encrypted-identity.store';
import { RouterState, useRouterStore } from '../store/router.store';
import { BottomLink } from './bottom-link';

const useStyles = createStyles((theme) => ({
  Item: {
    backgroundColor: theme.colors.dark[5],
    padding: 15,
  },
  ItemAlias: {
    width: '60%',
    display: 'inline-block',
  },
  ItemMore: {
    width: '40%',
    display: 'inline-block',
    textAlign: 'right',
  },
  AddNew: {
    marginTop: 15,
    color: theme.colors.blue[6],
  },
}));

export interface IdentitySelectorProps {
  onIdentitySelection: (identity: Identity) => void;
  title?: string;
  actionButtonText?: string;
  ignoreAddNewIdentity?: boolean;
}

export function IdentitySelector(props: IdentitySelectorProps) {
  const routerStore = useRouterStore();
  const encryptedIdentityStore = useEncryptedIdentityStore();
  const styles = useStyles();

  const addNewIdentity = () => {
    routerStore.setState(RouterState.REGISTER);
  };

  return (
    <>
      <Title align="center" order={1}>
        {props.title ?? 'Your Identities'}
      </Title>
      <SimpleGrid cols={1} mt={'lg'} spacing={'xs'}>
        {Object.keys(encryptedIdentityStore.list).map((identityDid: string) => {
          return (
            <Paper className={styles.classes.Item}>
              <div className={styles.classes.ItemAlias}>
                {encryptedIdentityStore.list[identityDid].alias}
              </div>
              <div className={styles.classes.ItemMore}>
                <Button
                  onClick={() =>
                    props.onIdentitySelection(encryptedIdentityStore.list[identityDid])
                  }
                >
                  {props.actionButtonText ?? 'Show details'}
                </Button>
              </div>
            </Paper>
          );
        })}
      </SimpleGrid>
      <Center>
        {props.ignoreAddNewIdentity ? undefined : <BottomLink onClick={addNewIdentity} className={styles.classes.AddNew}>
          Add new Identity
        </BottomLink>}
      </Center>
    </>
  );
}

export default IdentitySelector;
