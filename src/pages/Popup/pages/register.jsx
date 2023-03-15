import React from 'react';
import {
  Alert,
  Button,
  TextInput,
  Title,
  Select,
  createStyles,
  Divider,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { AlertCircle } from 'tabler-icons-react';
import {
  generateDid,
  generateDidDocument,
  registerDidDocument,
} from '@decentrl/ssi-utils';
import { RouterState, useRouterStore } from '../store/router.store';
import { useEncryptedIdentityStore } from '../store/encrypted-identity.store';
import { BottomLink } from '../components/bottom-link';

export async function generateIdentity(alias, registryDid) {
  const didData = await generateDid(registryDid.split(':').slice(2));

  const didDocument = generateDidDocument(didData, {
    alias,
    // service: {
    //   id: `${didData.did}#mediator`,
    //   type: 'DecentrlMediatorClient',
    //   serviceEndpoint: 'did:web:mediator.decentrl.network',
    // },
  });

  await registerDidDocument(
    registryDid,
    didData,
    didDocument
  );

  return {
    didData,
    didDocument,
  };
}

const useStyles = createStyles((theme) => {});

const Register = () => {
  const routerStore = useRouterStore();
  const encryptedIdentityStore = useEncryptedIdentityStore();

  const [loading, setLoading] = React.useState(false);
  const form = useForm({
    initialValues: {
      alias: '',
      registryDid: '',
      password: '',
    },
    validate: {
      alias: (value) =>
        value.length < 2 ? 'Alias must have at least 2 letters' : null,
    },
  });

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      const identity = await generateIdentity(values.alias, values.registryDid);

      encryptedIdentityStore.set({
        ...encryptedIdentityStore.get(values.password),
        [identity.didData.did]: {
          alias: identity.didDocument.alias,
          did: identity.didDocument.id,
          didData: identity.didData,
          didDocument: identity.didDocument,
        },
      });

      routerStore.setState(RouterState.DASHBOARD);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <Title align="center" order={1}>
        Decentrl
      </Title>
      <Alert
        icon={<AlertCircle size={16} />}
        color="blue"
        title="Setup Identity"
        mt={'md'}
        mb={'md'}
      >
        Looks like you don't have an identity setup yet. Setting up Decentrl
        identity is as simple as picking an alias.
      </Alert>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Select
          description={'Registry hosts your public identity document'}
          placeholder="Select registry you wish to use"
          value={form.values.registryUrl}
          data={[
            {
              value: 'did:web:registry.decentrl.network',
              label: 'Decentrl (did:web:registry.decentrl.network)',
            },
          ]}
          required
          {...form.getInputProps('registryDid')}
        />
        <TextInput
          mt={'sm'}
          description={'Used to provide more user-friendly identifier'}
          value={form.values.alias}
          placeholder={'Alias'}
          required
          {...form.getInputProps('alias')}
        />
        {/* {passwordStore.password === undefined ? (
          <TextInput
            mt={'sm'}
            description={'Used to protect your encryption and signing keys'}
            value={form.values.alias}
            type={'password'}
            placeholder={'Password'}
            required
            {...form.getInputProps('password')}
          />
        ) : (
          ''
        )} */}
        <Button fullWidth mt="md" type="submit" loading={loading}>
          Setup your identity
        </Button>
      </form>
      <Divider my="sm" />
      <BottomLink
        onClick={() => {
          routerStore.setState(RouterState.DASHBOARD);
        }}
      >
        Go back
      </BottomLink>
    </>
  );
};

export default Register;
