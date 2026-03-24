const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const overlay = document.getElementById('overlay');
const overlayText = document.getElementById('overlayText');
const startButton = document.getElementById('startButton');

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

// Game variables
let bird = {
    x: 50,
    y: 200,
    width: 34,
    height: 24,
    velocity: 0,
    gravity: 0.6,
    lift: -10,
    frame: 0,
    flapFrames: []
};

let pipes = [];
let frameCount = 0;
let score = 0;
let gameOver = false;
let gameStarted = false;

// Load images
const bgImg = new Image();
bgImg.src = 'images/background.png';

const groundImg = new Image();
groundImg.src = 'images/ground.png';
const groundHeight = 112;

const pipeImg = new Image();
pipeImg.src = 'images/pipe.png';

for (let i = 1; i <= 3; i++) {
    let img = new Image();
    img.src = `images/bird${i}.png`;
    bird.flapFrames.push(img);
}

// Input
function flap() {
    bird.velocity = bird.lift;
}

document.addEventListener("keydown", (e) => {
    if (e.code === "Space") flap();
});
canvas.addEventListener("click", flap);

// Start button
startButton.addEventListener('click', () => {
    overlay.style.display = 'none';
    if (startButton.textContent === 'Restart') resetGame();
    gameStarted = true;
    loop();
});

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
    drawScene();

    requestAnimationFrame(loop);
}

// Bird update
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

    if (frameCount % 5 === 0) {
        bird.frame = (bird.frame + 1) % bird.flapFrames.length;
    }
}

// Pipes update
function updatePipes() {
    if (frameCount % 90 === 0) {
        let gap = 150;
        let top = Math.random() * (canvasHeight - groundHeight - gap - 50) + 25;
        pipes.push({
            x: canvasWidth,
            width: 52,
            top: top,
            bottom: canvasHeight - groundHeight - top - gap,
            passed: false
        });
    }

    pipes.forEach(pipe => {
        pipe.x -= 2;

        if (
            bird.x < pipe.x + pipe.width &&
            bird.x + bird.width > pipe.x &&
            (bird.y < pipe.top || bird.y + bird.height > canvasHeight - groundHeight - pipe.bottom)
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

// Draw everything
function drawScene() {
    // Background
    ctx.drawImage(bgImg, 0, 0, canvasWidth, canvasHeight - groundHeight);

    // Pipes
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

    // Moving ground
    let groundX = -(frameCount * 2) % canvasWidth;
    ctx.drawImage(groundImg, groundX, canvasHeight - groundHeight, canvasWidth, groundHeight);
    ctx.drawImage(groundImg, groundX + canvasWidth, canvasHeight - groundHeight, canvasWidth, groundHeight);

    // Bird
    ctx.drawImage(bird.flapFrames[bird.frame], bird.x, bird.y, bird.width, bird.height);

    // Score
    ctx.fillStyle = "white";
    ctx.font = "32px Arial";
    ctx.fillText(score, canvasWidth / 2 - 10, 50);
}

// Reset game
function resetGame() {
    bird.y = 200;
    bird.velocity = 0;
    pipes = [];
    score = 0;
    gameOver = false;
    frameCount = 0;
}
