import './signal-strength.css';
export default class SignalStrength extends HTMLElement {
  constructor(rssi) {
    super();

    this.colors = [
      '#676767',
      '#DB3737',
      '#DB7937',
      '#DBC037',
      '#37DB6E',
    ];

    this.innerHTML = `
      <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve">
        <rect class='bar-1' x="1" y="25" class="st0" width="6" height="5"/>
        <rect class='bar-2' x="9" y="18" class="st0" width="6" height="12"/>
        <rect class='bar-3' x="17" y="10" class="st0" width="6" height="20"/>
        <rect class='bar-4' x="25" y="2" class="st0" width="6" height="28"/>
      </svg>
    `;

    if(rssi < -80) {
      this.setLevel(1);
    } else if(rssi < -70) {
      this.setLevel(2);
    } else if(rssi < -60) {
      this.setLevel(3);
    } else {
      this.setLevel(4);
    }
  }

  setLevel(level) {
    const bars = [
      this.querySelector('.bar-1'),
      this.querySelector('.bar-2'),
      this.querySelector('.bar-3'),
      this.querySelector('.bar-4'),
    ];

    bars.forEach((bar, i) => {
      if(i < level) {
        bar.setAttribute('fill', this.colors[level]);
      } else {
        bar.setAttribute('fill', this.colors[0]);
      }
    });
  }
}

customElements.define('signal-strength', SignalStrength);
