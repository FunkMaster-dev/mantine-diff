import { MantineDemo } from '@mantinex/demo';
import { Group } from '@mantine/core';
import { Diff } from '@funkmaster/mantine-diff';
import { config, data, code as dataCode } from './Diff.demo.usage.data';
import React from 'react';

const code = `
import { Group } from '@mantine/core';
import { Diff } from '@funkmaster/mantine-diff';
import { config, data } from './data';

const demoValuesHandler = (values: string[]) => {
  console.log({ values });
};

function Demo() {
  return (
    <Diff
      config={config}
      data={data}
      onApplyChanges={demoValuesHandler}
      onCheckedChange={demoValuesHandler}
    >
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

const demoValuesHandler = (values: string[]) => {
  // oxlint-disable-next-line no-console
  console.log({ values });
};

function Demo() {
  return (
    <Diff
      config={config}
      data={data}
      onApplyChanges={demoValuesHandler}
      onCheckedChange={demoValuesHandler}
    >
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

export const usage: MantineDemo = {
  type: 'code',
  component: Demo,
  code: [
    { code, fileName: 'Demo.tsx', language: 'tsx' },
    { code: dataCode, fileName: 'data.ts', language: 'tsx' },
  ],
  centered: true,
};
