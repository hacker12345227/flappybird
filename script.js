// LOGIN CHECK
let currentUser = localStorage.getItem("currentUser");
if (!currentUser) location.href = "login/index.html";

let users = JSON.parse(localStorage.getItem("users")) || {};

// CANVAS
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// FULL HEIGHT
function resizeCanvas() {
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// MENU
const menuButton = document.getElementById("menuButton");
const menu = document.getElementById("menu");

menuButton.onclick = () => {
    menu.style.left = menu.style.left === "0px" ? "-220px" : "0px";
};

// IMAGES
const birdImg = new Image();
birdImg.src = "images/bird.png";

const groundImg = new Image();
groundImg.src = "images/ground.png";

const pipeImg = new Image();
pipeImg.src = "images/pipe.png";

// GAME VARS
let bird = { x:50, y:200, width:34, height:24, velocity:0, gravity:0.6, lift:-10 };
let pipes = [];
let score = 0;
let gameOver = false;
let gameStarted = false;
let frame = 0;
let groundX = 0;
const groundHeight = 112;

// INPUT
function flap(){
    bird.velocity = bird.lift;
}

canvas.onclick = () => {
    if (!gameStarted || gameOver) startButton.click();
    else flap();
};

document.onkeydown = e => {
    if (e.code === "Space") {
        e.preventDefault();

        if (!gameStarted) startButton.click();
        else if (gameOver) startButton.click();
        else flap();
    }
};

// OVERLAY
const overlay = document.getElementById("overlay");
const overlayText = document.getElementById("overlayText");
const startButton = document.getElementById("startButton");

// START
startButton.onclick = () => {
    if (gameOver) resetGame();

    overlay.style.display = "none";
    gameStarted = true;
    loop();
};

// UPDATE
function update(){
    bird.velocity += bird.gravity;
    bird.y += bird.velocity;

    if(bird.y + bird.height > canvas.height - groundHeight){
        gameOver = true;
    }

    if(frame % 90 === 0){
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

    pipes.forEach(p=>{
        p.x -= 2;

        if(
            bird.x < p.x + p.width &&
            bird.x + bird.width > p.x &&
            (bird.y < p.top || bird.y + bird.height > canvas.height - groundHeight - p.bottom)
        ){
            gameOver = true;
        }

        if(!p.passed && p.x + p.width < bird.x){
            score++;
            p.passed = true;
        }
    });

    pipes = pipes.filter(p => p.x + p.width > 0);
}

// DRAW
function draw(){
    // sky
    ctx.fillStyle = "#70c5ce";
    ctx.fillRect(0, 0, canvas.width, canvas.height - groundHeight);

    // pipes
    pipes.forEach(p=>{
        ctx.save();
        ctx.translate(p.x + p.width/2, p.top/2);
        ctx.scale(1,-1);
        ctx.drawImage(pipeImg, -p.width/2, -p.top/2, p.width, p.top);
        ctx.restore();

        ctx.drawImage(pipeImg, p.x, canvas.height - groundHeight - p.bottom, p.width, p.bottom);
    });

    // ground
    groundX = (groundX - 2) % canvas.width;
    ctx.drawImage(groundImg, groundX, canvas.height - groundHeight, canvas.width, groundHeight);
    ctx.drawImage(groundImg, groundX + canvas.width, canvas.height - groundHeight, canvas.width, groundHeight);

    // bird
    ctx.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

    // score
    ctx.fillStyle = "white";
    ctx.font = "32px Arial";
    ctx.fillText(score, canvas.width / 2 - 10, 50);
}

// SAVE SCORE
function saveScore(){
    if (!users[currentUser].scores) users[currentUser].scores = [];

    users[currentUser].scores.push(score);
    users[currentUser].scores.sort((a,b)=>b-a);
    users[currentUser].scores = users[currentUser].scores.slice(0,10);

    localStorage.setItem("users", JSON.stringify(users));
}

// LOOP
function loop(){
    if(gameOver){
        saveScore();
        overlayText.innerHTML = "Game Over<br>" + score;
        overlay.style.display = "flex";
        return;
    }

    frame++;
    update();
    draw();
    requestAnimationFrame(loop);
}

// RESET
function resetGame(){
    bird.y = 200;
    bird.velocity = 0;
    pipes = [];
    score = 0;
    gameOver = false;
    frame = 0;
}

// DRAW START SCREEN (ZONDER GAME LOOP)
function drawStartScreen() {
    // lucht
    ctx.fillStyle = "#70c5ce";
    ctx.fillRect(0, 0, canvas.width, canvas.height - groundHeight);

    // grond
    ctx.drawImage(groundImg, 0, canvas.height - groundHeight, canvas.width, groundHeight);

    // vogel stil
    ctx.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
}
