const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const overlay = document.getElementById('overlay');
const overlayText = document.getElementById('overlayText');
const startButton = document.getElementById('startButton');

let bird = {
  x: 50,
  y: 150,
  width: 34,
  height: 24,
  gravity: 0.6,
  lift: -10,
  velocity: 0,
  frame: 0
};

let pipes = [];
let score = 0;
let gameOver = false;
let gameStarted = false;

// Grond
const groundHeight = 112;
let groundX = 0;

// Bird sprite
const birdImg = new Image();
birdImg.src = 'images/bird.png';
birdImg.onload = () => {
  overlay.style.display = 'flex'; // toon start overlay als vogel geladen is
};

// Bird
function drawBird() {
  ctx.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
}

// Pipes
function drawPipes() {
  ctx.fillStyle = "#2ecc71";
  pipes.forEach(pipe => {
    ctx.fillRect(pipe.x, 0, pipe.width, pipe.top);
    ctx.fillRect(pipe.x, canvas.height - groundHeight - pipe.bottom, pipe.width, pipe.bottom);
  });
}

// Grond
function drawGround() {
  groundX = (groundX - 2) % canvas.width;
  ctx.fillStyle = "#deaa88";
  ctx.fillRect(groundX, canvas.height - groundHeight, canvas.width, groundHeight);
  ctx.fillRect(groundX + canvas.width, canvas.height - groundHeight, canvas.width, groundHeight);
}

// Pipes update
function updatePipes() {
  if (bird.frame % 90 === 0) {
    let gap = 150;
    let top = Math.random() * (canvas.height - groundHeight) / 2;
    pipes.push({
      x: canvas.width,
      width: 40,
      top: top,
      bottom: canvas.height - groundHeight - top - gap,
      passed: false
    });
  }

  pipes.forEach(pipe => {
    pipe.x -= 2;

    if (
      bird.x < pipe.x + pipe.width &&
      bird.x + bird.width > pipe.x &&
      (bird.y < pipe.top || bird.y + bird.height > canvas.height - groundHeight - pipe.bottom)
    ) {
      gameOver = true;
    }

    if (!pipe.passed && pipe.x + pipe.width < bird.x) {
      score++;
      pipe.passed = true;
    }
  });

  pipes = pipes.filter(pipe => pipe.x + pipe.width > 0);
}

// Bird update
function updateBird() {
  bird.velocity += bird.gravity;
  bird.y += bird.velocity;

  if (bird.y + bird.height > canvas.height - groundHeight) {
    bird.y = canvas.height - groundHeight - bird.height;
    gameOver = true;
  }

  if (bird.y < 0) {
    bird.y = 0;
    bird.velocity = 0;
  }
}

// Score
function drawScore() {
  ctx.fillStyle = "white";
  ctx.font = "32px Arial";
  ctx.fillText(score, canvas.width / 2 - 10, 50);
}

// Game loop
function loop() {
  if (!gameStarted) return;

  if (gameOver) {
    overlayText.innerHTML = 'Game Over<br>Score: ' + score;
    startButton.textContent = 'Restart';
    overlay.style.display = 'flex';
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  updateBird();
  updatePipes();

  drawBird();
  drawPipes();
  drawGround();
  drawScore();

  bird.frame++;
  requestAnimationFrame(loop);
}

// Flap
function flap() {
  bird.velocity = bird.lift;
}

document.addEventListener("keydown", flap);
canvas.addEventListener("click", flap);

startButton.addEventListener('click', () => {
  overlay.style.display = 'none';
  if (startButton.textContent === 'Restart') resetGame();
  gameStarted = true;
  loop();
});

// Reset
function resetGame() {
  bird.y = 150;
  bird.velocity = 0;
  pipes = [];
  score = 0;
  gameOver = false;
  bird.frame = 0;
  groundX = 0;
}
