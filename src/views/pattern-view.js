import './pattern-view.css';
import { Storage } from '@capacitor/storage';

import App from 'app';
import PatternEditor from 'views/pattern-editor';
import effects from 'effects';
import Sortable from 'sortablejs';

import defaultPattern from 'patterns/default.json';

export default class PatternView extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = `
      <div class='header'>
        <div class='button' action='run' color='accent'>RUN PATTERN</div>
        <div class='button' action='add' color='subtle-light'>ADD +</div>
      </div>
      <div class='steps'></div>
      <div class='reset'>
        <div class='hint'>
          <b>No effects added to pattern</b>
          <br>
          Click "Add +" to begin
        </div>
        <div class='button load-default' action='restore' color='subtle-light'><ion-icon src='svg/sync-outline.svg'></ion-icon> Restore Defaults</div>
    `

    // Create editor
    this.editor =  new PatternEditor();
    this.append(this.editor);

    this.buttons = {
      run: this.querySelector('.button[action=run]'),
      add: this.querySelector('.button[action=add]'),
      restore: this.querySelector('.button[action=restore]'),
    }

    this.steps = this.querySelector('.steps');
    Sortable.create(this.steps, {
      fallbackTolerance: 5,
    });

    this.classList.add('loading');

    Storage.get({key: 'pattern'}).then((pattern) => {
      pattern = JSON.parse(pattern.value);

      pattern.forEach((info, i) => {
        const step = this.editor.createStep(info);
        this.steps.append(step);
      });

      this.classList.remove('loading');
    });
  }

  async connectedCallback() {
    this.buttons.add.addEventListener('click', this.openEditor);
    this.buttons.run.addEventListener('click', this.runPattern);
    this.editor.addEventListener('step.add', this.onAddStep);

    this.buttons.restore.addEventListener('click', this.restorePattern);
  }

  disconnectedCallback() {
    this.buttons.add.removeEventListener('click', this.openEditor);
    this.buttons.run.removeEventListener('click', this.runPattern);
    this.buttons.restore.removeEventListener('click', this.restorePattern);
    this.editor.removeEventListener('step.add', this.onAddStep);
  }

  onAddStep = (evt) => {
    this.steps.append(evt.detail);
  }

  openEditor = () => {
    this.editor.open();
  }

  restorePattern = async () => {
    defaultPattern.forEach((info, i) => {
      const step = this.editor.createStep(info);
      this.steps.append(step);
    });
  }

  runPattern = async () => {
    const pattern = [];
    const patternJSON = [];
    this.steps.childNodes.forEach((step, i) => {
      const info = step.info;
      delete info.effect;
      const effect = PatternEditor.effects[info.name];

      if(effect) {
        patternJSON.push(info);

        const payload = {
          id: effect.id,
          properties: []
        }

        effect.properties.forEach((property, i) => {
          let value = info.properties[property.name];

          if(Array.isArray(value) === false) {
            value = [value];
          }

          value.forEach((value, i) => {
            if(property.convert && typeof property.convert === 'function') {
              value = property.convert(value);
            }

            payload.properties.push({
              id: property.id,
              value: value,
            });
          });
        });

        pattern.push(payload);
      }
    });

    await Storage.set({key: 'pattern', value: JSON.stringify(patternJSON)});

    App.services.led.runPattern(1, pattern);
  }

}

customElements.define('pattern-view', PatternView);
