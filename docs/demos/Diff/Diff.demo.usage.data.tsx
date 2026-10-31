import { IconFile, IconFolder } from '@tabler/icons-react';
import { DiffProps } from 'mantine-diff';

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
    type: 'folder',
    name: 'src',
    status: 'modified',
    children: [
      {
        id: 'src/root.ts',
        type: 'file',
        name: 'root.ts',
        status: 'added',
      },
      {
        id: 'src/hooks',
        name: 'hooks',
        type: 'folder',
        status: 'modified',
        children: [
          { id: 'src/hooks/useMyData.ts', name: 'useMyData.ts', type: 'file', status: 'added' },
          {
            id: 'src/hooks/useSomeHook.ts',
            name: 'useSomeHook.ts',
            type: 'file',
            status: 'modified',
            content: <div>Some changes</div>,
          },
        ],
      },
      {
        id: 'src/index.ts',
        type: 'file',
        name: 'index.ts',
        status: 'removed',
      },
      {
        id: 'src/main.ts',
        type: 'file',
        name: 'index.ts',
        status: 'modified',
        content: <div>Hey there</div>,
      },
    ],
  },
];

export const code = `
import { IconFile, IconFolder } from "@tabler/icons-react";
import type { DiffProps } from "mantine-diff";

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
    type: 'folder',
    name: 'src',
    status: 'modified',
    children: [
      {
        id: 'src/root.ts',
        type: 'file',
        name: 'root.ts',
        status: 'added',
      },
      {
        id: 'src/hooks',
        name: 'hooks',
        type: 'folder',
        status: 'added',
        children: [
          { id: 'src/hooks/useMyData.ts', name: 'useMyData.ts', type: 'file', status: 'added' },
          {
            id: 'src/hooks/useSomeHook.ts',
            name: 'useSomeHook.ts',
            type: 'file',
            status: 'modified',
            content: <div>Some changes</div>,
          },
        ],
      },
      {
        id: 'src/index.ts',
        type: 'file',
        name: 'index.ts',
        status: 'removed',
      },
      {
        id: 'src/main.ts',
        type: 'file',
        name: 'index.ts',
        status: 'modified',
        content: <div>Hey there</div>,
      },
    ],
  },
];
`;