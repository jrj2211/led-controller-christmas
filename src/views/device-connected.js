import './device-connected.css';
import LayoutWithHeader from 'views/layout-with-header';


import ColorView from 'views/color-view';
import PatternView from 'views/pattern-view';

export default class DeviceConnected extends HTMLElement {
  constructor(options) {
    super();

    const layout = new LayoutWithHeader();

    this.append(layout);

    this.hue = 0;
    this.saturation = 100;
    this.brightness = 100;

    layout.content.innerHTML = `
      <div class='mode-view'></div>
      <footer></footer>
    `;

    this.footer = this.querySelector('footer');
    this.modeView = this.querySelector('.mode-view');

    for(const name in DeviceConnected.tabs) {
      const item = DeviceConnected.tabs[name];
      const tab = document.createElement('div');
      tab.setAttribute('tab', name);
      tab.innerHTML = `<ion-icon src='${item.icon}'></ion-icon>`;
      this.footer.append(tab);
      item.el = new item.view();
    }

    this.selectTab(DeviceConnected.defaultTab);
  }

  connectedCallback() {
    this.footer.addEventListener('click', (evt) => {
      const tab = evt.target.closest('[tab]');
      this.selectTab(tab.getAttribute('tab'));
    });
  }

  selectTab(name) {
    const tab = this.querySelector(`footer > [tab=${name}]`);
    const item = DeviceConnected.tabs[name];
    this.querySelectorAll('footer > *').forEach((el) => {
      el.classList.remove('active');
    });

    tab.classList.add('active');

    if(this.modeView.firstElementChild !== item.el) {
      this.modeView.innerHTML = '';
      this.modeView.append(item.el);
    }
  }

  static tabs = {
    color: {icon: 'svg/color-filter-outline.svg', view: ColorView},
    pattern: {icon: 'svg/color-filter-outline.svg', view: PatternView},
  }

  static defaultTab = 'color';
}

customElements.define('device-connected', DeviceConnected);
