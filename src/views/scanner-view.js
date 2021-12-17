import App from 'app';

export default class ScannerView extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = 'Scanner View';
  }
}

customElements.define('scanner-view', ScannerView);
