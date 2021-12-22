import App from 'app';

import ScanResult from 'components/scan-result';
import LayoutWithHeader from 'views/layout-with-header';
import './scanner-view.css';

export default class ScannerView extends HTMLElement {
  constructor() {
    super();

    const layout = new LayoutWithHeader();

    this.append(layout);

    layout.content.innerHTML = `
      <div class='box list'>
        <div class='connection'>
          <div class='spinner'></div>
          <div class='name'></div>
        </div>
        <div class='results'></div>
        <div class='state'></div>
      </div>
    `;

    this.resultsEl = this.querySelector('.results');
    this.stateEl = this.querySelector('.state');
  }

  connectedCallback() {
    this.startScan();

    this.addEventListener('click', async (evt) => {
      const resultView = evt.target.closest('scan-result');

      if(resultView && resultView.device) {
        this.showConnecting(resultView.device.name);
        try {
          await App.services.led.connect(resultView.device, {timeout: 5000});
        } catch(err) {
          this.setState(null);
          this.showError(err);
        }
      }
    });
  }

  async startScan() {
    this.onStartScanning();

    try {
      await App.services.led.scan((result) => {
        this.resultsEl.append(new ScanResult(result));
      }, this.onStopScanning.bind(this));
    } catch(err) {
      // Show error message
      this.showError(err);

      // Reset to non scanning state
      this.onStopScanning();
    }
  }

  showSpinner() {
    this.stateEl.innerHTML = `
      <div class='hr'></div>
      <div class='spinner'></div>
      <div class='text'>Searching for devices...</div>
    `;
  }

  showRefresh() {
    const button = document.createElement('div');
    button.classList.add('button');
    button.setAttribute('color', 'accent');
    button.innerText = 'Refresh';
    button.addEventListener('click', () => {
      this.startScan();
    })

    this.stateEl.innerHTML = '';
    this.stateEl.append(button);
  }

  onStopScanning() {
    // Clear state
    this.setState(null);

    // Show refresh button
    this.showRefresh();
  }

  onStartScanning() {
    // Set the state to scanning
    this.setState('scanning');

    // Show loading spinner
    this.showSpinner();

    // Clear results view
    this.resultsEl.innerHTML = '';
  }

  showError(err) {
    // Remove previous errors
    this.querySelectorAll('.msg').forEach((item, i) => {
      item.remove();
    });

    // Show error message
    const el = document.createElement('div');
    el.classList.add('msg', 'error');
    el.innerText = err.toString();
    this.resultsEl.prepend(el);
  }

  showConnecting(name) {
    // Show spinner and name when connecting
    this.setState('connecting');
    this.querySelector('.connection .name').innerText = name;
  }

  setState(state) {
    if(state) {
      this.setAttribute('state', state);
    } else {
      this.removeAttribute('state');
    }
  }
}

customElements.define('scanner-view', ScannerView);
