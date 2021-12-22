import Color from 'color';

export default {
  label: 'Fade',
  properties: [
    {
      name: 'color',
      label: 'Color',
      icon: 'svg/color-filter-outline.svg',
      attrs: {
        type: 'color',
        value: '#000000',
      },
      multiple: {
        min: 2,
        max: 6,
      }
    },
    {
      name: 'repeat',
      label: 'Repeat',
      icon: 'svg/sync-outline.svg',
      attrs: {
        type: 'number',
        min: 1,
        max: 1000,
        value: 1,
      },
      convert: Number.parseInt,
    },
    {
      name: 'delay',
      label: 'Delay (ms)',
      icon: 'svg/timer-outline.svg',
      attrs: {
        type: 'number',
        min: 1,
        max: 1000,
        value: 50,
      },
      convert: Number.parseInt,
    }
  ]
}
