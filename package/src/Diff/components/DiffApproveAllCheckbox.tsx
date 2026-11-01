import { Checkbox, CheckboxProps } from '@mantine/core';
import React, { useCallback } from 'react';
import { useDiff } from '../Diff.context';

export const DiffApproveAllCheckbox = ({
  label = 'Approve all changes',
  onClick,
  ...props
}: Omit<CheckboxProps, 'checked'>) => {
  const { diffNodesCount, tree } = useDiff();

  const isChecked = diffNodesCount === tree.getCheckedNodes().length;

  const toggleAll = useCallback(
    (event) => {
      onClick?.(event);

      !isChecked ? tree.checkAllNodes() : tree.uncheckAllNodes();
    },
    [isChecked, tree.checkAllNodes, tree.uncheckAllNodes, onClick]
  ) satisfies CheckboxProps['onClick'];

  return <Checkbox {...props} label={label} onClick={toggleAll} checked={isChecked} />;
};
