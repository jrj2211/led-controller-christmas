import 'css/app.css';

import "@fontsource/roboto";

import App from 'app';
import Router from 'router';
import ScannerView from 'views/scanner-view';
import DeviceConnected from 'views/device-connected';

const router = new Router({
  path: '',
  action: () => {
    if(App.services.led.isConnected() === false) {
      //return new ScannerView();
    }
    return new DeviceConnected();
  },
});

App.services.led.on('disconnected', () => {
  router.render();
});

App.services.led.on('connected', () => {
  router.render();
});
