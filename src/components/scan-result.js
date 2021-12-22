import './scan-result.css';
import SignalStrength from 'components/signal-strength';

export default class ScanResult extends HTMLElement {
  constructor(result) {
    super();

    this.device = result.device;

    this.innerHTML = `
      <div class='name'>
        ${this.device.name}
      </div>
      <div class='rssi'>
        ${result.rssi}db
      </div>
    `;

    this.append(new SignalStrength(result.rssi));
  }
}

customElements.define('scan-result', ScanResult);
