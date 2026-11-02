import { Box, BoxProps, polymorphic } from '@mantine/core';
import { useDiff } from '../Diff.context';
import React from 'react';

export const DiffCounter = polymorphic<'div', BoxProps>((props: BoxProps) => {
  const { diffNodesCount, tree, readMode } = useDiff();

  const checkedNodesCount = tree.getCheckedNodes().length;

  return (
    !readMode && (
      <Box {...props}>
        {checkedNodesCount}/{diffNodesCount}
      </Box>
    )
  );
});
