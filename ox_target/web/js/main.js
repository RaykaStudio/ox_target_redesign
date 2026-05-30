import { createOptions, clearTempOptions, updateOptionsPositions } from "./createOptions.js";

const body = document.body;
const target = document.getElementById("rayka-target-container");

window.addEventListener("message", (event) => {
  switch (event.data.event) {
    case "visible": {
      clearTempOptions();
      body.style.visibility = event.data.state ? "visible" : "hidden";
      if (!event.data.state) target.classList.remove("eye-hover");
      break;
    }
    case "leftTarget": {
      clearTempOptions();
      return target.classList.remove("eye-hover");
    }
    case "setTarget": {
      clearTempOptions();
      target.classList.add("eye-hover");
      if (event.data.options) {
        for (const type in event.data.options) {
          event.data.options[type].forEach((data, id) => createOptions(type, data, id + 1));
        }
      }
      if (event.data.zones) {
        for (let i = 0; i < event.data.zones.length; i++) {
          event.data.zones[i].forEach((data, id) => createOptions("zones", data, id + 1, i + 1));
        }
      }
      updateOptionsPositions();
      break;
    }
  }
});