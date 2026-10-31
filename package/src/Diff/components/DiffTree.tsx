import { factory, Factory, Tree, TreeProps, useProps } from '@mantine/core';
import { useDiff } from '../Diff.context';
import React, { useMemo } from 'react';
import { DiffNodeData, DiffBaseProps, DiffTreeNodeData } from '../Diff.types';
import classes from './DiffTree.module.css';
import { DiffTreeNode } from './DiffTree.Node';

const processData = (data: DiffBaseProps['data']): DiffTreeNodeData[] => {
  const convertNode = (node: DiffNodeData): DiffTreeNodeData => ({
    label: undefined,
    value: node.id,
    nodeProps: {
      type: node.type,
      name: node.name,
      status: node.status,
      content: node.content,
    },
    children: node.children ? node.children.map(convertNode) : undefined,
  });

  return data.map(convertNode);
};

export type DiffTreeProps = Omit<TreeProps, 'data' | 'renderNode'>;

export type DiffTreeFactory = Factory<{ props: DiffTreeProps; stylesNames: Tree.StylesNames }>;

const defaultProps = {
  withLines: true,
  expandOnClick: false,
  classNames: classes,
} satisfies Partial<DiffTreeProps>;

export const DiffTree = factory<DiffTreeFactory>((__props) => {
  const props = useProps('DiffTree', defaultProps, __props);
  const { data } = useDiff();

  const processedData = useMemo(() => processData(data), [data]);

  return <Tree data={processedData} renderNode={DiffTreeNode} {...props} />;
});

DiffTree.displayName = 'DiffTree';
DiffTree.classes = classes;
