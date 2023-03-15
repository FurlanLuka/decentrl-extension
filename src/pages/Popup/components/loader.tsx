import React from 'react';
import { LoadingOverlay } from '@mantine/core';

export function LoaderIcon() {
  return (
    <div style={{ height: 400 }}>
      <LoadingOverlay visible overlayBlur={2} />
    </div>
  );
}
