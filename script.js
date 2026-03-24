const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// hoogte fullscreen, breedte blijft 400
function resizeCanvas() {
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const overlay = document.getElementById('overlay');
const overlayText = document.getElementById('overlayText');
const startButton = document.getElementById('startButton');

// MENU
const menuButton = document.getElementById("menuButton");
const menu = document.getElementById("menu");

menuButton.addEventListener("click", () => {
    menu.style.left = (menu.style.left === "0px") ? "-200px" : "0px";
});

// GAME VARS
let bird = { x: 50, y: 200, width: 34, height: 24, velocity: 0, gravity: 0.6, lift: -10 };
let pipes = [];
let score = 0;
let gameOver = false;
let gameStarted = false;
let frameCount = 0;

const groundHeight = 112;
let groundX = 0;

// IMAGES
const birdImg = new Image();
birdImg.src = 'images/bird.png';

const groundImg = new Image();
groundImg.src = 'images/ground.png';

const pipeImg = new Image();
pipeImg.src = 'images/pipe.png';

// wachten tot alles geladen is
let loaded = 0;
function checkLoaded() {
    loaded++;
    if (loaded === 3) overlay.style.display = 'flex';
}
birdImg.onload = checkLoaded;
groundImg.onload = checkLoaded;
pipeImg.onload = checkLoaded;

// INPUT
function flap() { bird.velocity = bird.lift; }

canvas.addEventListener("click", flap);

document.addEventListener("keydown", e => {
    if (e.code === "Space") {
        if (!gameStarted || gameOver) startButton.click();
        else flap();
    }
});

// START
startButton.addEventListener('click', () => {
    overlay.style.display = 'none';
    if (startButton.textContent === 'Restart') resetGame();
    gameStarted = true;
    loop();
});

// UPDATE
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

function updatePipes() {
    if (frameCount % 90 === 0) {
        let gap = 150;
        let top = Math.random() * (canvas.height - groundHeight - gap - 50) + 25;

        pipes.push({
            x: canvas.width,
            width: 52,
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

    pipes = pipes.filter(p => p.x + p.width > 0);
}

// DRAW
function drawBackground() {
    ctx.fillStyle = "#70c5ce";
    ctx.fillRect(0, 0, canvas.width, canvas.height - groundHeight);

    ctx.fillStyle = "black";
    ctx.fillRect(0, canvas.height - groundHeight, canvas.width, groundHeight);
}

function drawBird() {
    ctx.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
}

function drawPipes() {
    pipes.forEach(pipe => {
        ctx.save();
        ctx.translate(pipe.x + pipe.width / 2, pipe.top / 2);
        ctx.scale(1, -1);
        ctx.drawImage(pipeImg, -pipe.width / 2, -pipe.top / 2, pipe.width, pipe.top);
        ctx.restore();

        ctx.drawImage(pipeImg, pipe.x, canvas.height - groundHeight - pipe.bottom, pipe.width, pipe.bottom);
    });
}

function drawGround() {
    groundX = (groundX - 2) % canvas.width;
    ctx.drawImage(groundImg, groundX, canvas.height - groundHeight, canvas.width, groundHeight);
    ctx.drawImage(groundImg, groundX + canvas.width, canvas.height - groundHeight, canvas.width, groundHeight);
}

function drawScore() {
    ctx.fillStyle = "white";
    ctx.font = "32px Arial";
    ctx.fillText(score, canvas.width / 2 - 10, 50);
}

// SAVE SCORE
function saveScore(score) {
    let scores = JSON.parse(localStorage.getItem("flappyScores")) || [];
    scores.push(score);
    scores.sort((a, b) => b - a);
    scores = scores.slice(0, 10);
    localStorage.setItem("flappyScores", JSON.stringify(scores));
}

// LOOP
function loop() {
    if (!gameStarted) return;

    if (gameOver) {
        saveScore(score);

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

// RESET
function resetGame() {
    bird.y = 200;
    bird.velocity = 0;
    pipes = [];
    score = 0;
    gameOver = false;
    frameCount = 0;
    groundX = 0;
}
