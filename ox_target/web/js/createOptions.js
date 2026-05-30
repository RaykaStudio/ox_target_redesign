import { fetchNui } from "./fetchNui.js";

const optionsWrapper = document.getElementById("options-wrapper");

function onClick() {
  this.style.pointerEvents = "none";
  fetchNui("select", [this.targetType, this.targetId, this.zoneId]);
  setTimeout(() => (this.style.pointerEvents = "auto"), 100);
}

let tempOptions = [];

export function clearTempOptions() {
  tempOptions = [];
  optionsWrapper.innerHTML = "";
}

export function createOptions(type, data, id, zoneId) {
  if (data.hide) return;

  const option = document.createElement("div");
  option.className = "rayka-container";
  const iconStyle = data.iconColor ? `style="color:${data.iconColor} !important"` : "";
  
  option.innerHTML = `
    <i class="fa-fw ${data.icon} rayka-icon" ${iconStyle}></i>
    <p class="rayka-label">${data.label}</p>
  `;

  option.targetType = type;
  option.targetId = id;
  option.zoneId = zoneId;
  option.addEventListener("click", onClick);
  optionsWrapper.appendChild(option);
  tempOptions.push(option);
}

export function updateOptionsPositions() {
  const count = tempOptions.length;
  if (count === 0) return;

  const horizontalX = 135; 
  const verticalY = 65;    

  tempOptions.forEach((option, index) => {
    let x = 0;
    let y = 0;

    if (count <= 5) {
      if (count === 1) { x = horizontalX; y = 0; }
      else if (count === 2) { 
        x = (index === 0 ? horizontalX : -horizontalX); y = 0; 
      }
      else if (count === 3) {
        if (index === 0) { x = horizontalX; y = 0; }
        else if (index === 1) { x = -horizontalX; y = 0; }
        else { x = 0; y = -verticalY; }
      }
      else if (count === 4) {
        if (index === 0) { x = horizontalX; y = 0; }
        else if (index === 1) { x = -horizontalX; y = 0; }
        else if (index === 2) { x = 0; y = -verticalY; }
        else { x = 0; y = verticalY; }
      }
      else if (count === 5) {
        const angle = (index * (2 * Math.PI)) / count - Math.PI / 2;
        x = Math.cos(angle) * 140;
        y = Math.sin(angle) * 140 * 0.8;
      }
    } else {

      const radius = 180 + ((count - 5) * 60); 
      const startAngle = -Math.PI / 2;
      const angle = startAngle + (index * (2 * Math.PI)) / count;
      
      x = Math.cos(angle) * radius;
      y = Math.sin(angle) * radius * 0.85; 
    }

    requestAnimationFrame(() => {
      option.style.left = `${x}px`;
      option.style.top = `${y}px`;
      setTimeout(() => {
        option.classList.add("spawned");
      }, 50);
    });
  });
}