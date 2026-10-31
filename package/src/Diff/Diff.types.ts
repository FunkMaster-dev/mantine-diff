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
  config: DiffConfig;
  data: DiffNodeData[];
  statusConfig?: DiffStatusConfig;
  tree?: UseTreeReturnType;
  onApplyChanges?: (values: string[]) => void;
  onCheckedChange?: (values: string[]) => void;
};
