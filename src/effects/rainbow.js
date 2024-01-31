import * as common from 'effects/common';

export default {
  label: 'Rainbow',
  id: 11,
  properties: [
    {
      ...common.delay,
      attrs: {
        ...common.delay.attrs,
        value: 3000,
      },
    },
    {
      ...common.repeat,
    },
  ]
}
