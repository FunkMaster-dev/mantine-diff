import type { DiffFactory } from '@funkmaster/mantine-diff';
import type { StylesApiData } from '../components/styles-api.types';

export const DiffStylesApi: StylesApiData<DiffFactory> = {
  selectors: {
    root: 'Root element',
    node: 'Root node element',
    nodeCheckbox: "Node's checkbox element",
    label: 'Root label element',
    labelStatus: "Label's status element",
    labelStatusIcon: "Label's status icon element",
  },

  vars: {},

  modifiers: [],
};
