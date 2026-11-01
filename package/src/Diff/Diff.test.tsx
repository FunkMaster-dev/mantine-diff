import { render, screen, tests } from '@mantine-tests/core';
import React from 'react';
import { Diff, DiffProps, DiffStylesNames } from './Diff';
import { IconFile, IconFolder } from '@tabler/icons-react';

const defaultProps = {
  config: {
    file: {
      name: 'File',
      TablerIcon: IconFile,
    },
    folder: {
      name: 'Folder',
      TablerIcon: IconFolder,
    },
  },
  data: [
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
  ],
} as const satisfies DiffProps;

describe('mantine-diff/Diff', () => {
  tests.itSupportsSystemProps<DiffProps, DiffStylesNames>({
    component: Diff,
    props: defaultProps,
    polymorphic: true,
    styleProps: true,
    extend: true,
    variant: true,
    size: true,
    classes: true,
    refType: HTMLDivElement,
    displayName: 'Diff',
    stylesApiSelectors: ['root'],
  });

  it('renders without crashing', () => {
    render(
      <Diff {...defaultProps}>
        <Diff.Tree />
      </Diff>
    );
    expect(screen.getByTestId(`diff-tree-node__${defaultProps.data[0].id}`)).toBeInTheDocument();
    expect(screen.getByTestId(`diff-tree-node__${defaultProps.data[1].id}`)).toBeInTheDocument();
    expect(screen.getByTestId(`diff-tree-node__${defaultProps.data[2].id}`)).toBeInTheDocument();
  });

  describe('mantine-diff/DiffCounter', () => {
    it('initial value should be unchecked', () => {
      const dataTestid = 'counter';
      render(
        <Diff {...defaultProps}>
          <Diff.Counter data-testid={dataTestid} />
          <Diff.Tree />
        </Diff>
      );

      const counterElement = screen.getByTestId(dataTestid);
      expect(counterElement).toBeInTheDocument();
      expect(counterElement).toHaveTextContent('0/5');
    });
  });
});
