import { Box, BoxProps, polymorphic } from '@mantine/core';
import { useDiff } from '../Diff.context';
import React from 'react';

export const DiffCounter = polymorphic<'div', BoxProps>((props: BoxProps) => {
  const { diffNodesCount, tree } = useDiff();

  const checkedNodesCount = tree.getCheckedNodes().length;

  return (
    <Box {...props}>
      {checkedNodesCount}/{diffNodesCount}
    </Box>
  );
});
