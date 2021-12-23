import * as common from 'effects/common';

export default {
  label: 'Fade',
  id: 3,
  properties: [
    {
      ...common.color,
      multiple: {
        min: 2,
        max: 6,
      }
    },
    {
      ...common.delay
    },
    {
      ...common.repeat
    }
  ]
}
