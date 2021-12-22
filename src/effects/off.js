export default {
  label: 'Off',
  properties: [
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
