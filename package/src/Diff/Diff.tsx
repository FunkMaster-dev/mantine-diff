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
} from '@mantine/core';
import { DiffProvider } from './Diff.context';
import { DiffBaseProps } from './Diff.types';
import { DiffTree } from './components/DiffTree';
import { IconCircleAsterisk, IconCircleMinus, IconCirclePlus } from '@tabler/icons-react';
import React from 'react';
import classes from './Diff.module.css';

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

  return (
    <Box {...getStyles('root')} {...others}>
      <DiffProvider value={{ config, data, statusConfig, getStyles }}>{children}</DiffProvider>
    </Box>
  );
});

Diff.displayName = 'Diff';
Diff.classes = classes;
Diff.Tree = DiffTree;
// Diff.Controls
// Diff.Counter
// Diff.CheckAllButton
// Diff.ApproveButton
