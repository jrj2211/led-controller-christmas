import "./pattern-view.css";

import App from "app";
import PatternEditor from "views/pattern-editor";
import effects from "effects";
import Sortable from "sortablejs";
import demoPattern from "patterns/demo.json";

export default class PatternView extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = `
      <div class='steps-empty-container'></div>
      <div class='steps'></div>
      <div class='header'>
        <div class='button' action='add' color='subtle-light'>ADD</div>
        <div class='button' action='run' color='accent'>START</div>
      </div>
    `;

    // Create editor
    this.editor = new PatternEditor();
    this.append(this.editor);

    this.buttons = {
      run: this.querySelector(".button[action=run]"),
      add: this.querySelector(".button[action=add]"),
    };

    this.steps = this.querySelector(".steps");
    Sortable.create(this.steps, {
      fallbackTolerance: 5,
      handle: ".drag",
    });

    var x = new MutationObserver((e) => {
      if (e[0].removedNodes || e[0].addedNodes) {
        this.checkNoSteps();
      }
    });

    x.observe(this.steps, { childList: true });

    this.loadCachedPattern();
  }

  connectedCallback() {
    this.buttons.add.addEventListener("click", this.openEditor);
    this.buttons.run.addEventListener("click", this.runPattern);
    this.editor.addEventListener("step.save", this.onSaveStep);
    this.checkNoSteps();
  }

  disconnectedCallback() {
    this.buttons.add.removeEventListener("click", this.openEditor);
    this.buttons.run.removeEventListener("click", this.runPattern);
    this.editor.removeEventListener("step.save", this.onSaveStep);
  }

  loadCachedPattern() {
    try {
      let data = JSON.parse(localStorage.getItem("pattern"));
      this.loadPattern(data);
    } catch (err) {
      console.log(err);
    }
  }

  loadDemoPattern() {
    this.loadPattern(demoPattern);
  }

  loadPattern(data) {
    if (Array.isArray(data)) {
      data.forEach((step) => {
        const el = document.createElement("div");
        this.updateStepEl(step, el);
        this.steps.append(el);
      });
    }
  }

  checkNoSteps() {
    if (this.steps?.childElementCount == 0) {
      const div = document.createElement("div");
      div.classList.add("steps-empty");
      div.innerHTML = `
        <div>No steps added to pattern</div>
        <div class='quick-actions'>
          <div class='get-started'>Get Started</div>
          <div class='button load-demo' color='subtle-dark'>Load Demo Pattern</div>
          <div class='button add-effect' color='subtle-dark'>Add an Effect</div>
        </div>
      `;
      div
        .querySelector(".load-demo")
        .addEventListener("click", () => this.loadDemoPattern());
      div
        .querySelector(".add-effect")
        .addEventListener("click", () => this.openEditor());
      this.querySelector(".steps-empty-container").append(div);
    } else {
      this.querySelector(".steps-empty-container").innerHTML = "";
    }
  }

  onSaveStep = (evt) => {
    let { info, el, type } = evt.detail;

    if (type === "add") {
      el = document.createElement("div");
      this.steps.append(el);
    } else if (type === "update") {
      el.innerHTML = "";
    }

    this.updateStepEl(info, el);
  };

  openEditor = () => {
    this.editor.open();
  };

  updateStepEl = (info, step) => {
    step = step;

    step.classList.add("step");
    step.info = info;

    const effect = effects[info.name];

    step.innerHTML = `
      <div class='drag'><ion-icon src='svg/reorder-two-outline.svg'></ion-icon></div>
      <div>${effect.label}</div>
    `;

    let colorsEl = document.createElement("div");
    colorsEl.classList.add("colors");

    if (Array.isArray(step.info.properties.color)) {
      step.info.properties.color.forEach((color, i) => {
        colorsEl.insertAdjacentHTML(
          "beforeend",
          `<div class='color' style='background: ${color};'></div>`
        );
      });
    } else if (step.info.properties.color) {
      colorsEl.insertAdjacentHTML(
        "beforeend",
        `<div class='color' style='background: ${step.info.properties.color};'></div>`
      );
    } else if (info.name === "rainbow") {
      colorsEl.insertAdjacentHTML(
        "beforeend",
        `<div class='color' style='width: 60px; background: linear-gradient(90deg, rgba(255, 0, 0, 1) 0%, rgba(255, 154, 0, 1) 10%, rgba(208, 222, 33, 1) 20%, rgba(79, 220, 74, 1) 30%, rgba(63, 218, 216, 1) 40%, rgba(47, 201, 226, 1) 50%, rgba(28, 127, 238, 1) 60%, rgba(95, 21, 242, 1) 70%, rgba(186, 12, 248, 1) 80%, rgba(251, 7, 217, 1) 90%, rgba(255, 0, 0, 1) 100%);'></div>`
      );
    }

    step.onclick = () => {
      this.editor.open(step);
    };

    step.append(colorsEl);

    return step;
  };

  runPattern = () => {
    const pattern = [];
    this.steps.childNodes.forEach((step, i) => {
      const info = step.info;

      const effect = {
        id: info.effect.id,
        properties: [],
      };

      effects[step.info.name].properties.forEach((property, i) => {
        let value = info.properties[property.name];

        if (Array.isArray(value) === false) {
          value = [value];
        }

        value.forEach((value, i) => {
          if (property.convert && typeof property.convert === "function") {
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
    localStorage.setItem(
      "pattern",
      JSON.stringify(
        [...document.querySelector("pattern-view").steps.childNodes].map(
          (step) => step.info
        )
      )
    );
  };
}

customElements.define("pattern-view", PatternView);
