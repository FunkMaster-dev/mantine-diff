import { IconFile, IconFolder } from '@tabler/icons-react';
import { DiffProps } from '@funkmaster/mantine-diff';

export const config: DiffProps['config'] = {
  file: {
    name: 'File',
    TablerIcon: IconFile,
  },
  folder: {
    name: 'Folder',
    TablerIcon: IconFolder,
  },
};

export const data: DiffProps['data'] = [
  {
    id: 'src',
    name: 'src',
    status: 'modified',
    type: 'folder',
    children: [
      {
        id: 'src/root.tsx',
        name: 'root.tsx',
        status: 'modified',
        type: 'file',
        content: <>root.tsx modified</>,
      },
    ],
  },
  {
    id: 'dist',
    name: 'dist',
    status: 'removed',
    type: 'folder',
    children: [
      {
        id: 'dist/index.d.ts',
        name: 'index.d.ts',
        status: 'removed',
        type: 'file',
        content: <>index.d.ts removed</>,
      },
    ],
  },
  {
    id: 'index.ts',
    name: 'index.ts',
    status: 'added',
    type: 'file',
    content: <>index.ts added</>,
  },
];

export const code = `
import { IconFile, IconFolder } from "@tabler/icons-react";
import type { DiffProps } from "@funkmaster/mantine-diff";

export const config: DiffProps['config'] = {
  file: {
    name: 'File',
    TablerIcon: IconFile,
  },
  folder: {
    name: 'Folder',
    TablerIcon: IconFolder,
  },
};

export const data: DiffProps['data'] = [
  {
    id: 'src',
    name: 'src',
    status: 'modified',
    type: 'folder',
    children: [
      {
        id: 'src/root.tsx',
        name: 'root.tsx',
        status: 'modified',
        type: 'file',
        content: <>root.tsx modified</>,
      },
    ],
  },
  {
    id: 'dist',
    name: 'dist',
    status: 'removed',
    type: 'folder',
    children: [
      {
        id: 'dist/index.d.ts',
        name: 'index.d.ts',
        status: 'removed',
        type: 'file',
        content: <>index.d.ts removed</>,
      },
    ],
  },
  {
    id: 'index.ts',
    name: 'index.ts',
    status: 'added',
    type: 'file',
    content: <>index.ts added</>,
  },
];
`;
