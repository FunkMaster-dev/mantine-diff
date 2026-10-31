import React from 'react';
import { Diff, DiffProps } from './Diff';
import { IconFile } from '@tabler/icons-react';

export default { title: 'Diff' };

const defaultProps = {
  config: {
    file: {
      name: 'File',
      TablerIcon: IconFile,
    },
  },
  data: [
    {
      id: 'main.ts',
      name: 'main.ts',
      status: 'added',
      type: 'file',
    },
    {
      id: 'root.tsx',
      name: 'root.tsx',
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