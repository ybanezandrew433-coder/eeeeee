let speed = 1500;
let timer;
let score = 0;
let lives = 3;
let gameEnded = true;

// High score
let highScore = localStorage.getItem("highScore");
highScore = highScore ? Number(highScore) : 0;

const scoreDisplay = document.getElementById("score");
const highScoreDisplay = document.getElementById("highScore");
const livesDisplay = document.getElementById("lives");
const gameOverText = document.getElementById("gameOver");
const startBtn = document.getElementById("startBtn");

const jumpscareVideo = document.getElementById("jumpscareVideo");
const jumpscareSound = document.getElementById("jumpscareSound");
const flash = document.getElementById("flash");
const bgMusic = document.getElementById("bgMusic");

highScoreDisplay.textContent = "High Score: " + highScore;

function randomPosition(element) {
    const size = 60;
    element.style.left = Math.random() * (window.innerWidth - size) + "px";
    element.style.top = Math.random() * (window.innerHeight - size) + "px";
}

function updateScore() {
    score++;
    scoreDisplay.textContent = "Score: " + score;
    if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);
        highScoreDisplay.textContent = "High Score: " + highScore;
    }
}

function updateLives() {
    livesDisplay.textContent = "Lives: " + lives;
}

// Screen shake
function screenShake(duration = 500, magnitude = 20) {
    const start = Date.now();
    function shake() {
        if (Date.now() - start < duration) {
            document.body.style.transform =
                `translate(${(Math.random() - 0.5) * magnitude}px, ${(Math.random() - 0.5) * magnitude}px)`;
            requestAnimationFrame(shake);
        } else {
            document.body.style.transform = "translate(0,0)";
        }
    }
    shake();
}

// Lightning flicker
function lightningFlicker(duration = 500) {
    flash.style.display = "block";
    let flicker = setInterval(() => {
        flash.style.opacity = Math.random();
    }, 50);

    setTimeout(() => {
        clearInterval(flicker);
        flash.style.display = "none";
    }, duration);
}

// Game over jumpscare
function showJumpscare() {
    bgMusic.pause(); // stop background music

    screenShake(1000, 25);
    lightningFlicker(1000);

    jumpscareVideo.style.display = "block";
    jumpscareVideo.currentTime = 0;
    jumpscareVideo.play();
    jumpscareSound.play();

    jumpscareVideo.onended = () => {
        jumpscareVideo.style.display = "none";
    };
}

function endGame() {
    gameEnded = true;
    gameOverText.style.display = "block";
    startBtn.style.display = "block";
    showJumpscare();
}

function createCircle() {
    if (gameEnded) return;

    const circle = document.createElement("div");
    circle.className = "circle";
    randomPosition(circle);
    document.body.appendChild(circle);

    circle.addEventListener("click", () => {
        clearTimeout(timer);
        circle.remove();
        updateScore();
        if (speed > 300) speed -= 100;
        createCircle();
    });

    timer = setTimeout(() => {
        circle.remove();
        lives--;
        updateLives();
        if (lives <= 0) endGame();
        else createCircle();
    }, speed);
}

// START BUTTON
startBtn.addEventListener("click", () => {
    score = 0;
    lives = 3;
    speed = 1500;
    gameEnded = false;

    scoreDisplay.textContent = "Score: 0";
    updateLives();

    gameOverText.style.display = "none";
    startBtn.style.display = "none";

    bgMusic.currentTime = 0;
    bgMusic.play(); // start looping music

    createCircle();
});





