const gameKeys = []; 
let counter = 0;
const keySize = 75;
const keysLayout = [
  '1', '2', '3', '4', 
  '5', '6', '7', '8',
  '9', '10', '11', '12',
  '13', '14', '15', ''
];
let random = [];
let timerOn = false; 
let seconds = 0; 
let timeout;

function init () {
  const wrapper = document.createElement("div");
  const nav = document.createElement("nav");
  const button = document.createElement("button");
  const container = document.createElement("div");
  const changable = document.createElement("div");
  const gameboard = document.createElement("section");

  wrapper.classList.add("wrapper");
  button.classList.add("menu");
  container.classList.add("container");
  changable.classList.add("changable");
  gameboard.classList.add("gameboard");

  button.innerText = "Start Game";
  changable.innerHTML = `
    <span class="time">Time: 00:00:00</span>
    <span class="moves">Moves: <span id='move'>${counter}</span></span>
    `;

  const win = document.createElement('div');
  win.classList.add('popup');
  win.classList.add('up-up');
  const winText = document.createElement('div');
  winText.classList.add('win-text');
  winText.innerText = '';
  const btnOk = document.createElement('button');
  btnOk.classList.add('win');
  btnOk.innerText = 'Ok';
  win.appendChild(winText);
  win.appendChild(btnOk);

  container.appendChild(changable);
  container.appendChild(gameboard);
  nav.appendChild(button);
  wrapper.appendChild(win);
  wrapper.appendChild(nav);
  wrapper.appendChild(container);


  document.body.appendChild(wrapper);
  createGameField();
};

function createGameField () {
const gameboard = document.querySelector('.gameboard');
for (let i = 0; i < 16; i++) {
  let key = document.createElement("div");
  key.className = 'key';
  key.innerHTML = keysLayout[i];
  let top,
    left;
  if (i <= 3) {
    top = 0;
    left = i * keySize;
  } else if (i > 3 && i <= 7) {
    top = keySize;
    left = (i - 4) * keySize;
  } else if (i > 7 && i <= 11) {
    top = 2 * keySize;
    left = (i - 8) * keySize;
  } else {
    top = 3 * keySize;
    left = (i - 12) * keySize;
  };
 
  key.style.left = `${left}px`;
  key.style.top = `${top}px`;

  if (i === 15) {
    key.classList.add('empty');
  };
   gameboard.append(key);

  gameKeys.push({
    id: i,
    top: top,
    left: left,
    key: key,
  });
 };
};

function startNewGame () {
  menu.innerHTML = 'New Game';
  random = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].sort(() => Math.random() - 0.5);
  console.log('random array: ', random);
  let sum = 0;
  let row = empty.top / keySize + 1;
  for (let i = 0; i < random.length; i++) {
      
      let k = i + 1;
      while (k < random.length) {
        if (random[k] < random[i]) {
          sum = sum + 1;
        };
        k++;
      };
      console.log(`random[i] = ${random[i]}, sum = ${sum}`);
    
  };
  sum = sum + row;
  console.log(`row is: ${row}`);
  console.log('sum is: ', sum);
  if (sum % 2 !== 0) {
    startNewGame();
  };

  newGameLayout();
 if (timerOn) {
  clearTimeout(timeout);
  timerOn = false;
  timerZeroed();
  } else {
    if (pause.innerText === "Resume") {
      pause.innerText = "Pause";
      timerZeroed();
    }
}
};

function newGameLayout () {
for (let i = 0; i < 15; i++) {
  let cell = gameKeys[i];  
  cell.key.innerHTML = `${random[i]}`;
  cell.id = random[i] - 1;
  let top,
    left;
  if (i <= 3) {
    top = 0;
    left = i * keySize;
  } else if (i > 3 && i <= 7) {
    top = keySize;
    left = (i - 4) * keySize;
  } else if (i > 7 && i <= 11) {
    top = 2 * keySize;
    left = (i - 8) * keySize;
  } else {
    top = 3 * keySize;
    left = (i - 12) * keySize;
  };
  cell.left = left;
  cell.top = top;
  cell.key.style.left = `${left}px`;
  cell.key.style.top = `${top}px`;
};
  empty.left = 225;
  empty.top = 225;
  empty.key.style.left = `${empty.left}px`;
  empty.key.style.top = `${empty.top}px`;
};

function count() {
  counter++;
  moves.innerHTML = `Moves: ${counter}`;
}
function countDown() {
  counter = 0;
  moves.innerHTML = `Moves: ${counter}`;
}

function addZero(n) {
  return (parseInt(n, 10) < 10 ? "0" : "") + n;
}
function setTimer() {
  let h = parseInt(seconds / 3600 % 24);
  let m = parseInt(seconds / 60 % 60);
  let s = parseInt(seconds % 60);
  time.innerHTML = `Time: ${addZero(h)}:${addZero(m)}:${addZero(s)}`;

  seconds++;
  timeout = setTimeout(setTimer, 1000);
}
function timerZeroed() {
  seconds = 0;
  time.innerHTML = "Time: 00:00:00";
}

window.addEventListener("DOMContentLoaded", init());
const time = document.querySelector(".time");
const menu = document.querySelector(".menu");
menu.addEventListener("click", startNewGame);
const moves = document.querySelector(".moves");
const popup = document.querySelector('.popup');
const win = document.querySelector('.win-text');

let empty = gameKeys[15];
gameKeys.forEach(cell => {
  cell.key.addEventListener('click', () => {
    if ((((cell.left + keySize === empty.left) || (cell.left - keySize === empty.left)) && (cell.top === empty.top)) || (((cell.top + keySize === empty.top) || (cell.top - keySize === empty.top)) && (cell.left === empty.left))) {

      let leftTemp = empty.left;
      let topTemp = empty.top;
      empty.left = cell.left;
      empty.top = cell.top;
      cell.left = leftTemp;
      cell.top = topTemp;

      empty.key.style.left = `${empty.left}px`;
      empty.key.style.top = `${empty.top}px`;
      cell.key.style.left = `${cell.left}px`;
      cell.key.style.top = `${cell.top}px`;

      count();
     if (!timerOn) {
      setTimer();
      timerOn = !timerOn;
      if (pause.innerText === "Resume") {
        pause.innerText = "Pause";
      }
    }
  }    
    if (counter > 1) {
      const isFinished = gameKeys.every(picked => {
        let place = picked.top / keySize * 4 + picked.left / keySize;
        console.log(`cell.id = ${picked.id}, cell place = ${place}`);
        return picked.id === place;
      });
      if (isFinished) {
        clearTimeout(timeout);
        timerOn = false;
        seconds--;

        let h = parseInt(seconds / 3600 % 24);
        let m = parseInt(seconds / 60 % 60);
        let s = parseInt(seconds % 60);
        win.innerHTML = `<p>Congratulations!</p><p>You solved the puzzle<br>in ${addZero(h)}:${addZero(m)}:${addZero(s)}<br> and ${counter} moves!!!</p>`;
        popup.classList.remove('up-up');
      };
    };
  });
});

document.querySelector('.win').addEventListener('click', () => {
  popup.classList.add('up-up');
  countDown();
  menu.innerHTML = 'Start Game';
  random = [];
  timerZeroed();
});
