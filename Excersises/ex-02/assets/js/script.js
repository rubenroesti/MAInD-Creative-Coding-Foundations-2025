const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const scoreDisplay = document.getElementById('score-display');
const timerDisplay = document.getElementById('timer-display');

// splashPage
const splashPage = document.getElementById('splash-page');
const charOptions = document.querySelectorAll('.char-option');
const startGameBtn = document.getElementById('start-game-btn');
// end splashPage

class SnakePart{
  constructor(x, y){
    this.x = x;
    this.y = y;
  }
}

let speed = 7;

const tileCount = 15;
// tilesize 0 because recalculated and defined in resizeCanvas() for responsive
let tileSize = 0; 

let headX = 10;
let headY = 10;
const SnakeParts = [];
let tailLength = 2;

let appleX = 5;
let appleY = 5;

let xVelocity = 0;
let yVelocity = 0;

let score = 0;

const gulpSound = new Audio("assets/audio/eating.mp3");
const overSound = new Audio("assets/audio/mario.mp3");

let frameCount = 0;

let gameStarted = false;
let startTime = 0;
let currentTime = 0;
let timerInterval;

const headImage = new Image();
const bodyImage = new Image();
const appleImage = new Image();

let selectedHeadSrc = 'assets/images/head1.svg';
let selectedBodySrc = 'assets/images/body3.svg';

headImage.src = selectedHeadSrc;
bodyImage.src = selectedBodySrc;
appleImage.src = 'assets/images/apple.svg';


charOptions.forEach(option => {
    option.addEventListener('click', () => {
        charOptions.forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');

        selectedHeadSrc = option.getAttribute('data-head-src');
        selectedBodySrc = option.getAttribute('data-body-src');
    });
});

startGameBtn.addEventListener('click', () => {
    if (selectedHeadSrc && selectedBodySrc) {

        headImage.src = selectedHeadSrc;
        bodyImage.src = selectedBodySrc;

        let imagesLoaded = 0;
        const totalImages = 2;

        const checkLoadComplete = () => {
            imagesLoaded++;
            if (imagesLoaded === totalImages) {
                splashPage.classList.add('hidden'); 
                
                resizeCanvas();
            }
        };

        headImage.onload = checkLoadComplete;
        bodyImage.onload = checkLoadComplete;

    }
});

function resizeCanvas() {
  const ratio = window.devicePixelRatio || 1; 

  const displayWidth = canvas.clientWidth;
  const displayHeight = canvas.clientHeight;

  canvas.width = displayWidth * ratio;
  canvas.height = displayHeight * ratio;

  ctx.setTransform(1, 0, 0, 1, 0, 0);

  ctx.scale(ratio, ratio);

  tileSize = displayWidth / tileCount;

  ctx.imageSmoothingEnabled = false;

  // correction: call drawgame here and not at the end to allow canvas aspect ration to match! otherwise blurred content
  drawGame();
}

window.addEventListener('resize', resizeCanvas);
// resizeCanvas() is removed from here. It is called by the splash screen start button now.

function updateTimer() {
    if (gameStarted) {
        currentTime = Math.floor((Date.now() - startTime) / 1000);
    }

    const minutes = Math.floor(currentTime / 60);
    const seconds = currentTime % 60;

    const formattedTime = `Time: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    timerDisplay.textContent = formattedTime;
}

// game loop
function drawGame(){
  changeSnakePosition();
  let result = isGameOver();
  if(result){
    gameStarted = false;
    clearInterval(timerInterval);
    return;
  }

  clearScreen();

  drawGridPoints();

  checkAppleCollision();
  drawApple();
  drawSnake();

  updateScoreDisplay();

  if(score > 2){
    speed = 9;
  }
  if(score > 5){
    speed = 13;
  }
  if(score > 10){
    speed = 15;
  }

  setTimeout(drawGame, 1000/ speed)

}

function isGameOver(){
  let gameOver = false;

  if(yVelocity === 0 && xVelocity === 0){
    return false;
  }

  if(headX < 0){
    gameOver = true;
  }
  
  else if(headX >= tileCount){
    gameOver = true;
  }

  else if(headY < 0){
    gameOver = true;
  }

  else if(headY >= tileCount){
    gameOver = true;
  }

  for(let i =0; i < SnakeParts.length; i++){
    let part = SnakeParts[i];
    if(part.x === headX && part.y === headY){
      gameOver = true;
      break;
      }
  }

  if(gameOver) {
    ctx.fillStyle = 'white';
    ctx.font = '50px baikal';

    ctx.textAlign = 'center'; 

    // canvas center
    ctx.fillText("Game Over!", canvas.clientWidth / 2, canvas.clientHeight / 2); 
    
    ctx.font = '20px baikal';
    // canvas center
    ctx.fillText("Press Space to Restart", canvas.clientWidth / 2, canvas.clientHeight / 2 + 50);
    overSound.play();
  }

  return gameOver;

}

function resetGame() {
  headX = 10;
  headY = 10;
  SnakeParts.length = 0;
  tailLength = 2;
  appleX = 5;
  appleY = 5;
  xVelocity = 0;
  yVelocity = 0;
  score = 0;
  speed = 7;
  updateScoreDisplay();

  drawGame();
}

function updateScoreDisplay(){
  scoreDisplay.textContent = 'Score ' + score;
}

function clearScreen(){
  
ctx.fillStyle = '#a67c52';
ctx.fillRect(0,0,canvas.clientWidth, canvas.clientHeight);

} 

function drawGridPoints(){
  ctx.fillStyle = 'white';
  const dotSize = tileSize * 0.05;
  
  for(let x = 0; x < tileCount; x++){
    for(let y = 0; y < tileCount; y++){

      const centerX = (x * tileSize) + (tileSize / 2);
      const centerY = (y * tileSize) + (tileSize / 2);
      

      ctx.fillRect(centerX - (dotSize / 2), centerY - (dotSize / 2), dotSize, dotSize);
    }
  }
}

function drawSnake(){

  for(let i =0; i < SnakeParts.length; i++){
    let part = SnakeParts[i];
    ctx.drawImage(bodyImage, part.x * tileSize, part.y * tileSize, tileSize, tileSize);
  }

  SnakeParts.push(new SnakePart(headX, headY)); //add item at end of list next to head
  while(SnakeParts.length > tailLength){
    SnakeParts.shift(); //remove oldest item (further)
  }

  ctx.drawImage(headImage, headX * tileSize, headY * tileSize, tileSize, tileSize);

}

function drawApple(){
  ctx.drawImage(appleImage, appleX * tileSize, appleY * tileSize, tileSize, tileSize);
}

function checkAppleCollision(){
  if(appleX === headX && appleY === headY){
    appleX = Math.floor(Math.random() * tileCount);
    appleY = Math.floor(Math.random() * tileCount);
    tailLength++;
    score++;
    updateScoreDisplay();
    gulpSound.play()
  }
}

function changeSnakePosition(){
  headX = headX + xVelocity;
  headY = headY + yVelocity;
}

document.body.addEventListener('keydown', keyDown);

function keyDown(event){

    if (!splashPage.classList.contains('hidden')) {
        return;
    }

  //timer
if (!gameStarted && (event.keyCode >= 37 && event.keyCode <= 40)) {
    gameStarted = true;
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
  }

  //up
  if(event.keyCode == 38) {
      if(yVelocity == 1)
      return;
    yVelocity = -1;
    xVelocity = 0;
  }
// down
  if(event.keyCode == 40) {
      if(yVelocity == -1)
      return;
    yVelocity =  1;
    xVelocity = 0;
  }
  //left
  if(event.keyCode == 37) {
      if(xVelocity == 1)
      return;
    yVelocity =  0;
    xVelocity = -1;
  }
  //right
  if(event.keyCode == 39) {
      if(xVelocity == -1)
      return;
    yVelocity =  0;
    xVelocity = 1;
  }
  if(event.keyCode == 32) {
      if(isGameOver()) {
          resetGame();
      }
  }
}

updateTimer();