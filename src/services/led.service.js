import { Plugins } from '@capacitor/core';
import { BleClient, numberToUUID, numbersToDataView } from '@capacitor-community/bluetooth-le';
import { EventEmitter } from 'events';

export default class LedService extends EventEmitter {

  static LED_SERVICE = "19B10000-E8F2-537E-4F6C-D104768A1214";
  static SWITCH_CHARACTERISTIC = "19B10001-E8F2-537E-4F6C-D104768A1214";

  async scan() {
    try {
      await BleClient.initialize();

      this.device = await BleClient.requestDevice({
        services: [LED_SERVICE],
      });

      await BleClient.connect(device.deviceId, this.onDisconnected.bind(this));
      console.log('connected to device', device);
    } catch (error) {
      console.error(error);
    }
  }

  async toggle() {
    if(this.device) {
      this.toggled = !this.toggled;
      await BleClient.write(device.deviceId, LED_SERVICE, SWITCH_CHARACTERISTIC, numbersToDataView([this.toggled ? 1 : 0]));
       console.log(`written ${this.toggled} to control point`);
    }
  }

  isConnected() {
    return this.device ? true : false;
  }

  onDisconnected() {
    this.device = null;
    this.emit('disconnected');
  }
}
