import { Button, ButtonProps, ElementProps } from '@mantine/core';
import React, { useCallback, type ReactNode } from 'react';
import { useDiff } from '../Diff.context';

export type DiffApplyChangesButtonProps = ButtonProps &
  ElementProps<'button'> & {
    label?: ReactNode;
  };

export const DiffApplyChangesButton = ({
  label = 'Approve changes',
  onClick: __onClick,
  ...props
}: DiffApplyChangesButtonProps) => {
  const { tree, onApplyChanges, readMode } = useDiff();

  const onClick = useCallback(
    (event) => {
      __onClick?.(event);

      const values = tree.getCheckedNodes().map((node) => node.value);
      onApplyChanges?.(values);
    },
    [__onClick, tree.getCheckedNodes]
  ) satisfies DiffApplyChangesButtonProps['onClick'];

  return (
    !readMode && (
      <Button {...props} onClick={onClick}>
        {label}
      </Button>
    )
  );
};
