import * as common from 'effects/common';

export default {
  label: 'Split',
  id: 10,
  properties: [
    {
      ...common.color,
      multiple: {
        min: 2,
        max: 2,
      },
    },
    {
      ...common.delay,
    },
    {
      ...common.repeat,
    },
  ]
}
