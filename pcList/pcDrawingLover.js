let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let isDrawing = false;
let eraserActivated = false;

canvas.addEventListener('touchstart', startDraw);
canvas.addEventListener('touchmove', draw);
canvas.addEventListener('touchend', stopDraw);

function startDraw(event) {
  isDrawing = true;
  let x = event.touches[0].clientX - canvas.offsetLeft;
  let y = event.touches[0].clientY - canvas.offsetTop;
  ctx.beginPath();
  ctx.moveTo(x, y);
}

function draw(event) {
  if (isDrawing) {
    let x = event.touches[0].clientX - canvas.offsetLeft;
    let y = event.touches[0].clientY - canvas.offsetTop;
    if (eraserActivated) {
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 10;
    } else {
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 2;
    }
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function stopDraw(event) {
  isDrawing = false;
}

function activateEraser() {
  eraserActivated = !eraserActivated;
}
