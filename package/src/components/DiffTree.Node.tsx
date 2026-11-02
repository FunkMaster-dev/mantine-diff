import {
  TreeProps,
  Group,
  Stack,
  Badge,
  Collapse,
  Box,
  Checkbox,
  Text,
  ActionIcon,
} from '@mantine/core';
import { IconChevronDown, IconChevronRight } from '@tabler/icons-react';
import clsx from 'clsx';
import { toMerged } from 'es-toolkit/object';
import React, { useCallback, useMemo } from 'react';
import { useDiff, useDiffConfigEntry, useDiffStatusConfigEntry } from '../Diff.context';
import { DiffStatus, DiffTreeNodeData } from '../Diff.types';

const DiffStatusBadge = ({ status }: { status: DiffStatus }) => {
  const { label, color, TablerIcon } = useDiffStatusConfigEntry(status);
  const { getStyles } = useDiff();

  return (
    <Badge
      variant="light"
      color={color}
      rightSection={TablerIcon ? <TablerIcon {...getStyles('labelStatusIcon')} /> : undefined}
      {...getStyles('labelStatus')}
    >
      {label}
    </Badge>
  );
};

export const DiffTreeNode: NonNullable<TreeProps['renderNode']> = (props) => {
  const node = props.node as DiffTreeNodeData;
  const { getStyles } = useDiff();
  const { name: prefix, TablerIcon: IconLabel } = useDiffConfigEntry(node.nodeProps.type);
  const hasContent = !!node.nodeProps.content;
  const isExpandable = props.hasChildren || hasContent;

  const { isChecked, isIndeterminate } = useMemo(() => {
    const nodeStatus = props.tree
      .getCheckedNodes()
      .find((currNode) => currNode.value === node.value);

    return {
      isChecked: nodeStatus?.checked ?? false,
      isIndeterminate: nodeStatus?.indeterminate ?? false,
    };
  }, [props.tree.getCheckedNodes, node.value]);

  const toggleExpanded = useCallback(
    () => props.tree.toggleExpanded(node.value),
    [props.tree.toggleExpanded, node.value]
  );

  const toggleChecked = useCallback(
    () =>
      !isChecked || isIndeterminate
        ? props.tree.checkNode(node.value)
        : props.tree.uncheckNode(node.value),
    [isChecked, isIndeterminate, props.tree.checkNode, props.tree.uncheckNode, node.value]
  );

  const nodeStyles = getStyles('node');
  const className = clsx(nodeStyles.className, props.elementProps.className);
  const style = toMerged(nodeStyles.style, props.elementProps.style);

  const IconChevron = props.expanded ? IconChevronDown : IconChevronRight;

  return (
    <Group
      {...props.elementProps}
      className={className}
      style={style}
      data-testid={`diff-tree-node__${node.value}`}
    >
      <Stack {...getStyles('label')}>
        <Group>
          {isExpandable && (
            <ActionIcon
              onClick={toggleExpanded}
              variant="transparent"
              {...getStyles('labelChevron')}
            >
              <IconChevron />
            </ActionIcon>
          )}
          {IconLabel && <IconLabel {...getStyles('labelIcon')} />}
          <Text fw={500} {...getStyles('labelTextPrefix')}>
            {prefix}
          </Text>
          <Text fw={700} {...getStyles('labelText')}>
            "{node.nodeProps.name}"
          </Text>
          <DiffStatusBadge status={node.nodeProps.status} />
        </Group>
        {hasContent && (
          <Collapse transitionDuration={0} expanded={props.expanded}>
            <Box pis="calc(var(--mantine-spacing-lg) * 2)" {...getStyles('labelContent')}>
              {node.nodeProps.content}
            </Box>
          </Collapse>
        )}
      </Stack>
      <Checkbox
        variant="outline"
        checked={isChecked}
        indeterminate={isIndeterminate}
        onClick={toggleChecked}
        {...getStyles('nodeCheckbox')}
      />
    </Group>
  );
};
