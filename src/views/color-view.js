import App from 'app';
import Color from 'color';
import LedService from 'services/led.service';

import './color-view.css';

export default class ColorView extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = `
      <div class='color-wheel'>
        <div class='selected'></div>
      </div>

      <div class='input_label'>
        BRIGHTNESS
      </div>
      <div class='input_row'>
        <ion-icon src='svg/brightness_down.svg'></ion-icon>
        <input type='range' step=1 min=0 max=100 />
        <ion-icon src='svg/brightness_up.svg'></ion-icon>
      </div>
    `;

    this.colorWheel = this.querySelector('.color-wheel');
    this.selected = this.colorWheel.querySelector('.selected');
    this.brightnessInput = this.querySelector('input[type=range]');
  }

  connectedCallback() {
    this.updateColor();

    this.brightnessInput.addEventListener('input', () => {
      this.brightness = Number.parseFloat(this.brightnessInput.value) / 100;
      this.update();
    });

    this.colorWheel.addEventListener('touchmove', (evt) => {
      const touch = evt.touches[0];

      const rect = this.colorWheel.getBoundingClientRect();
      const width = rect.right - rect.left;
      const height = rect.bottom - rect.top;
      const centerX = rect.left + (width / 2);
      const centerY = rect.top + (height / 2);

      const x = touch.clientX - centerX
      const y = touch.clientY - centerY;

      const distance = Math.sqrt(x ** 2 + y ** 2);
      const angle = Math.atan2(y, x) + Math.PI;

      let saturation = (Math.abs(distance / ((width - 50) / 2)) - .5) * 2;
      saturation = this.clamp(saturation, 0, 1);

      this.saturation = saturation;
      this.hue = this.radToDeg(angle);

      this.update();
    }, {passive: true});
  }

  updateColor() {
    const color = Color.hsv([this.hue, this.saturation * 100, this.brightness * 100]);
    const colorBright = Color.hsv([this.hue, this.saturation * 100, 100]);
    this.brightnessInput.style.setProperty('--color-bright', colorBright.hex());
    this.brightnessInput.style.setProperty('--color', color.hex());
    this.selected.style.background = color.hex();
  }

  update() {
    this.updateColor();

    if(this.debounce !== true) {
      this.debounce = true;
      setTimeout(() => {
        this.debounce = false;
        App.services.led.setEffect(1, LedService.EFFECT.SOLID_COLOR, 0, this.hue16, this.saturation255, this.brightness255);
      }, 50);
    }
  }

  get hue16() {
    return Math.round((this.hue / 360) * 65535);
  }

  get brightness255() {
    return Math.round(this.brightness * 255);
  }

  get saturation255() {
    return Math.round(this.saturation * 255);
  }

  degToRad(degrees)
  {
    return degrees * (Math.PI / 180);
  }

  radToDeg(radians)
  {
    return radians * (180 / Math.PI);
  }

  scale (number, inMin, inMax, outMin, outMax) {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
  }

  clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
  }

  randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  randomHexColor() {
    return Math.floor(Math.random()*16777215).toString(16)
  }
}

customElements.define('color-view', ColorView);
