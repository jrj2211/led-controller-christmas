import effects from "effects";

import "./pattern-editor.css";

export default class PatternEditor extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = `
      <div class='title'>
        <h1>Edit Step</h1>
        <ion-icon action='close' src='svg/close-circle-outline.svg'></ion-icon>
      </div>

      <label>
        <h4>Effect</h4>
        <select name='effect'>
          <option selected disabled>-- Choose Effect --</option>
        </select>
      </label>
      <div class='properties'></div>
      <div class='buttons'>
        <div class='button square' action='delete' color='subtle'><ion-icon src='svg/trash-outline.svg'></ion-icon></div>
        <div class='button' action='save' color='accent'>Add Step</div>
      </div>
    `;

    this.buttons = {
      close: this.querySelector("ion-icon[action=close]"),
      save: this.querySelector(".button[action=save]"),
      delete: this.querySelector(".button[action=delete]"),
    };

    this.effectSelector = this.querySelector("select[name=effect]");

    // Add effects to the dropdown
    for (let name in effects) {
      const option = document.createElement("option");
      option.setAttribute("value", name);
      option.innerText = effects[name].label;
      this.effectSelector.append(option);
    }

    this.close = this.close.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onChangeEffect = this.onChangeEffect.bind(this);
  }

  connectedCallback() {
    this.buttons.close.addEventListener("click", this.close);
    this.buttons.save.addEventListener("click", this.onSave);
    this.buttons.delete.addEventListener("click", this.onDelete);
    this.effectSelector.addEventListener(
      "change",
      this.onChangeEffect.bind(this)
    );
  }

  disconnectedCallback() {
    this.buttons.close.removeEventListener("click", this.close);
    this.buttons.save.removeEventListener("click", this.onSave);
    this.buttons.delete.removeEventListener("click", this.onDelete);
    this.effectSelector.removeEventListener(
      "change",
      this.onChangeEffect.bind(this)
    );
  }

  open(step) {
    this.step = step;

    if (step) {
      this.setAttribute("editing", true);
      this.setEffect(step.info.name, step.info.properties);
    } else {
      this.removeAttribute("editing");
      this.setEffect();
    }

    this.buttons.save.innerText = (step ? "Update" : "Add") + " Step";
    this.classList.add("show");
  }

  close() {
    this.step = null;
    this.classList.remove("show");
  }

  setEffect(name, values) {
    const properties = this.querySelector(".properties");
    properties.innerHTML = "";

    if (name) {
      this.buttons.save.setAttribute("color", "accent");
    } else {
      this.buttons.save.setAttribute("color", "subtle");
    }

    if (name) {
      this.effectSelector.value = name;

      if (name in effects) {
        const form = effects[name];

        form.properties.forEach((input, i) => {
          properties.append(this.createProperty(input, values?.[input.name]));
        });
      } else {
        properties.innerHTML = `<div class='msg error'>ERROR: Unknown effect type</div>`;
      }
    } else {
      this.effectSelector.selectedIndex = 0;
    }
  }

  createProperty(info, value) {
    const el = document.createElement("div");

    el.innerHTML = `
      <h4>${info.label}</h4>
      <div class='input-container'></div>
    `;

    let numInputs = 1;

    if (info.multiple) {
      el.insertAdjacentHTML(
        "beforeend",
        `<div class='add-multiple'>Add <ion-icon src='svg/add-outline.svg'></ion-icon></div>`
      );
      el.setAttribute("multiple", true);

      numInputs =
        value?.length || info.multiple?.initial || info.multiple?.min || 1;

      el.querySelector(".add-multiple").onclick = () => {
        if (
          el.querySelector(".input-container").children.length <
          (info.multiple?.max || Infinity)
        ) {
          const input = this.createInput({
            ...info,
            icon: "svg/trash-outline.svg",
            deletable: true,
          });
          el.querySelector(".input-container").append(input);
        }
      };

      for (let i = 0; i < numInputs; i++) {
        const min = info.multiple?.min || 0;

        const inputInfo = { ...info };

        if (i >= min) {
          inputInfo.icon = "svg/trash-outline.svg";
          inputInfo.deletable = true;
        }

        el.querySelector(".input-container").append(
          this.createInput(inputInfo, value?.[i])
        );
      }
    } else {
      el.querySelector(".input-container").append(
        this.createInput(info, value)
      );
    }

    return el;
  }

  createInput(info, value) {
    const row = document.createElement("div");
    row.classList.add("row");
    row.innerHTML = `<input />`;

    if (info.icon) {
      row.insertAdjacentHTML(
        "afterbegin",
        `<ion-icon src='${info.icon}'></ion-icon>`
      );

      const icon = row.querySelector("ion-icon");

      if (info.deletable) {
        icon.classList.add("delete");

        icon.onclick = (evt) => {
          if (
            evt.target.closest(".input-container").children.length >
            (info.multiple?.min || 0)
          ) {
            evt.target.closest(".row").remove();
          }
        };
      }
    }

    const input = row.querySelector("input");
    input.info = info;
    input.setAttribute("name", info.name);

    for (const attr in info.attrs) {
      input.setAttribute(attr, info.attrs[attr]);
    }

    if (value !== undefined) {
      input.value = value;
    }

    return row;
  }

  getStep() {
    const name = this.effectSelector.value;

    const step = {
      name,
      properties: {},
    };

    this.querySelectorAll(".properties input").forEach((item, i) => {
      let value = item.value;

      if (item.info.multiple) {
        if (
          Array.isArray(step.properties[item.getAttribute("name")]) === false
        ) {
          step.properties[item.getAttribute("name")] = [];
        }

        step.properties[item.getAttribute("name")].push(value);
      } else {
        step.properties[item.getAttribute("name")] = value;
      }
    });

    return step;
  }

  onChangeEffect(evt) {
    this.setEffect(evt.target.value);
  }

  onSave() {
    const info = this.getStep();
    const detail = { info, el: this.step };

    if (!this.step) {
      this.dispatchEvent(
        new CustomEvent("step.save", { detail: { ...detail, type: "add" } })
      );
    } else {
      this.dispatchEvent(
        new CustomEvent("step.save", { detail: { ...detail, type: "update" } })
      );
    }

    this.close();
  }

  onDelete() {
    if (this.step) {
      this.step.remove();
      this.close();
    }
  }
}

customElements.define("pattern-editor", PatternEditor);
