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
  /**
   * A prefix text to display before the main label text
   */
  prefix: string;
  /**
   * Flags that controls weather to display the `prefix` text
   */
  hidePrefix?: boolean;
  /**
   * Flags that controls weather to display the a node's `label` text
   */
  hideLabel?: boolean;
  /**
   * An optional tabler icon to display in the node's label
   */
  TablerIcon?: TablerIcon;
};

export type DiffConfig = Record<string, DiffConfigEntry>;

type DiffNodeBaseData = {
  /**
   * The node's type
   */
  type: string;
  /**
   * The main text to display in the node's label
   */
  label: string;
  /**
   * The node's change status
   */
  status: DiffStatus;
  /**
   * An optional content to display inside the expandable area of the node
   */
  content?: ReactNode;
};

export type DiffNodeData = DiffNodeBaseData & {
  /**
   * The ID of the node, used internally as the tree-node's `value`
   */
  id: string;
  /**
   * List of all sub-nodes
   */
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
   * Callback to trigger when the changes are submitted.
   * Called with a list of the submitted values
   */
  onApplyChanges?: (values: string[]) => void;
  /**
   * Callback to trigger on the tree checked state changes.
   * Called with a list of the new checked state
   */
  onCheckedChange?: (values: string[]) => void;
  /**
   * If set to to true, all diff write logics will be be disabled and hidden
   */
  readMode?: boolean;
};
