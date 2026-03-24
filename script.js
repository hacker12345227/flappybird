const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const overlay = document.getElementById('overlay');
const overlayText = document.getElementById('overlayText');
const startButton = document.getElementById('startButton');

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

// Game variables
let bird = { x: 50, y: 200, width: 34, height: 24, velocity: 0, gravity: 0.6, lift: -10 };
let pipes = [];
let score = 0;
let gameOver = false;
let gameStarted = false;
let frameCount = 0;

// Ground
const groundHeight = 112;
let groundX = 0;

// Load images
const birdImg = new Image();
birdImg.src = 'images/bird.png';

const groundImg = new Image();
groundImg.src = 'images/ground.png';

const pipeImg = new Image();
pipeImg.src = 'images/pipe.png';

// Pas overlay tonen als alle assets geladen zijn
let assetsLoaded = 0;
function checkAssetsLoaded() {
    assetsLoaded++;
    if (assetsLoaded === 3) overlay.style.display = 'flex';
}
birdImg.onload = checkAssetsLoaded;
groundImg.onload = checkAssetsLoaded;
pipeImg.onload = checkAssetsLoaded;

// Flap
function flap() { bird.velocity = bird.lift; }

// Input: click op canvas
canvas.addEventListener("click", flap);

// Input: Space
document.addEventListener("keydown", e => {
    if (e.code === "Space") {
        if (!gameStarted || gameOver) {
            startButton.click();
        } else {
            flap();
        }
    }
});

// Start button
startButton.addEventListener('click', () => {
    overlay.style.display = 'none';
    if (startButton.textContent === 'Restart') resetGame();
    gameStarted = true;
    loop();
});

// Update bird
function updateBird() {
    bird.velocity += bird.gravity;
    bird.y += bird.velocity;

    if (bird.y + bird.height > canvasHeight - groundHeight) {
        bird.y = canvasHeight - groundHeight - bird.height;
        gameOver = true;
    }

    if (bird.y < 0) {
        bird.y = 0;
        bird.velocity = 0;
    }
}

// Update pipes
function updatePipes() {
    if (frameCount % 90 === 0) {
        let gap = 150;
        let top = Math.random() * (canvasHeight - groundHeight - gap - 50) + 25;
        pipes.push({ x: canvasWidth, width: 52, top: top, bottom: canvasHeight - groundHeight - top - gap, passed: false });
    }

    pipes.forEach(pipe => {
        pipe.x -= 2;

        // Collision
        if (bird.x < pipe.x + pipe.width && bird.x + bird.width > pipe.x &&
            (bird.y < pipe.top || bird.y + bird.height > canvasHeight - groundHeight - pipe.bottom)) {
            gameOver = true;
        }

        // Score
        if (!pipe.passed && pipe.x + pipe.width < bird.x) {
            score++;
            pipe.passed = true;
        }
    });

    pipes = pipes.filter(pipe => pipe.x + pipe.width > 0);
}

// Draw bird
function drawBird() {
    ctx.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
}

// Draw pipes with image
function drawPipes() {
    pipes.forEach(pipe => {
        // Top pipe (flipped)
        ctx.save();
        ctx.translate(pipe.x + pipe.width / 2, pipe.top / 2);
        ctx.scale(1, -1);
        ctx.drawImage(pipeImg, -pipe.width / 2, -pipe.top / 2, pipe.width, pipe.top);
        ctx.restore();

        // Bottom pipe
        ctx.drawImage(pipeImg, pipe.x, canvasHeight - groundHeight - pipe.bottom, pipe.width, pipe.bottom);
    });
}

// Draw ground
function drawGround() {
    groundX = (groundX - 2) % canvasWidth;
    ctx.drawImage(groundImg, groundX, canvasHeight - groundHeight, canvas.width, groundHeight);
    ctx.drawImage(groundImg, groundX + canvas.width, canvasHeight - groundHeight, canvas.width, groundHeight);
}

// Draw score
function drawScore() {
    ctx.fillStyle = "white";
    ctx.font = "32px Arial";
    ctx.fillText(score, canvasWidth / 2 - 10, 50);
}

// Game loop
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

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    drawPipes();
    drawGround();
    drawBird();
    drawScore();

    requestAnimationFrame(loop);
}

// Reset game
function resetGame() {
    bird.y = 200;
    bird.velocity = 0;
    pipes = [];
    score = 0;
    gameOver = false;
    frameCount = 0;
    groundX = 0;
}
