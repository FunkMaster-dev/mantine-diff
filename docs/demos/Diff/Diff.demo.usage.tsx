import { MantineDemo } from '@mantinex/demo';
import { Group } from '@mantine/core';
import { Diff } from 'mantine-diff';
import { config, data, code as dataCode } from './Diff.demo.usage.data';
import React from 'react';

const code = `
import { Group } from '@mantine/core';
import { Diff } from 'mantine-diff';
import { config, data } from './data.tsx';

const demoOnApplyChanges = (values: string[]) => {
  console.log({ values });
};

function Demo() {
  return (
    <Diff config={config} data={data} onApplyChanges={demoOnApplyChanges}>
      <Group justify="space-between">
        <Diff.Counter />
        <Diff.ApproveAllCheckbox />
      </Group>

      <Diff.Tree />

      <Group justify="flex-end">
        <Diff.ApplyChangesButton />
      </Group>
    </Diff>
  );
}
`;

const demoOnApplyChanges = (values: string[]) => {
  // oxlint-disable-next-line no-console
  console.log({ values });
};

function Demo() {
  return (
    <Diff config={config} data={data} onApplyChanges={demoOnApplyChanges}>
      <Group justify="space-between">
        <Diff.Counter />
        <Diff.ApproveAllCheckbox />
      </Group>

      <Diff.Tree />

      <Group justify="flex-end">
        <Diff.ApplyChangesButton />
      </Group>
    </Diff>
  );
}

export const diffUsage: MantineDemo = {
  type: 'code',
  component: Demo,
  code: [
    { code, fileName: 'Demo.tsx', language: 'tsx' },
    { code: dataCode, fileName: 'data.tsx', language: 'tsx' },
  ],
  centered: true,
};
