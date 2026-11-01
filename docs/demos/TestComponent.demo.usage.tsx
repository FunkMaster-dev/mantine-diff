import { MantineDemo } from '@mantinex/demo';
import { TestComponent } from '@funkmaster/mantine-diff';
import React from 'react';

const code = `
import { TestComponent } from '@funkmaster/mantine-diff';

function Demo() {
  return <TestComponent label="Test component usage demo" />;
}
`;

function Demo() {
  return <TestComponent label="Test component usage demo" />;
}

export const usage: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
