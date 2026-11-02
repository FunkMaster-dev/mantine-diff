import { IconFile, IconFolder } from '@tabler/icons-react';
import { DiffProps } from '@funkmaster/mantine-diff';

export const config: DiffProps['config'] = {
  file: {
    prefix: 'File',
    TablerIcon: IconFile,
  },
  folder: {
    prefix: 'Folder',
    TablerIcon: IconFolder,
  },
};

export const data: DiffProps['data'] = [
  {
    id: 'src',
    label: 'src',
    status: 'modified',
    type: 'folder',
    children: [
      {
        id: 'src/root.tsx',
        label: 'root.tsx',
        status: 'modified',
        type: 'file',
        content: 'root.tsx modified',
      },
    ],
  },
  {
    id: 'dist',
    label: 'dist',
    status: 'removed',
    type: 'folder',
    children: [
      {
        id: 'dist/index.d.ts',
        label: 'index.d.ts',
        status: 'removed',
        type: 'file',
        content: 'index.d.ts removed',
      },
    ],
  },
  {
    id: 'index.ts',
    label: 'index.ts',
    status: 'added',
    type: 'file',
    content: 'index.ts added',
  },
];

export const code = `
import { IconFile, IconFolder } from "@tabler/icons-react";
import type { DiffProps } from "@funkmaster/mantine-diff";

export const config: DiffProps['config'] = {
  file: {
    prefix: 'File',
    TablerIcon: IconFile,
  },
  folder: {
    prefix: 'Folder',
    TablerIcon: IconFolder,
  },
};

export const data: DiffProps['data'] = [
  {
    id: 'src',
    label: 'src',
    status: 'modified',
    type: 'folder',
    children: [
      {
        id: 'src/root.tsx',
        label: 'root.tsx',
        status: 'modified',
        type: 'file',
        content: 'root.tsx modified',
      },
    ],
  },
  {
    id: 'dist',
    label: 'dist',
    status: 'removed',
    type: 'folder',
    children: [
      {
        id: 'dist/index.d.ts',
        label: 'index.d.ts',
        status: 'removed',
        type: 'file',
        content: 'index.d.ts removed',
      },
    ],
  },
  {
    id: 'index.ts',
    label: 'index.ts',
    status: 'added',
    type: 'file',
    content: 'index.ts added',
  },
];
`;
