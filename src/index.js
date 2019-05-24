const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const paddleRed = {
  x: 50,
  y: 240,
  color: "red"
};

const paddleBlue = {
  x: 550,
  y: 240,
  color: "blue"
};

const ball = {
  x: 300,
  y: 240,
  velX: 10 * (Math.random() < 0.5 ? 1 : -1),
  velY: 10 * (Math.random() < 0.5 ? 1 : -1),
  color: "black"
};

const keys = {};
window.k = keys;
function update() {
  if (keys.w) {
    paddleRed.y -= 8;
  } else if (keys.s) {
    paddleRed.y += 8;
  }

  if (keys.arrowup) {
    paddleBlue.y -= 8;
  } else if (keys.arrowdown) {
    paddleBlue.y += 8;
  }

  ball.x += ball.velX;
  ball.y += ball.velY;

  if (ball.y <= 12 && ball.velY < 0) ball.velY *= -1;
  if (ball.y >= 462 && ball.velY > 0) ball.velY *= -1;

  if (ball.y > paddleRed.y - 75 && ball.y < paddleRed.y + 75) {
    if (ball.x <= 72 && ball.velX < 0) {
      ball.velX *= -1;
      ball.velY *= 1.1;
    }
  }
  if (ball.y > paddleBlue.y - 75 && ball.y < paddleBlue.y + 75) {
    if (ball.x >= 528 && ball.velX > 0) {
      ball.velX *= -1;
      ball.velY *= 1.1;
    }
  }

  ball.velY = Math.max(-10, Math.min(ball.velY, 10));

  if (ball.x < paddleRed.x) {
    alert("blue point!");
    window.location.reload();
  }

  if (ball.x > paddleBlue.x) {
    alert("blue point!");
    window.location.reload();
  }

  setTimeout(update, 1000 / 30);
}

function draw() {
  ctx.clearRect(0, 0, 600, 480);

  drawPaddle(paddleRed);
  drawPaddle(paddleBlue);

  drawBall(ball);

  requestAnimationFrame(draw);
}

function drawPaddle(paddle) {
  ctx.beginPath();
  ctx.fillStyle = paddle.color;
  ctx.rect(paddle.x - 10, paddle.y - 75, 20, 150);
  ctx.fill();
  ctx.closePath();
}

function drawBall(ball) {
  ctx.beginPath();
  ctx.fillStyle = ball.color;
  ctx.arc(ball.x, ball.y, 12, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();
}

update();
draw();

// ---- events

document.body.addEventListener("keydown", e => {
  keys[e.key.toLowerCase()] = true;
});

document.body.addEventListener("keyup", e => {
  keys[e.key.toLowerCase()] = false;
});
