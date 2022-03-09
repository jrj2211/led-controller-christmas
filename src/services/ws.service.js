// ES modules
import { io } from "socket.io-client";
import EventEmitter from 'events';

export default class WsService extends EventEmitter {
  constructor() {
    super();

    this.socket = io("http://localhost:3000/controller", {
      autoConnect: false
    });

    this.socket.emit('color', 0x303030);

    this.socket.on('connect', () => {
      this.emit('connected');
    })

    this.socket.on('disconnect', () => {
      this.emit('disconnected');
    });
  }

  connect() {
    this.socket.connect();
  }

  async setColor(strip, hue, saturation, brightness) {
    console.log('COLOR:', strip, hue, saturation, brightness);
    this.socket.emit('color', {strip, hue, saturation, brightness});
  }

  async runPattern(strip, info) {
    console.log('PATTERN:', strip, info);
    this.socket.emit('pattern.save', {strip, info});
  }

  async startPattern(strip) {
    console.log('START:', strip);
    this.socket.emit('pattern.start', {strip});
  }

  isConnected() {
    return this.socket.connected;
  }
}

