const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let fordyDead = 0;
let playerX = 50;
let playerY = canvas.height / 2;
const playerWidth = 100;
const playerHeight = 10;
const playerSpeed = 5;

const humanX = canvas.width - 100;
const humanY = canvas.height / 2 - 50;
const humanWidth = 50;
const humanHeight = 100;

const redCircles = []; // Array to store red circles

let canOverlap = true; // Flag to allow overlap detection

document.addEventListener('keydown', movePlayer);

// Add touch event listeners for mobile drag and drop
let isDragging = false;
let touchStartX, touchStartY;

canvas.addEventListener('touchstart', handleTouchStart);
canvas.addEventListener('touchmove', handleTouchMove);
canvas.addEventListener('touchend', handleTouchEnd);

function handleTouchStart(event) {
  isDragging = true;
  touchStartX = event.touches[0].clientX - canvas.getBoundingClientRect().left;
  touchStartY = event.touches[0].clientY - canvas.getBoundingClientRect().top;
}

function handleTouchMove(event) {
  if (!isDragging) return;

  event.preventDefault();

  let touchX = event.touches[0].clientX - canvas.getBoundingClientRect().left;
  let touchY = event.touches[0].clientY - canvas.getBoundingClientRect().top;

  let deltaX = touchX - touchStartX;
  let deltaY = touchY - touchStartY;

  let newX = playerX + deltaX;
  let newY = playerY + deltaY;

  if (!checkCollision(newX, newY)) {
    playerX = newX;
    playerY = newY;
    draw();
  }

  touchStartX = touchX;
  touchStartY = touchY;
}

function handleTouchEnd() {
  isDragging = false;
}



function movePlayer(event) {
  let newX = playerX;
  let newY = playerY;

  switch (event.key) {
    case 'ArrowRight':
      newX += playerSpeed;
      break;
    case 'ArrowLeft':
      newX -= playerSpeed;
      break;
    case 'ArrowUp':
      newY -= playerSpeed;
      break;
    case 'ArrowDown':
      newY += playerSpeed;
      break;
  }

  // Check if the new position would cause an overlap
  if (!checkCollision(newX, newY)) {
    playerX = newX;
    playerY = newY;
    draw();
  }
}

function checkCollision(x, y) {
  if (
    x < humanX + humanWidth &&
    x + playerWidth > humanX &&
    y < humanY + humanHeight &&
    y + playerHeight > humanY &&
    canOverlap
  ) {
    createRedCircle(playerY + playerHeight / 2);
    canOverlap = false; // Prevent further overlap until under-overlap
    return true; // Collision detected
  } else if (!canOverlap && !(
    x < humanX + humanWidth &&
    x + playerWidth > humanX &&
    y < humanY + humanHeight &&
    y + playerHeight > humanY
  )) {
    canOverlap = true; // Allow overlap detection after under-overlap
  }
  return false; // No collision detected
}

function createRedCircle(y) {
  redCircles.push({ x: humanX + humanWidth / 2, y: y, radius: 10 });
  fordyDead = 1;
  ctx.beginPath();
  ctx.arc(humanX + humanWidth / 2, y, 10, 0, Math.PI * 2);
  ctx.fillStyle = 'red';
  ctx.fill();
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

  // Draw red circles
  ctx.fillStyle = 'red';
  redCircles.forEach(circle => {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
    ctx.fill();
  });

  if (fordyDead == 1) {
    ctx.font = '20px Arial';
    ctx.fillStyle = 'red';
    ctx.fillText('Nice. You stabbed Fordy!', canvas.width / 2 - 150, canvas.height / 2 + 50);
  }
}

draw();
