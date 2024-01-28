let content = document.querySelector("h3");

let allBtns = document.querySelectorAll(".color");

let gameSequence = [];

let userSequence = [];

let started = false;

let level = 0;

const btnColors = ["rain", "sky", "dark", "water"];

document.addEventListener("keypress", () => {
  if (!started) {
    started = true;
    reset();
    btnEnabled();
  }
});

const gameFlash = (btn) => {
  btn.classList.add("gameFlash");
  setTimeout(() => {
    btn.classList.remove("gameFlash");
  }, 500);
};

const userFlash = (btn) => {
  btn.classList.add("userFlash");
  setTimeout(() => {
    btn.classList.remove("userFlash");
  }, 500);
};

let levelUp = () => {
  userSequence = [];
  level++;
  content.innerText = `Level : ${level}`;
  //random btn flash
  let randomIdx = Math.floor(Math.random() * 4);
  let randomColor = btnColors[randomIdx];
  let randomBtn = document.querySelector(`.${randomColor}`);
  gameSequence.push(randomColor);
  gameFlash(randomBtn);
};

const match = (idx) => {
  if (userSequence[idx] === gameSequence[idx]) {
    if (userSequence.length === gameSequence.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    content.innerText = `Game Over : your score is ${level}, press any key to start`;
    btnsDisabled();
  }
};

const reset = () => {
  started = false;
  level = 0;
  userSequence = [];
  gameSequence = [];
};

const btnsDisabled = () => {
  for (const btn of allBtns) {
    btn.disabled = true;
  }
};

const btnEnabled = () => {
  for (const btn of allBtns) {
    btn.disabled = false;
  }
};

const btnPress = (event) => {
  userSequence.push(event.target.id);
  userFlash(event.target);
  match(userSequence.length - 1);
};

for (const btn of allBtns) {
  btn.addEventListener("click", btnPress);
}
