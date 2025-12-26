let speed = 1500;
let timer;
let score = 0;
let lives = 3;
let gameEnded = true;

// Load high score
let highScore = localStorage.getItem("highScore");
highScore = highScore ? Number(highScore) : 0;

const scoreDisplay = document.getElementById("score");
const highScoreDisplay = document.getElementById("highScore");
const livesDisplay = document.getElementById("lives");
const gameOverText = document.getElementById("gameOver");
const startBtn = document.getElementById("startBtn");

const jumpscare = document.getElementById("jumpscare");
const jumpscareSound = document.getElementById("jumpscareSound");

// Show saved high score
highScoreDisplay.textContent = "High Score: " + highScore;

function randomPosition(element) {
    const size = 60;
    const maxX = window.innerWidth - size;
    const maxY = window.innerHeight - size;

    element.style.left = Math.random() * maxX + "px";
    element.style.top = Math.random() * maxY + "px";
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

function showJumpscare() {
    jumpscare.style.display = "block";
    jumpscareSound.play();

    setTimeout(() => {
        jumpscare.style.display = "none";
    }, 2000); // show for 2 seconds
}

function endGame() {
    gameEnded = true;
    gameOverText.style.display = "block";
    startBtn.style.display = "block";

    // Show jumpscare when game ends
    showJumpscare();
}

function createCircle() {
    if (gameEnded) return;

    const circle = document.createElement("div");
    circle.className = "circle";

    randomPosition(circle);
    document.body.appendChild(circle);

    // Click = score
    circle.addEventListener("click", () => {
        clearTimeout(timer);
        circle.remove();

        updateScore();

        if (speed > 300) {
            speed -= 100;
        }

        createCircle();
    });

    // Missed circle = lose life
    timer = setTimeout(() => {
        circle.remove();
        lives--;
        updateLives();

        if (lives <= 0) {
            endGame();
        } else {
            createCircle();
        }
    }, speed);
}

// Start button logic
startBtn.addEventListener("click", () => {
    score = 0;
    lives = 3;
    speed = 1500;
    gameEnded = false;

    scoreDisplay.textContent = "Score: 0";
    updateLives();

    gameOverText.style.display = "none";
    startBtn.style.display = "none";

    createCircle();
});
