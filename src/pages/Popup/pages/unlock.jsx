import React from 'react';
import { Alert, Button, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { AlertCircle } from 'tabler-icons-react';
import {
  hasRequestedLogin,
  retrieveIdentity,
  storeIdentityToSessionStorage,
  retrieveLoginRequestData,
} from '../store/local.store';
// import { useIdentityStore } from '../state/identity.state';
import { useRouterStore } from '../store/router.store';
// import { useLoginRequestStore } from '../state/login-request.state';

const Unlock = () => {
  // const identityStore = useIdentityStore();
  const routerStore = useRouterStore();
  // const loginRequestStore = useLoginRequestStore();

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  const form = useForm({
    initialValues: {
      password: '',
    },
    validate: {
      password: (value) =>
        value.length < 8 ? 'Password must have at least 8 letters' : null,
    },
  });

  const onSubmit = async (values) => {
    try {
      const result = await retrieveIdentity(values.password);

      await storeIdentityToSessionStorage(result.didData, result.didDocument);

      // identityStore.set(result);

      if (await hasRequestedLogin()) {
        const loginRequestData = await retrieveLoginRequestData();

        // loginRequestStore.setUrl(loginRequestData.url);
        routerStore.setPage('LOGIN');
      } else {
        routerStore.setPage('DASHBOARD');
      }
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  return (
    <>
      <Title align="center" order={1}>
        Decentrl
      </Title>
      {error && (
        <Alert
          icon={<AlertCircle size={16} />}
          color="red"
          title="Invalid password"
          mt={'md'}
          mb={'md'}
        >
          The password you entered is invalid.
        </Alert>
      )}
      <form onSubmit={form.onSubmit(onSubmit)}>
        <TextInput
          mt={'sm'}
          label={'Please enter your password'}
          description={
            'Your identity is locked. Please use your password to unlock'
          }
          value={form.values.alias}
          type={'password'}
          placeholder={'Password'}
          required
          {...form.getInputProps('password')}
        />
        <Button fullWidth mt="md" type="submit" loading={loading}>
          Unlock
        </Button>
      </form>
    </>
  );
};

export default Unlock;
