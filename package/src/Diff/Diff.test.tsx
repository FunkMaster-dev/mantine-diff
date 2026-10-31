import { render, screen, tests } from '@mantine-tests/core';
import React from 'react';
import { Diff, DiffProps, DiffStylesNames } from './Diff';
import { IconFile } from '@tabler/icons-react';

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
  });
});