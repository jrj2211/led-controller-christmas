import * as common from 'effects/common';

export default {
  label: 'Trail',
  id: 6,
  properties: [
    {
      ...common.color,
      attrs: {
        ...common.color.attrs,
        value: '#0000FF',
      }
    },
    {
      ...common.delay,
      attrs: {
        ...common.delay.attrs,
        value: 60,
      }
    },
    {
      ...common.repeat,
    },
    {
      ...common.length,
      attrs: {
        ...common.length.attrs,
        value: 10,
      }
    },
  ]
}
