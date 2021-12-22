import Color from 'color';

export default {
  label: 'Solid Color',
  properties: [
    {
      name: 'color',
      label: 'Color',
      icon: 'svg/color-filter-outline.svg',
      attrs: {
        type: 'color',
        value: '#000000',
      },
      expand: true,
      multiple: {
        min: 1,
        max: 6,
      }
    },
    {
      name: 'delay',
      label: 'Delay (ms)',
      icon: 'svg/timer-outline.svg',
      attrs: {
        type: 'number',
        min: 1,
        max: 100000,
        value: 1000,
      },
      convert: Number.parseInt,
    }
  ]
}
