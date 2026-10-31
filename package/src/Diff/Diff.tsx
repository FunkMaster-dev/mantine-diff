import {
  Box,
  BoxProps,
  createVarsResolver,
  ElementProps,
  polymorphicFactory,
  PolymorphicFactory,
  StylesApiProps,
  useProps,
  useStyles,
  useTree,
} from '@mantine/core';
import { DiffProvider } from './Diff.context';
import { DiffBaseProps, DiffNodeData } from './Diff.types';
import { DiffTree } from './components/DiffTree';
import { IconCircleAsterisk, IconCircleMinus, IconCirclePlus } from '@tabler/icons-react';
import React, { useMemo } from 'react';
import classes from './Diff.module.css';
import { sum } from 'es-toolkit';
import { DiffCounter } from './components/DiffCounter';
import { DiffApproveAllCheckbox } from './components/DiffApproveAllCheckbox';
import { DiffApplyChangesButton } from './components/DiffApplyChangesButton';

export type DiffStylesNames =
  | 'root'
  | 'node'
  | 'nodeCheckbox'
  | 'label'
  | 'labelStatus'
  | 'labelStatusIcon';

export type DiffCssVariables = {};

export type DiffProps = BoxProps &
  StylesApiProps<DiffFactory> &
  DiffBaseProps &
  ElementProps<'div'>;

export type DiffFactory = PolymorphicFactory<{
  props: DiffProps;
  defaultComponent: 'div';
  defaultRef: HTMLDivElement;
  stylesNames: DiffStylesNames;
  vars: DiffCssVariables;
  staticComponents: {
    Tree: typeof DiffTree;
    Counter: typeof DiffCounter;
    ApproveAllCheckbox: typeof DiffApproveAllCheckbox;
    ApplyChangesButton: typeof DiffApplyChangesButton;
  };
}>;

const defaultProps = {
  statusConfig: {
    added: {
      label: 'Added',
      color: 'green',
      TablerIcon: IconCirclePlus,
    },
    modified: {
      label: 'Modified',
      color: 'yellow',
      TablerIcon: IconCircleAsterisk,
    },
    removed: {
      label: 'Removed',
      color: 'red',
      TablerIcon: IconCircleMinus,
    },
  },
} satisfies Partial<DiffProps>;

const varsResolver = createVarsResolver<DiffFactory>(() => ({
  root: {},
}));

export const Diff = polymorphicFactory<DiffFactory>((__props) => {
  const props = useProps('Diff', defaultProps, __props);
  const {
    config,
    data,
    statusConfig,
    tree,
    onApplyChanges,
    onCheckedChange,
    children,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    ...others
  } = props;

  const getStyles = useStyles<DiffFactory>({
    name: 'Diff',
    classes,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver,
  });

  const __tree = useTree();

  const diffNodesCount = useMemo(() => getDiffNodesCount(data), [data]);

  return (
    <Box {...getStyles('root')} {...others}>
      <DiffProvider
        value={{
          config,
          data,
          statusConfig,
          onApplyChanges,
          onCheckedChange,
          getStyles,
          tree: tree ?? __tree,
          diffNodesCount,
        }}
      >
        {children}
      </DiffProvider>
    </Box>
  );
});

const getDiffNodesCount = (data: DiffNodeData[]): number => {
  const countNodes = (node: DiffNodeData): number => {
    return 1 + (node.children ? sum(node.children.map(countNodes)) : 0);
  };

  return sum(data.map(countNodes));
};

Diff.displayName = 'Diff';
Diff.classes = classes;
Diff.Tree = DiffTree;
Diff.Counter = DiffCounter;
Diff.ApproveAllCheckbox = DiffApproveAllCheckbox;
Diff.ApplyChangesButton = DiffApplyChangesButton;
// Diff.Controls