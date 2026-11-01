import { MantineColor, TreeNodeData, UseTreeReturnType } from '@mantine/core';
import { TablerIcon } from '@tabler/icons-react';
import { ReactNode } from 'react';

export type DiffStatus = 'added' | 'removed' | 'modified';

type DiffStatusConfigEntry = {
  label: string;
  color: MantineColor;
  TablerIcon?: TablerIcon;
};

export type DiffStatusConfig = Record<DiffStatus, DiffStatusConfigEntry>;

type DiffConfigEntry = {
  name: string;
  TablerIcon?: TablerIcon;
};

export type DiffConfig = Record<string, DiffConfigEntry>;

type DiffNodeBaseData = {
  type: string;
  name: string;
  status: DiffStatus;
  content?: ReactNode;
};

export type DiffNodeData = DiffNodeBaseData & {
  id: string;
  children?: DiffNodeData[];
};

export type DiffTreeNodeData = Omit<TreeNodeData, 'nodeProps' | 'children'> & {
  nodeProps: DiffNodeBaseData;
  children?: DiffTreeNodeData[];
};

export type DiffBaseProps = {
  /**
   * Record containing the diff types and their display configs
   */
  config: DiffConfig;
  /**
   * Array containing diff nodes
   */
  data: DiffNodeData[];
  /**
   * Optional status' display config
   */
  statusConfig?: DiffStatusConfig;
  /**
   * Optional tree controller instance,
   *  used to adjust the tree behavior from outside the component
   */
  tree?: UseTreeReturnType;
  /**
   * Callback to trigger when the changes are submitted
   * @param values - a list of the approved diff nodes' ids
   */
  onApplyChanges?: (values: string[]) => void;
  /**
   * Callback to trigger on the tree checked state changes
   * @param values - The newly checked state of the tree
   */
  onCheckedChange?: (values: string[]) => void;
};
