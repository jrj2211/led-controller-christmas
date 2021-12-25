import * as common from 'effects/common';

export default {
  label: 'Wipe',
  id: 5,
  properties: [
    {
      ...common.color,
    },
    {
      ...common.delay,
    },
  ]
}
