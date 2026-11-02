import React from 'react';
import { Diff, DiffProps } from './Diff';
import { IconFile } from '@tabler/icons-react';

export default { title: 'Diff' };

const defaultProps = {
  config: {
    file: {
      prefix: 'File',
      TablerIcon: IconFile,
    },
  },
  data: [
    {
      id: 'main.ts',
      label: 'main.ts',
      status: 'added',
      type: 'file',
    },
    {
      id: 'root.tsx',
      label: 'root.tsx',
      status: 'modified',
      type: 'file',
    },
  ],
} as const satisfies DiffProps;

export function Usage() {
  return (
    <div style={{ padding: 40 }}>
      <Diff {...defaultProps}>
        <Diff.Tree />
      </Diff>
    </div>
  );
}
