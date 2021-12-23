import { Plugins } from '@capacitor/core';
import { BleClient, numberToUUID, numbersToDataView } from '@capacitor-community/bluetooth-le';
import { EventEmitter } from 'events';

export default class LedService extends EventEmitter {

  static LED_SERVICE = "19B10000-E8F2-537E-4F6C-D104768A1214";
  static COLOR_CHARACTERISTIC = "19B10001-E8F2-537E-4F6C-D104768A1214";
  static PATTERN_UPLOAD_CHARACTERISTIC = "19B10002-E8F2-537E-4F6C-D104768A1214";
  static EFFECT_CHARACTERISTIC = "19B10003-E8F2-537E-4F6C-D104768A1214";
  static EFFECT_PROPERTY_CHARACTERISTIC = "19B10004-E8F2-537E-4F6C-D104768A1214";
  static PATTERN_COMPLETE_CHARACTERISTIC = "19B10005-E8F2-537E-4F6C-D104768A1214";

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

  async setColor(strip, hue, saturation, brightness) {
    if(this.device) {
      var buffer = new ArrayBuffer(5);
      const dataView = new DataView(buffer);

      dataView.setUint8(0, strip, true);
      dataView.setUint16(1, hue, true);
      dataView.setUint8(3, saturation, true);
      dataView.setUint8(4, brightness, true);

      await BleClient.write(this.device.deviceId, LedService.LED_SERVICE, LedService.COLOR_CHARACTERISTIC, dataView);
    }
  }

  async runPattern(strip, info) {
    await this.startPattern(strip);
    console.log('Start pattern');

    for(let effect of info) {
      await this.sendEffect(effect.id);
      console.log('Effect: ', effect.id);

      for(const property of effect.properties) {
        await this.sendProperty(property.id, property.value);
        console.log('Effect: ', property.id, property.value);
      }
    }

    console.log('end pattern')
    await this.endPattern();
  }

  async startPattern(strip) {
    var buffer = new ArrayBuffer(1);
    const dataView = new DataView(buffer);
    dataView.setUint8(0, strip, true);
    await BleClient.write(this.device.deviceId, LedService.LED_SERVICE, LedService.PATTERN_UPLOAD_CHARACTERISTIC, dataView);
  }

  async sendEffect(id) {
    var buffer = new ArrayBuffer(1);
    const dataView = new DataView(buffer);
    dataView.setUint8(0, id, true);
    await BleClient.write(this.device.deviceId, LedService.LED_SERVICE, LedService.EFFECT_CHARACTERISTIC, dataView);
  }

  async sendProperty(id, value) {
    var buffer = new ArrayBuffer(5);
    const dataView = new DataView(buffer);
    dataView.setUint8(0, id, true);
    dataView.setUint32(0, value, true);
    await BleClient.write(this.device.deviceId, LedService.LED_SERVICE, LedService.EFFECT_PROPERTY_CHARACTERISTIC, dataView);
  }

  async endPattern() {
    var buffer = new ArrayBuffer(1);
    const dataView = new DataView(buffer);
    dataView.setUint8(0, 1, true);
    await BleClient.write(this.device.deviceId, LedService.LED_SERVICE, LedService.PATTERN_COMPLETE_CHARACTERISTIC, dataView);
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
