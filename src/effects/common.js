import Color from 'color';

export const color = {
  name: 'color',
  id: 1,
  label: 'Color',
  icon: 'svg/color-filter-outline.svg',
  attrs: {
    type: 'color',
    value: '#000000',
  },
  convert: (value) => {
    return parseInt(value.replace(/#/i, ''), 16);
  }
};

export const delay = {
  name: 'delay',
  id: 2,
  label: 'Delay (ms)',
  icon: 'svg/timer-outline.svg',
  attrs: {
    type: 'number',
    min: 16,
    value: 50,
  },
  convert: Number.parseInt,
};

export const repeat = {
  name: 'repeat',
  id: 3,
  label: 'Repeat',
  icon: 'svg/sync-outline.svg',
  attrs: {
    type: 'number',
    min: 1,
    value: 1,
  },
  convert: Number.parseInt,
};

export const length = {
  name: 'length',
  id: 4,
  label: 'Length',
  icon: 'svg/ruler-outline.svg',
  attrs: {
    type: 'number',
    min: 1,
    value: 20,
  },
  convert: Number.parseInt,
};

export const variance = {
  name: 'variance',
  id: 5,
  label: 'Variance',
  icon: 'svg/options-outline.svg',
  attrs: {
    type: 'number',
    min: 1,
    max: 100,
    value: 20,
  },
  convert: Number.parseInt,
};
