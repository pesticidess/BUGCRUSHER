const canvas = document.getElementById('lightCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = {
  x: canvas.width / 2,
  y: canvas.height / 2
};

let light = {
  x: canvas.width / 2,
  y: canvas.height / 2
};

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

canvas.addEventListener('mousemove', (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

function lerp(start, end, amt) {
  return (1 - amt) * start + amt * end;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update the light position to move towards the mouse position
  light.x = lerp(light.x, mouse.x, 0.1);
  light.y = lerp(light.y, mouse.y, 0.1);

  // Draw the black overlay
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Create the light effect
  let gradient = ctx.createRadialGradient(light.x, light.y, 150, light.x, light.y, 0);
  gradient.addColorStop(1, 'rgba(0, 0, 0, 1)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');


  ctx.globalCompositeOperation = 'destination-out';
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(light.x, light.y, 100, 0, Math.PI * 2, false);
  ctx.fill();
  ctx.globalCompositeOperation = 'source-over';

  requestAnimationFrame(draw);
}

draw();