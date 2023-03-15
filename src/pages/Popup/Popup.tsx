import React from 'react';
import { MantineProvider, Paper } from '@mantine/core';
import { Router } from './router/router';

const Popup = () => {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: 'dark',
        globalStyles: (theme) => ({
          body: {
            backgroundColor:
              theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
          },
        }),
      }}
    >
      <Paper shadow={'md'} p={30} h={'100%'}>
        <Router />
      </Paper>
    </MantineProvider>
  );
};

export default Popup;
