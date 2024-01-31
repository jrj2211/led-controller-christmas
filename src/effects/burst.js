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
        initial: 3,
      },
      attrs: {
        ...common.color.attrs,
        value: [
          '#003CC6',
          '#6400CC',
          '#7A0069',
        ]
      }
    },
    {
      ...common.delay,
      attrs: {
        ...common.delay.attrs,
        value: 75,
      }
    },
    {
      ...common.repeat,
    },
    {
      ...common.length,
      label: 'Width',
      attrs: {
        min: 1,
        value: 1,
      }
    },
  ]
}
