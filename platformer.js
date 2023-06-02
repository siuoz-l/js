// Define canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Set Canvas Size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Define player properties
let player = {
  x: 50,
  y: 50,
  width: 50,
  height: 50,
  speed: 5,
  velX: 0,
  velY: 0,
  jumping: false
};

// Key press event listener
let keys = [];
document.addEventListener("keydown", function(e) {
  keys[e.keyCode] = true;
});

document.addEventListener("keyup", function(e) {
  keys[e.keyCode] = false;
});

// Move player function
function movePlayer() {
  if (keys[37]) { // Left Arrow
    player.velX = -player.speed;
  } else if (keys[39]) { // Right Arrow
    player.velX = player.speed;
  } else {
    player.velX = 0;
  }

  if (keys[38]) { // Up Arrow
    if (!player.jumping) {
      player.jumping = true;
      player.velY = -player.speed * 2;
    }
  }

  player.velY += 1.5; // Gravity
  player.x += player.velX;
  player.y += player.velY;

  // Prevent player from going out of screen
  if (player.x >= canvas.width - player.width) {
    player.x = canvas.width - player.width;
  } else if (player.x <= 0) {
    player.x = 0;
  }

  if (player.y >= canvas.height - player.height) {
    player.y = canvas.height - player.height;
    player.jumping = false;
  }
}

// Render function
function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "blue";
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Game loop
function gameLoop() {
  movePlayer();
  render();
  requestAnimationFrame(gameLoop);
}

// Start game loop
gameLoop();
