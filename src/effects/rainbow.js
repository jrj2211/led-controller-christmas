import * as common from 'effects/common';

export default {
  label: 'Rainbow',
  id: 11,
  properties: [
    {
      ...common.delay,
    },
    {
      ...common.repeat,
    },
  ]
}
