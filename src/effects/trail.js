import * as common from 'effects/common';

export default {
  label: 'Trail',
  id: 6,
  properties: [
    {
      ...common.color,
    },
    {
      ...common.delay,
    },
    {
      ...common.repeat,
    },
    {
      ...common.length,
      attrs: {
        ...common.length.attrs,
        initial: 4,
      }
    },
  ]
}
