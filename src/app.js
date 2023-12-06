import BleService from "services/ble.service";

// Setup IonIcons SVG Library
import { defineCustomElements } from "ionicons/dist/loader";
defineCustomElements(window, { resourcesUrl: "svg/ionicons/" });

const led = new BleService();

export default {
  services: {
    led,
  },
};
