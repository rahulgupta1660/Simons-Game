let heading = document.querySelector("h3");

let allbtns = document.querySelectorAll(".color");

let btns = ["rain", "sky", "dark", "water"];

let gameSeq = [];

let userSeq = [];

let started = false;

let level = 0;

document.addEventListener("keypress", () => {
  if (!started) {
    started = true;
    levelUp();
  }
});

const gameFlash = (btn) => {
  btn.classList.add("gameFlash");
  setTimeout(() => {
    btn.classList.remove("gameFlash");
  }, 300);
};

const userFlash = (btn) => {
  btn.classList.add("userFlash");
  setTimeout(() => {
    btn.classList.remove("userFlash");
  }, 200);
};

const levelUp = () => {
  userSeq = [];
  level++;
  heading.innerText = `Level ${level}`;

  let randomIdx = Math.floor(Math.random() * 4);
  let randomColor = btns[randomIdx];
  let randomBtn = document.querySelector(`.${randomColor}`);
  gameSeq.push(randomColor);
  gameFlash(randomBtn);
};

const checkAns = (idx) => {
  if (gameSeq[idx] === userSeq[idx]) {
    if (gameSeq.length === userSeq.length) {
      setTimeout(() => {
        levelUp();
      }, 400);
    }
  } else {
    heading.innerHTML = `Game over!.your score was <b>${level}</b>.<br/>Press any key to start`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(() => {
      document.querySelector("body").style.backgroundColor = "white";
    }, 100);
    reset();
  }
};

const btnPress = (event) => {
  let btn = event.target;
  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);
  userFlash(btn);
  checkAns(userSeq.length - 1);
};

for (let btn of allbtns) {
  btn.addEventListener("click", btnPress);
}

const reset = () => {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
};
