import * as common from 'effects/common';

export default {
  label: 'Twinkle',
  id: 9,
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
      ...common.variance,
    },
  ]
}
