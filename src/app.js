import LedService from 'services/led.service';

// Setup IonIcons SVG Library
import { defineCustomElements } from 'ionicons/dist/loader';
defineCustomElements(window, { resourcesUrl: 'svg/ionicons/' });

const led = new LedService();

export default {
  services: {
    led
  }
}
