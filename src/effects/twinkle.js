import * as common from 'effects/common';

export default {
  label: 'Twinkle',
  id: 9,
  properties: [
    {
      ...common.color,
      attrs: {
        ...common.color.attrs,
        value: '#726932',
      }
    },
    {
      ...common.delay,
      attrs: {
        ...common.delay.attrs,
        value: 500,
      }
    },
    {
      ...common.repeat,
      attrs: {
        ...common.delay.repeat,
        value: 10
      }
    },
    {
      ...common.variance,
      attrs: {
        ...common.delay.variance,
        value: 100,
      }
    },
  ]
}
