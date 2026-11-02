import { createSafeContext, GetStylesApi } from '@mantine/core';
import { DiffBaseProps, DiffStatus } from './Diff.types';
import type { DiffFactory } from './Diff';

type MakeRequired<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};

type DiffContextValue = MakeRequired<DiffBaseProps, 'statusConfig' | 'tree' | 'readMode'> & {
  getStyles: GetStylesApi<DiffFactory>;
  diffNodesCount: number;
};

export const [DiffProvider, useDiff] = createSafeContext<DiffContextValue>(
  'Missing `DiffProvider` in the tree.'
);

export type UseDiffReturnType = ReturnType<typeof useDiff>;

export const useDiffConfigEntry = (type: string) => {
  const entry = useDiff().config[type];

  if (!entry) {
    throw new Error(`Type \`${type}\` is missing in the diff config.`);
  }

  return entry;
};

export const useDiffStatusConfigEntry = (status: DiffStatus) => {
  const entry = useDiff().statusConfig[status];

  if (!entry) {
    throw new Error(`Status \`${status}\` is invalid.`);
  }

  return entry;
};
