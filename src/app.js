import WsService from 'services/ws.service';

// Setup IonIcons SVG Library
import { defineCustomElements } from 'ionicons/dist/loader';
defineCustomElements(window, { resourcesUrl: 'svg/ionicons/' });

const led = new WsService();

export default {
  services: {
    led,
  }
}
