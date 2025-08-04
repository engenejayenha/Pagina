const gameArea = document.getElementById("gameArea");
const player = document.getElementById("player");
const scoreDisplay = document.getElementById("score");
const livesDisplay = document.getElementById("lives");
const timerDisplay = document.getElementById("timer");
const restartBtn = document.getElementById("restartBtn");

let playerX = 280;
let playerY = 340;
let score = 0;
let lives = 3;
let timeLeft = 60;
let gameInterval;
let codeInterval;
let isGameOver = false;

const correctCodes = ["HTML", "CSS", "JS"];
const wrongCodes = ["PHP", "COBOL", "FORTRAN", "VB", "Perl"];

function updatePlayerPosition() {
  const maxX = gameArea.clientWidth - player.offsetWidth;
  const maxY = gameArea.clientHeight - player.offsetHeight;

  if (playerX < 0) playerX = 0;
  if (playerX > maxX) playerX = maxX;
  if (playerY < 0) playerY = 0;
  if (playerY > maxY) playerY = maxY;

  player.style.left = playerX + "px";
  player.style.top = playerY + "px";
}

document.addEventListener("keydown", (e) => {
  if (isGameOver) return;

  switch (e.key) {
    case "ArrowLeft":
      playerX -= 10;
      break;
    case "ArrowRight":
      playerX += 10;
      break;
    case "ArrowUp":
      playerY -= 10;
      break;
    case "ArrowDown":
      playerY += 10;
      break;
  }
  updatePlayerPosition();
});

function spawnCode() {
  const div = document.createElement("div");
  const isStar = Math.random() < 0.1;
  const isCorrect = Math.random() < 0.6;
  div.classList.add(isStar ? "star" : "code");
  div.textContent = isStar
    ? "⭐"
    : isCorrect
    ? correctCodes[Math.floor(Math.random() * correctCodes.length)]
    : wrongCodes[Math.floor(Math.random() * wrongCodes.length)];

  div.style.left = Math.random() * (gameArea.clientWidth - 50) + "px";
  div.style.top = "0px";

  gameArea.appendChild(div);

  const fallSpeed = 3;
  let fall = setInterval(() => {
    if (isGameOver) {
      clearInterval(fall);
      if (div.parentElement) div.remove();
      return;
    }
    let top = parseInt(div.style.top);
    top += fallSpeed;
    div.style.top = top + "px";

    const codeRect = div.getBoundingClientRect();
    const playerRect = player.getBoundingClientRect();

    if (
      codeRect.left < playerRect.right &&
      codeRect.right > playerRect.left &&
      codeRect.top < playerRect.bottom &&
      codeRect.bottom > playerRect.top
    ) {
      if (div.classList.contains("star")) {
        score += 10;
      } else if (correctCodes.includes(div.textContent)) {
        score += 5;
      } else {
        lives--;
      }
      scoreDisplay.textContent = "Puntos: " + score;
      livesDisplay.innerHTML = "Vidas: " + "❤️".repeat(lives);
      div.remove();
      clearInterval(fall);

      if (lives <= 0) {
        endGame();
      }
    }

    if (top > gameArea.clientHeight) {
      div.remove();
      clearInterval(fall);
    }
  }, 30);
}

function startGame() {
  score = 0;
  lives = 3;
  timeLeft = 60;
  isGameOver = false;
  gameArea.innerHTML = "";
  gameArea.appendChild(player);
  restartBtn.style.display = "none";
  scoreDisplay.textContent = "Puntos: 0";
  livesDisplay.innerHTML = "Vidas: ❤️❤️❤️";
  timerDisplay.textContent = "Tiempo: 60s";

  playerX = (gameArea.clientWidth - player.offsetWidth) / 2;
  playerY = gameArea.clientHeight - player.offsetHeight - 10;
  updatePlayerPosition();

  codeInterval = setInterval(spawnCode, 1200);

  gameInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = "Tiempo: " + timeLeft + "s";
    if (timeLeft <= 0) endGame();
  }, 1000);
}

function endGame() {
  clearInterval(codeInterval);
  clearInterval(gameInterval);
  isGameOver = true;
  restartBtn.style.display = "block";
}

restartBtn.onclick = startGame;

startGame();


restartBtn.onclick = startGame;

startGame();


// -------------------- Juego 2: Atrapa las Estrellas del Conocimiento --------------------
const estrellaGameArea = document.getElementById("estrellaGameArea");
const estrellaPuntos = document.getElementById("estrellaPuntos");
const estrellaTiempo = document.getElementById("estrellaTiempo");
const reiniciarEstrellas = document.getElementById("reiniciarEstrellas");

let estrellaScore = 0;
let estrellaTiempoRestante = 30;
let estrellaInterval;
let estrellaTimer;

function crearEstrella() {
  const estrella = document.createElement("div");
  estrella.classList.add("estrella");
  estrella.style.top = Math.random() * (estrellaGameArea.clientHeight - 30) + "px";
  estrella.style.left = Math.random() * (estrellaGameArea.clientWidth - 30) + "px";

  estrella.onclick = () => {
    estrellaScore++;
    estrellaPuntos.textContent = "Puntos: " + estrellaScore;
    estrella.remove();
  };

  estrellaGameArea.appendChild(estrella);

  setTimeout(() => {
    if (estrella.parentElement) estrella.remove();
  }, 1500);
}

function iniciarJuegoEstrellas() {
  estrellaScore = 0;
  estrellaTiempoRestante = 30;
  estrellaPuntos.textContent = "Puntos: 0";
  estrellaTiempo.textContent = "Tiempo: 30s";
  estrellaGameArea.innerHTML = "";
  reiniciarEstrellas.style.display = "none";

  estrellaInterval = setInterval(crearEstrella, 600);

  estrellaTimer = setInterval(() => {
    estrellaTiempoRestante--;
    estrellaTiempo.textContent = "Tiempo: " + estrellaTiempoRestante + "s";
    if (estrellaTiempoRestante <= 0) finalizarJuegoEstrellas();
  }, 1000);
}

function finalizarJuegoEstrellas() {
  clearInterval(estrellaInterval);
  clearInterval(estrellaTimer);
  reiniciarEstrellas.style.display = "block";
}

reiniciarEstrellas.onclick = iniciarJuegoEstrellas;

iniciarJuegoEstrellas();
