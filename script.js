const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const overlay = document.getElementById('overlay');
const overlayText = document.getElementById('overlayText');
const startButton = document.getElementById('startButton');

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

let bird = { x: 50, y: 200, width: 34, height: 24, velocity: 0, gravity: 0.6, lift: -10 };
let pipes = [];
let score = 0;
let gameOver = false;
let gameStarted = false;
let frameCount = 0;

const groundHeight = 112;
let groundX = 0;

// Load images
const birdImg = new Image();
birdImg.src = 'images/bird.png';
const groundImg = new Image();
groundImg.src = 'images/ground.png';
const pipeTopImg = new Image();
pipeTopImg.src = 'images/pipe_top.png';
const pipeBottomImg = new Image();
pipeBottomImg.src = 'images/pipe_bottom.png';

// Toon overlay pas als alle afbeeldingen geladen zijn
let assetsLoaded = 0;
function checkLoaded() {
    assetsLoaded++;
    if (assetsLoaded === 4) overlay.style.display = 'flex';
}
birdImg.onload = checkLoaded;
groundImg.onload = checkLoaded;
pipeTopImg.onload = checkLoaded;
pipeBottomImg.onload = checkLoaded;

// Flap
function flap() { bird.velocity = bird.lift; }
canvas.addEventListener("click", flap);
document.addEventListener("keydown", e => {
    if (e.code === "Space") {
        if (!gameStarted || gameOver) startButton.click();
        else flap();
    }
});

// Start button
startButton.addEventListener('click', () => {
    overlay.style.display = 'none';
    if (startButton.textContent === 'Restart') resetGame();
    gameStarted = true;
    loop();
});

// Update
function updateBird() {
    bird.velocity += bird.gravity;
    bird.y += bird.velocity;
    if (bird.y + bird.height > canvasHeight - groundHeight) {
        bird.y = canvasHeight - groundHeight - bird.height;
        gameOver = true;
    }
    if (bird.y < 0) bird.y = 0;
}

function updatePipes() {
    if (frameCount % 90 === 0) {
        let gap = 150;
        let topHeight = Math.random() * (canvasHeight - groundHeight - gap - 50) + 25;
        pipes.push({ x: canvasWidth, width: 52, top: topHeight, bottom: canvasHeight - groundHeight - topHeight - gap, passed: false });
    }
    pipes.forEach(pipe => {
        pipe.x -= 2;
        if (bird.x < pipe.x + pipe.width && bird.x + bird.width > pipe.x &&
            (bird.y < pipe.top || bird.y + bird.height > canvasHeight - groundHeight - pipe.bottom)) {
            gameOver = true;
        }
        if (!pipe.passed && pipe.x + pipe.width < bird.x) {
            score++;
            pipe.passed = true;
        }
    });
    pipes = pipes.filter(pipe => pipe.x + pipe.width > 0);
}

// Draw
function drawBackground() {
    ctx.fillStyle = "#70c5ce";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
}

function drawPipes() {
    pipes.forEach(pipe => {
        ctx.drawImage(pipeTopImg, pipe.x, 0, pipe.width, pipe.top);
        ctx.drawImage(pipeBottomImg, pipe.x, canvasHeight - groundHeight - pipe.bottom, pipe.width, pipe.bottom);
    });
}

function drawGround() {
    groundX = (groundX - 2) % canvasWidth;
    ctx.drawImage(groundImg, groundX, canvasHeight - groundHeight, canvas.width, groundHeight);
    ctx.drawImage(groundImg, groundX + canvas.width, canvasHeight - groundHeight, canvas.width, groundHeight);
}

function drawBird() {
    ctx.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
}

function drawScore() {
    ctx.fillStyle = "white";
    ctx.font = "32px Arial";
    ctx.fillText(score, canvasWidth / 2 - 10, 50);
}

// Loop
function loop() {
    if (!gameStarted) return;
    if (gameOver) {
        overlayText.innerHTML = `Game Over<br>Score: ${score}`;
        startButton.textContent = 'Restart';
        overlay.style.display = 'flex';
        return;
    }

    frameCount++;
    updateBird();
    updatePipes();

    drawBackground();
    drawPipes();
    drawGround();
    drawBird();
    drawScore();

    requestAnimationFrame(loop);
}

function resetGame() {
    bird.y = 200;
    bird.velocity = 0;
    pipes = [];
    score = 0;
    gameOver = false;
    frameCount = 0;
    groundX = 0;
}
