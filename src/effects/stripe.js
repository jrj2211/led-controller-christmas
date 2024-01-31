import * as common from 'effects/common';

export default {
  label: 'Stripe',
  id: 7,
  properties: [
    {
      ...common.color,
      multiple: {
        min: 2,
        max: 4,
      },
      attrs: {
        ...common.color.attrs,
        value: [
          "#C50000",
          "#606060",
        ],
      }
    },
    {
      ...common.delay,
    },

    {
      ...common.repeat,
    },
    {
      ...common.length,
      label: 'Width',
      attrs: {
        ...common.length.attrs,
        min: 1,
        value: 3,
      }
    },
  ]
}
