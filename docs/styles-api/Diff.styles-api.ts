import type { DiffFactory } from '@funkmaster/mantine-diff';
import type { StylesApiData } from '../components/styles-api.types';

export const DiffStylesApi: StylesApiData<DiffFactory> = {
  selectors: {
    root: 'Root element',
    label: 'Root label element',
    labelChevron: "Label's expand icon",
    labelContent: "Label's expandable content",
    labelIcon: "Label's icon",
    labelStatus: "Label's status element",
    labelStatusIcon: "Label's status icon element",
    labelText: 'Label focused text',
    labelTextPrefix: 'Label prefix title',
    node: 'Root node element',
    nodeCheckbox: "Node's checkbox element",
  },

  vars: {},

  modifiers: [],
};
