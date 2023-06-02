// Get the canvas element and context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Set up the player object
const player = {
  x: 50,
  y: 50,
  width: 50,
  height: 50,
  speed: 7,
  velX: 0,
  velY: 0,
  jumping: false
};

// Set up the keyboard controls for desktop
const keys = {
  left: false,
  right: false,
  up: false
};

document.addEventListener("keydown", function(event) {
  switch (event.keyCode) {
    case 37:
      keys.left = true;
      break;
    case 38:
      keys.up = true;
      break;
    case 39:
      keys.right = true;
      break;
  }
});

document.addEventListener("keyup", function(event) {
  switch (event.keyCode) {
    case 37:
      keys.left = false;
      break;
    case 38:
      keys.up = false;
      break;
    case 39:
      keys.right = false;
      break;
  }
});

// Set up touch controls for mobile
let touchX, touchY;
document.addEventListener("touchstart", function(event) {
  touchX = event.touches[0].clientX;
  touchY = event.touches[0].clientY;
});

document.addEventListener("touchmove", function(event) {
  event.preventDefault();
  const newTouchX = event.touches[0].clientX;
  const newTouchY = event.touches[0].clientY;

  if (newTouchX < touchX) {
    keys.left = true;
    keys.right = false;
  } else if (newTouchX > touchX) {
    keys.right = true;
    keys.left = false;
  }

  touchX = newTouchX;
  touchY = newTouchY;
});

document.addEventListener("touchend", function(event) {
  keys.left = false;
  keys.right = false;
});

// Set up the game loop
function gameLoop() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Move the player based on keyboard input or touch input
  if (keys.left) {
    player.velX = -player.speed;
  } else if (keys.right) {
    player.velX = player.speed;
  } else {
    player.velX = 0;
  }

  if (keys.up && !player.jumping) {
    player.velY = -player.speed * 2;
    player.jumping = true;
  }

  // Apply gravity to the player
  player.velY += 1.5;
  player.x += player.velX;
  player.y += player.velY;

  // Check for collisions with the floor
  if (player.y + player.height > canvas.height) {
    player.jumping = false;
    player.y = canvas.height - player.height;
    player.velY = 0;
  }

  // Draw the player
  ctx.fillStyle = "red";
  ctx.fillRect(player.x, player.y, player.width, player.height);

  // Call the game loop again
  requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
