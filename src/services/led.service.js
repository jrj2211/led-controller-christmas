import { Plugins } from '@capacitor/core';
import { BleClient, numberToUUID, numbersToDataView } from '@capacitor-community/bluetooth-le';
import { EventEmitter } from 'events';

export default class LedService extends EventEmitter {

  static LED_SERVICE = "19B10000-E8F2-537E-4F6C-D104768A1214";
  static EFFECT_CHARACTERISTIC = "19B10001-E8F2-537E-4F6C-D104768A1214";

  async scan(resultCallback, stopCallback) {

    await BleClient.initialize();

    await BleClient.requestLEScan(
      {
        services: [LedService.LED_SERVICE],
      },
      resultCallback
    );

    this.scanTimeout = setTimeout(async () => {
      await BleClient.stopLEScan();
      stopCallback();
    }, 5000);
  }

  async setEffect(strip, effect, speed, hue, saturation, brightness, repeat, flags) {
    if(this.device) {
      var buffer = new ArrayBuffer(10);
      const dataView = new DataView(buffer);

      dataView.setUint8(0, strip, true);
      dataView.setUint8(1, effect, true);
      dataView.setUint16(2, speed, true);
      dataView.setUint16(4, hue, true);
      dataView.setUint8(6, saturation, true);
      dataView.setUint8(7, brightness, true);
      dataView.setUint8(8, repeat, true);
      dataView.setUint8(9, flags, true);

      await BleClient.write(this.device.deviceId, LedService.LED_SERVICE, LedService.EFFECT_CHARACTERISTIC, dataView);
    }
  }

  async connect(device, options) {
    clearTimeout(this.scanTimeout);
    await BleClient.disconnect(device.deviceId);
    await BleClient.connect(device.deviceId, this.onDisconnect.bind(this, device), options);
    this.device = device;
    this.emit('connected', device);
  }

  isConnected() {
    return this.device ? true : false;
  }

  onDisconnect(device) {
    if(this.device) {
      this.device = null;
      this.emit('disconnected', device);
    }
  }

  bufferToHex(buffer) {
    return [...new Uint8Array (buffer)]
        .map (b => b.toString (16).padStart (2, "0"))
        .join ("");
  }
}

LedService.EFFECT = {
  OFF: 0,
  SOLID_COLOR: 1,
}
