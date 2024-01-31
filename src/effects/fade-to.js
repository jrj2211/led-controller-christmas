import * as common from 'effects/common';

export default {
  label: 'Fade To',
  id: 4,
  properties: [
    {
      ...common.color,
    },
    {
      ...common.delay,
    },
  ]
}
