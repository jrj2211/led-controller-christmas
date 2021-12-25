import * as common from 'effects/common';

export default {
  label: 'Solid Color',
  id: 2,
  properties: [
    {
      ...common.color,
      multiple: {
        min: 1,
        max: 6,
      },
    },
    {
      ...common.delay,
    },
    {
      ...common.repeat,
    }
  ]
}
