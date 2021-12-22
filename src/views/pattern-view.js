import './pattern-view.css';

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
    Sortable.create(this.steps);
  }

  connectedCallback() {
    this.buttons.add.addEventListener('click', () => {
      this.editor.open();
    });

    this.editor.addEventListener('step.add', (evt) => {
      console.log(evt)
      this.steps.append(evt.detail);
    });
  }
}

customElements.define('pattern-view', PatternView);
