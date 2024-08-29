"use strict";

// Global Variables
const main = document.querySelector("main");
const playerWrap = document.getElementById("player-wrap");

const presets = [
  [
    "./assets/img/east-europe-room.gif",
    "./assets/music/east-europe-room.mp3",
    "East Europe room",
  ],
  [
    "./assets/img/new-york-slum.gif",
    "./assets/music/new-york-slum.mp3",
    "New Yourk slum",
  ],
  [
    "./assets/img/seilor-moon.gif",
    "./assets/music/seilor-moon.mp3",
    "Seilor Moon",
  ],
  ["./assets/img/study.gif", "./assets/music/study.mp3", "Studing girl"],
  [
    "./assets/img/twiglight-forest.gif",
    "./assets/music/twiglight-forest.mp3",
    "Twiglight forest",
  ],
  [
    "./assets/img/waterfall-in-the-forest.gif",
    "./assets/music/waterfall-in-the-forest.mp3",
    "Waterfall in the forest",
  ],
];

HTMLElement.prototype.appendChildren = function (...args) {
  args.forEach((arg) => this.appendChild(arg));
};

const createElAndAssignAtr = function (props) {
  const element = document.createElement(props.type);
  for (const atr of [...Object.keys(props.attrs)]) {
    element[atr] = props.attrs[atr];
  }
  return element;
};

// Switch theme
const toggleSwitch = document.querySelector(
  '.theme-switch input[type="checkbox"]'
);
const currentTheme = localStorage.getItem("theme");

if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);

  if (currentTheme === "dark") {
    toggleSwitch.checked = true;
  }
}

const switchTheme = function (e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }
};

toggleSwitch.addEventListener("change", switchTheme, false);

// Clock logic

const clock = document.getElementById("clock");

setInterval(function () {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  clock.innerText = `${hours < 10 ? 0 : ""}${hours}:${
    minutes < 10 ? 0 : ""
  }${minutes}:${seconds < 10 ? 0 : ""}${seconds}`;
}, 1000);

// Add URL to iframe
const urlForm = document.getElementById("url-form");
const input = urlForm.querySelector("input");
const btnSubmit = urlForm.querySelector("button");
let inputValue = input.value;

// MODAL
const createModal = function () {
  if (!document.getElementById("modal")) {
    main.appendChildren(modal, overlay);
    modal.appendChild(modalContent);
  }
};
const closeModal = function () {
  modal.remove();
  overlay.remove();
  modalChooseOptions.value = "empty";
};

const btnOpenModal = document.querySelectorAll(".show-modal");
const btnCloseModal = createElAndAssignAtr({
  type: "button",
  attrs: {
    classList: "close-modal",
    id: "close-modal",
    onclick: closeModal,
  },
});
btnCloseModal.innerHTML = "&times;";
const modalChooseOptions = document.getElementById("modal-options");
const modal = createElAndAssignAtr({
  type: "div",
  attrs: {
    classList: "modal",
    id: "modal",
  },
});
const overlay = createElAndAssignAtr({
  type: "div",
  attrs: {
    classList: "overlay",
    id: "overlay",
    onclick: closeModal,
  },
});
const modalContent = createElAndAssignAtr({
  type: "div",
  attrs: {
    classList: "modal-content",
    id: "modal-content",
  },
});

const changeBackground = function (event) {
  playerWrap.innerHTML = "";
  const parentEl = event.target.parentElement;
  if (parentEl.nodeName === "LI") {
    const src = parentEl.querySelector("iframe").src;
    const background = createElAndAssignAtr({
      type: "iframe",
      attrs: {
        src: `${src}`,
      },
    });
    playerWrap.appendChild(background);
  }
};

// Modal content
const createModalContent = function (element) {
  // debugger;
  createModal();
  modalContent.innerHTML = "";
  const modalTopContent = createElAndAssignAtr({
    type: "div",
    attrs: {
      classList: "modal-top-content",
      id: "modal-top-content",
    },
  });
  const header = createElAndAssignAtr({
    type: "h3",
    attrs: {
      classList: "modal-top-content-header",
      id: "modal-top-content-header",
      innerHTML: `Add ${element} lofi`,
    },
  });
  const modalMainContent = createElAndAssignAtr({
    type: "div",
    attrs: {
      classList: "modal-main-content",
      id: "modal-main-content",
    },
  });
  modalContent.appendChildren(modalTopContent, modalMainContent);
  modalTopContent.appendChildren(header, btnCloseModal);

  const createPresetsContent = function () {
    const listItemsOfPreset = [];
    const listOfPresets = createElAndAssignAtr({
      type: "ul",
      attrs: {
        classList: "list-of-presets",
        id: "list-of-presets",
      },
    });

    for (let i = 0; i < presets.length; i++) {
      listItemsOfPreset.push(
        createElAndAssignAtr({
          type: "li",
          attrs: {
            classList: "list-item-of-presets",
            id: "list-item-of-presetss",
          },
        })
      );
    }

    for (let i = 0; i < listItemsOfPreset.length; i++) {
      const [imgSrc, audioSrc, text] = presets[i];
      const img = createElAndAssignAtr({
        type: "img",
        attrs: {
          src: imgSrc,
          alt: text,
        },
      });
      const p = createElAndAssignAtr({
        type: "p",
        attrs: {
          innerText: text,
        },
      });
      const playBtn = createElAndAssignAtr({
        type: "button",
        attrs: {
          classList: "play-btn",
          innerText: "Play",
          onclick(event) {
            playerWrap.innerHTML = "";
            const audio = createElAndAssignAtr({
              type: "audio",
              attrs: {
                src: audioSrc,
                loop: true,
                autoplay: "autoplay",
              },
            });
            const background = createElAndAssignAtr({
              type: "img",
              attrs: {
                src: `${event.target.parentElement.querySelector("img").src}`,
              },
            });
            playerWrap.appendChildren(background, audio);
          },
        },
      });
      listItemsOfPreset[i].appendChildren(img, p, playBtn);
    }
    modalMainContent.appendChild(listOfPresets);
    listOfPresets.appendChildren(...listItemsOfPreset);
  };

  const createYoutubeContent = function () {
    const form = createElementAndAssignWithClassAndID(
      "form",
      "form-for-youtube"
    );
    const input = createElementAndAssignWithClassAndID(
      "input",
      "input-for-youtube"
    );
  };
  if (element === "presets") createPresetsContent();
};

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closeModal();
});

modalChooseOptions.addEventListener("change", function () {
  if (this.value !== "empty") {
    createModalContent(this.value);
  }
});
