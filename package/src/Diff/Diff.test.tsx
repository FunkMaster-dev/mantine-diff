import { render, screen, tests } from '@mantine-tests/core';
import React from 'react';
import { Diff, DiffProps, DiffStylesNames } from './Diff';
import { IconFile } from '@tabler/icons-react';

const CONSTS = { MAIN_ID: 'main.ts', ROOT_ID: 'root.tsx' } as const;

const defaultProps: DiffProps = {
  config: {
    file: {
      name: 'File',
      TablerIcon: IconFile,
    },
  },
  data: [
    {
      id: CONSTS.MAIN_ID,
      name: 'main.ts',
      status: 'added',
      type: 'file',
    },
    {
      id: CONSTS.ROOT_ID,
      name: 'root.tsx',
      status: 'modified',
      type: 'file',
    },
  ],
};

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
    expect(screen.getByTestId(`diff-tree-node__${CONSTS.MAIN_ID}`)).toBeInTheDocument();
    expect(screen.getByTestId(`diff-tree-node__${CONSTS.ROOT_ID}`)).toBeInTheDocument();
  });
});
