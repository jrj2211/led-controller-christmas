import * as common from 'effects/common';

export default {
  label: 'Burst',
  id: 8,
  properties: [
    {
      ...common.color,
      multiple: {
        min: 1,
        max: 5,
      },
    },
    {
      ...common.delay,
    },
    {
      ...common.repeat,
    },
    {
      ...common.length,
      label: 'Width',
      attrs: {
        min: 1,
        value: 2,
      }
    },
  ]
}
