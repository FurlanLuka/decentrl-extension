import React from 'react';
import {
  Button,
  TextInput,
  Title,
  Select,
  Divider,
  Center,
  Space,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import {
  DidDocument,
  DidDocumentBuilder,
  registerDidDocument,
  registerMediatorClient,
} from '@decentrl/ssi-utils';
import { RouterState, useRouterStore } from '../store/router.store';
import { useEncryptedIdentityStore } from '../store/encrypted-identity.store';
import { BottomLink } from '../components/bottom-link';

const AddMediatorNode = () => {
  const routerStore = useRouterStore();
  const encryptedIdentityStore = useEncryptedIdentityStore();

  const [loading, setLoading] = React.useState(false);
  const form = useForm({
    initialValues: {
      mediatorDid: undefined,
      selectedMediatorDid: undefined,
    },
  });

  const onSubmit = async (values: Record<string, any>) => {
    const selectedIdentity =
      encryptedIdentityStore.list[
        routerStore.state.metadata.selectedIdentityDid
      ];

    if (selectedIdentity === undefined) {
      return;
    }

    setLoading(true);

    const mediatorDid = values.mediatorDid ?? values.selectedMediatorDid;

    try {
      const mediatorRegistrationResult = await registerMediatorClient(
        mediatorDid,
        encryptedIdentityStore.list[
          routerStore.state.metadata.selectedIdentityDid
        ].didData
      );

      const registryDid: string = selectedIdentity.did
        .split(':')
        .slice(0, 3)
        .join(':');

      const updatedDidDocument: DidDocument = new DidDocumentBuilder()
        .load(selectedIdentity.didDocument)
        .addServiceEndpoint(mediatorRegistrationResult)
        .build();

      await registerDidDocument(
        registryDid,
        selectedIdentity.didData,
        updatedDidDocument,
        true
      );

      encryptedIdentityStore.set({
        ...encryptedIdentityStore.list,
        [selectedIdentity.did]: {
          ...selectedIdentity,
          didDocument: updatedDidDocument,
        },
      });

      routerStore.setState(RouterState.DASHBOARD, {
        selectedIdentityDid: selectedIdentity.did,
      });
    } catch (error) {
      console.log(error);

      setLoading(false);
    }
  };

  return (
    <>
      <Title align="center" order={1}>
        Add a Mediator
      </Title>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <TextInput
          mt={'sm'}
          description={'Enables you to communicate over Decentrl network'}
          placeholder={'Mediator DID'}
          {...form.getInputProps('mediatorDid')}
        />
        <Space h={'md'} />
        <Center>or</Center>
        <Space h={'md'} />
        <Select
          description={'Select one of the default mediator nodes'}
          placeholder="Default mediator nodes"
          data={[
            {
              value: 'did:web:mediator.decentrl.network',
              label: 'Decentrl Mediator #1',
            },
          ]}
          {...form.getInputProps('selectedMediatorDid')}
        />
        <Button fullWidth mt="md" type="submit" loading={loading}>
          Submit
        </Button>
      </form>
      <Divider my="sm" />
      <BottomLink
        onClick={() => {
          routerStore.setState(RouterState.DASHBOARD, {
            selectedIdentityDid: routerStore.state.metadata.selectedIdentityDid,
          });
        }}
      >
        Go back
      </BottomLink>
    </>
  );
};

export default AddMediatorNode;
