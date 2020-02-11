console.log("Start");

const cvs = document.getElementById('breakOuts');
const ctx = cvs.getContext("2d");

// Color
ctx.fillStyle = "red";

// Rectangle
// ctx.fillRect(150, 200, 100, 50);

// Rectangle
/*function drawRectangle(x, y){
  ctx.fillStyle = "blue";
  ctx.fillRect(x, y, 50, 50);
}*/

/*drawRectangle(150, 200);
ctx.clearRect(0, 0, cvs.width, cvs.height);
drawRectangle(150, 250);
ctx.clearRect(0, 0, cvs.width, cvs.height);
drawRectangle(150, 300);
ctx.clearRect(0, 0, cvs.width, cvs.height);
drawRectangle(150, 350);*/

/*function loop(y){
  ctx.clearRect(0, 0, cvs.width, cvs.height);
  drawRectangle(150, y);
  y +=50;
  requestAnimationFrame(loop);
}*/

//loop(0);


let LIFE = 3; // Player has 3 lives
// Image
const BG_IMG = new Image();
BG_IMG.src = "img/BG_IMG.jpg";

// Paddle
const PADDLE_WIDTH = 100;
const PADDLE_HEIGHT = 20;
const PADDLE_MARGIN_BOTTOM = 50;

const paddle = {
  x : cvs.width/2 - PADDLE_WIDTH/2,
  y : cvs.height - PADDLE_HEIGHT - PADDLE_MARGIN_BOTTOM,
  width : PADDLE_WIDTH,
  height : PADDLE_HEIGHT,
  dx : 5
}

// Ball
const BALL_RADIUS = 8;

const ball = {
  x : cvs.width/2,
  y : paddle.y - BALL_RADIUS,
  radius : BALL_RADIUS,
  speed : 5,
  dx : 3,
  dy : -3
}

// Move Paddle
let leftArrow = false;
let rightArrow = false;
document.addEventListener("keydown", function(event){
  // left
  if(event.keyCode == 37){
    leftArrow = true;
  }
  // right
  else if(event.keyCode == 39){
    rightArrow = true;
  }
});
document.addEventListener("keyup", function(event){
  // left
  if(event.keyCode == 37){
    leftArrow = false;
  }
  // right
  else if(event.keyCode == 39){
    rightArrow = false;
  }
});

// Show all
function loop(){
  // clear the canvas
  ctx.drawImage(BG_IMG, 0, 0);
  draw();
  update();
  console.log("Speed: " + ball.speed);
  requestAnimationFrame(loop);
}

loop();

function draw(){
  drawPaddle();
  drawBall();
}

function update(){
  movePaddle();
  moveBall();
  ballWallCollision();
  ballPaddleCollision();
}

// Paddle
function drawPaddle(){
  ctx.fillStyle = "#2e3548";
  ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
  ctx.strokeStyle = "#ffcd05";
  ctx.strokeRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

function movePaddle(){
  if(rightArrow && paddle.x + paddle.width < cvs.width){
    paddle.x += paddle.dx;
  }
  else if(leftArrow && paddle.x > 0){
    paddle.x -= paddle.dx;
  }
}

// Ball
function drawBall(){
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
  ctx.fillStyle = "#ffcd05";
  ctx.fill();
  ctx.strokeStyle = "#2e3548";
  ctx.stroke();

  ctx.closePath();
}

function moveBall(){
  ball.x += ball.dx;
  ball.y += ball.dy;
}

function ballWallCollision(){
  if(ball.x + ball.radius > cvs.width || ball.x - ball.radius < 0){
    ball.dx = -ball.dx;
  }
  if(ball.y - ball.radius < 0){
    ball.dy = - ball.dy;
  }
  if(ball.y + ball.radius > cvs.height){
    LIFE--;
    resetBall();
  }
}

function resetBall(){
  ball.x = cvs.width/2;
  ball.y = paddle.y - BALL_RADIUS;
  ball.dx = 3 * (Math.random() * 2 - 1);
  ball.dy = -3;
} // min 26:15

// Collision
function ballPaddleCollision(){
  if(ball.y + ball.radius > paddle.y && ball.y + ball.radius < paddle.y + paddle.height
    && ball.x > paddle.x && ball.x < paddle.x + paddle.width){
      let collidePoint = ball.x - (paddle.x + paddle.width/2); 
      collidePoint = collidePoint / (paddle.width/2);
      let angle = collidePoint * (Math.PI/3);
      ball.dx = ball.speed * Math.sin(angle);
      ball.dy = - ball.speed * Math.cos(angle);
  }
}

// console.log("paddle.x + paddle.width :" + (paddle.x + paddle.width));
// console.log("paddle.x :" + paddle.x);
// console.log("paddle.y :" + paddle.y);
// console.log("paddle.width :" + paddle.width);
// console.log("paddle.height :" + paddle.height);
// console.log("ball.x :" + ball.x);
// console.log("ball.y :" + ball.y);
// console.log("Math: " + (3 * (Math.random() * 2 - 1)));
// console.log("collidePoint: " + (ball.x - (paddle.x + paddle.width/2)));
