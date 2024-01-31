import * as common from 'effects/common';

export default {
  label: 'Off',
  id: 0,
  properties: [
    {
      ...common.delay,
      attrs: {
        ...common.delay.attrs,
        value: 1000,
      }
    },
  ]
}
