import "css/app.css";

import "@fontsource/roboto";

import App from "app";
import Router from "router";
import ServerDownView from "views/server-down-view";
import ScannerView from "views/scanner-view.js";
import DeviceConnected from "views/device-connected";

const router = new Router({
  path: "",
  action: () => {
    if (App.services.led.isConnected() === false) {
      return new ScannerView();
    }
    return new DeviceConnected();
  },
});

App.services.led.on("connected", () => {
  router.render();
});

App.services.led.on("disconnected", () => {
  router.render();
});

App.services.led.connect();
