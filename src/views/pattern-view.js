import './pattern-view.css';

import App from 'app';
import PatternEditor from 'views/pattern-editor';
import effects from 'effects';
import Sortable from 'sortablejs';

export default class PatternView extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = `
      <div class='header'>
        <div class='button' action='run' color='accent'>RUN PATTERN</div>
        <div class='button' action='add' color='subtle-light'>ADD +</div>
      </div>
      <div class='steps'></div>
    `

    // Create editor
    this.editor =  new PatternEditor();
    this.append(this.editor);

    this.buttons = {
      run: this.querySelector('.button[action=run]'),
      add: this.querySelector('.button[action=add]'),
    }

    this.steps = this.querySelector('.steps');
    Sortable.create(this.steps, {
      fallbackTolerance: 5,
    });
  }

  connectedCallback() {
    this.buttons.add.addEventListener('click', this.openEditor);
    this.buttons.run.addEventListener('click', this.runPattern);
    this.editor.addEventListener('step.add', this.onAddStep);
  }

  disconnectedCallback() {
    this.buttons.add.removeEventListener('click', this.openEditor);
    this.buttons.run.removeEventListener('click', this.runPattern);
    this.editor.removeEventListener('step.add', this.onAddStep);
  }

  onAddStep = (evt) => {
    this.steps.append(evt.detail);
  }

  openEditor = () => {
    this.editor.open();
  }

  runPattern = () => {
    const pattern = [];
    this.steps.childNodes.forEach((step, i) => {
      const info = step.info;

      const effect = {
        id: info.effect.id,
        properties: []
      }

      info.effect.properties.forEach((property, i) => {
        let value = info.properties[property.name];

        if(Array.isArray(value) === false) {
          value = [value];
        }

        value.forEach((value, i) => {
          if(property.convert && typeof property.convert === 'function') {
            value = property.convert(value);
          }

          effect.properties.push({
            id: property.id,
            value: value,
          });
        });
      });

      pattern.push(effect);
    });

    App.services.led.runPattern(1, pattern);
  }

}

customElements.define('pattern-view', PatternView);
