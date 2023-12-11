const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let playerX = 50;
let playerY = canvas.height / 2;
const playerWidth = 100;
const playerHeight = 10;
const playerSpeed = 5;

const humanX = canvas.width - 100;
const humanY = canvas.height / 2 - 50;
const humanWidth = 50;
const humanHeight = 100;

let showCircle = false;

document.addEventListener('keydown', movePlayer);

function movePlayer(event) {
  switch (event.key) {
    case 'ArrowRight':
      playerX += playerSpeed;
      break;
    case 'ArrowLeft':
      playerX -= playerSpeed;
      break;
    case 'ArrowUp':
      playerY -= playerSpeed;
      break;
    case 'ArrowDown':
      playerY += playerSpeed;
      break;
  }
  
  checkOverlap();
  draw();
}

function checkOverlap() {
  if (
    playerX < humanX + humanWidth &&
    playerX + playerWidth > humanX &&
    playerY < humanY + humanHeight &&
    playerY + playerHeight > humanY
  ) {
    showCircle = true;
  } else {
    showCircle = false;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'grey';
  ctx.fillRect(playerX, playerY, playerWidth, playerHeight);

  ctx.fillStyle = 'black';
  ctx.beginPath();
  ctx.arc(humanX + humanWidth / 2, humanY + 20, 20, 0, Math.PI * 2);
  ctx.moveTo(humanX + humanWidth / 2, humanY + 40);
  ctx.lineTo(humanX + humanWidth / 2, humanY + 80);
  ctx.moveTo(humanX + humanWidth / 2, humanY + 80);
  ctx.lineTo(humanX + humanWidth / 2 - 20, humanY + 120);
  ctx.moveTo(humanX + humanWidth / 2, humanY + 80);
  ctx.lineTo(humanX + humanWidth / 2 + 20, humanY + 120);
  ctx.moveTo(humanX + humanWidth / 2, humanY + 50);
  ctx.lineTo(humanX + humanWidth / 2 - 20, humanY + 30);
  ctx.moveTo(humanX + humanWidth / 2, humanY + 50);
  ctx.lineTo(humanX + humanWidth / 2 + 20, humanY + 30);
  ctx.stroke();

  if (showCircle) {
    ctx.beginPath();
    ctx.arc(humanX + humanWidth / 2, playerY, 30, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();
  }

  if (showCircle) {
    ctx.font = '20px Arial';
    ctx.fillStyle = 'red';
    ctx.fillText('Nice. You stabbed Fordy!', canvas.width / 2 - 150, canvas.height / 2 + 50);
  }
}

draw();
