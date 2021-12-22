import App from 'app';
import './layout-with-header.css';
export default class LayoutWithHeader extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = `
      <header>
        <img src='svg/logo.svg' />
      </header>
      <content></content>
    `;

    this.content = this.querySelector('content');
  }
}

customElements.define('layout-with-header', LayoutWithHeader);
