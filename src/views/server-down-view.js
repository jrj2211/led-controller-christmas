import './server-down-view.css';

export default class ServerDownView extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
      <div class='container'>
        <ion-icon src="svg/thumbs-down-outline.svg"></ion-icon>
        <h1>CONNECTION ERROR</h1>
        <div>Cannot connect to ZyPhox service</div>
      </div>
    `;
  }
}

window.customElements.define('server-down-view', ServerDownView);