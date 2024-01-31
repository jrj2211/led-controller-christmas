import * as common from 'effects/common';

export default {
  label: 'Fade',
  id: 3,
  properties: [
    {
      ...common.color,
      multiple: {
        min: 2,
        max: 6,
      },
    },
    {
      ...common.delay,
      label: 'Total Time (ms)',
      attrs: {
        ...common.delay.attrs,
        value: 2000,
      }
    },
    {
      ...common.repeat,
    }
  ]
}
