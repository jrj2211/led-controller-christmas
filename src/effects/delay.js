import * as common from 'effects/common';

export default {
  label: 'Delay',
  id: 1,
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
