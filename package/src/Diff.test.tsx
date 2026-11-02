import { render, screen, tests } from '@mantine-tests/core';
import React from 'react';
import { fireEvent } from '@testing-library/react';
import { Diff, DiffProps, DiffStylesNames } from './Diff';
import { IconFile, IconFolder } from '@tabler/icons-react';
import { useTree } from '@mantine/core';

const defaultProps = {
  config: {
    file: {
      prefix: 'File',
      TablerIcon: IconFile,
    },
    folder: {
      prefix: 'Folder',
      TablerIcon: IconFolder,
    },
  },
  data: [
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
          content: <>root.tsx modified</>,
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
          content: <>index.d.ts removed</>,
        },
      ],
    },
    {
      id: 'index.ts',
      label: 'index.ts',
      status: 'added',
      type: 'file',
      content: <>index.ts added</>,
    },
  ],
} as const satisfies DiffProps;

describe('@funkmaster/mantine-diff/Diff', () => {
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

  describe('DiffApplyChangesButton', () => {
    it('initial click on button should be called with empty array', async () => {
      const dataTestid = 'apply-changes';

      const mockHandler = jest.fn();

      render(
        <Diff {...defaultProps} onApplyChanges={mockHandler}>
          <Diff.ApplyChangesButton data-testid={dataTestid} />
          <Diff.Tree />
        </Diff>
      );

      const applyChangesElement = screen.getByTestId(dataTestid);
      expect(applyChangesElement).toBeInTheDocument();
      fireEvent.click(applyChangesElement);

      expect(mockHandler).toHaveBeenCalledWith([]);
    });

    it('click on button should be called with some ids while tree is initialized partially checked', async () => {
      const dataTestid = 'apply-changes';

      const mockHandler = jest.fn();

      function Test() {
        const tree = useTree({
          initialCheckedState: [defaultProps.data[0].children[0].id],
        });
        return (
          <Diff {...defaultProps} tree={tree} onApplyChanges={mockHandler}>
            <Diff.ApplyChangesButton data-testid={dataTestid} />
            <Diff.Tree />
          </Diff>
        );
      }

      render(<Test />);

      const applyChangesElement = screen.getByTestId(dataTestid);
      expect(applyChangesElement).toBeInTheDocument();
      fireEvent.click(applyChangesElement);

      expect(mockHandler).toHaveBeenCalledWith([
        defaultProps.data[0].children[0].id,
        defaultProps.data[0].id,
      ]);
    });
  });

  describe('ApproveAllCheckbox', () => {
    it('initial state should be unchecked', () => {
      const dataTestid = 'approve-all';
      render(
        <Diff {...defaultProps}>
          <Diff.ApproveAllCheckbox data-testid={dataTestid} />
          <Diff.Tree />
        </Diff>
      );

      const approveAllElement = screen.getByTestId(dataTestid);
      expect(approveAllElement).toBeInTheDocument();
      expect(approveAllElement).not.toBeChecked();
    });

    it('approve all checkbox should be checked while all nodes are initialized checked', () => {
      const dataTestid = 'approve-all';
      function Test() {
        const tree = useTree({
          initialCheckedState: [
            defaultProps.data[0].children[0].id,
            defaultProps.data[1].children[0].id,
            defaultProps.data[2].id,
          ],
        });
        return (
          <Diff {...defaultProps} tree={tree}>
            <Diff.Tree />
            <Diff.ApproveAllCheckbox data-testid={dataTestid} />
          </Diff>
        );
      }

      render(<Test />);

      const approveAllElement = screen.getByTestId(dataTestid);
      expect(approveAllElement).toBeInTheDocument();
      expect(approveAllElement).toBeChecked();
    });
  });

  describe('DiffCounter', () => {
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

    it('initial value should be partially checked when some nodes are initialized checked', () => {
      const dataTestid = 'counter';

      function Test() {
        const tree = useTree({
          initialCheckedState: [defaultProps.data[0].children[0].id],
        });
        return (
          <Diff {...defaultProps} tree={tree}>
            <Diff.Counter data-testid={dataTestid} />
            <Diff.Tree />
          </Diff>
        );
      }

      render(<Test />);

      const counterElement = screen.getByTestId(dataTestid);
      expect(counterElement).toBeInTheDocument();
      expect(counterElement).toHaveTextContent('2/5');
    });

    it('should be completely checked after clicking approve all checkbox', () => {
      const counterDataTestid = 'counter';
      const approveAllDataTestid = 'approve-all';

      render(
        <Diff {...defaultProps}>
          <Diff.ApproveAllCheckbox data-testid={approveAllDataTestid} />
          <Diff.Counter data-testid={counterDataTestid} />
          <Diff.Tree />
        </Diff>
      );

      const approveAllElement = screen.getByTestId(approveAllDataTestid);
      expect(approveAllElement).toBeInTheDocument();
      fireEvent.click(approveAllElement);

      const counterElement = screen.getByTestId(counterDataTestid);
      expect(counterElement).toBeInTheDocument();
      expect(counterElement).toHaveTextContent('5/5');
    });
  });
});
