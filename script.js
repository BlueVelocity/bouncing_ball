function createBall(ballSize) {
  const ball = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  ball.setAttribute("width", ballSize * 2 + 1);
  ball.setAttribute("height", ballSize * 2 + 1);
  ball.setAttribute("id", "circle");
  ball.setAttribute("overflow", "visible");

  const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  circle.setAttribute("cx", "50%");
  circle.setAttribute("cy", "50%");
  circle.setAttribute("r", `${ballSize}`);
  circle.setAttribute("fill", "purple");

  const scoreCounter = document.createElementNS("http://www.w3.org/2000/svg", "text");
  scoreCounter.setAttribute("x", "30%");
  scoreCounter.setAttribute("y", "55%");
  scoreCounter.setAttribute("r", `${ballSize}`);
  scoreCounter.setAttribute("fill", "red");
  scoreCounter.setAttribute("overflow", "visible");

  ball.appendChild(circle);
  ball.appendChild(scoreCounter);
  return ball;
}

function moveBall(element, ballSize) {
  const ball = createBall(ballSize);

  element.appendChild(ball);
  const container = element;

  const maxX = parseInt(container.offsetWidth, 0);
  const maxY = parseInt(container.offsetHeight, 0);

  const offsetAmount = Number(ball.firstElementChild.getAttribute('r')) * 2;
  let x = Math.random() * ((maxX - offsetAmount) - 1) + 1;
  let y = Math.random() * ((maxY - offsetAmount) - 1) + 1;

  let xVector = parseFloat((Math.random()).toFixed(2))
  let yVector = parseFloat((Math.random()).toFixed(2))

  let score = 0;
  let maxScore = 1000;

  function startMovement() {
    const currentMovement = setInterval(() => {
      x = parseFloat((x + xVector).toFixed(2));
      y = parseFloat((y + yVector).toFixed(2));

      const boundingWidth = parseInt(container.offsetWidth, 0);
      const boundingHeight = parseInt(container.offsetHeight, 0);

      if (ball.matches(":hover")) {
        score++;
        ball.lastElementChild.textContent = Math.round(score / maxScore * 100) + '%';

        if (score >= maxScore) {
          clearInterval(currentMovement);
          ball.firstElementChild.setAttribute("fill", "blue");
        }
      }

      if (x >= boundingWidth - offsetAmount || x <= 0) {
        clearInterval(currentMovement);
        xVector = xVector - xVector * 2;
        x = x <= 0 ? 1 : boundingWidth - offsetAmount - 1;
        startMovement();
      }

      // Bugs if you use an 'else if' statement here and the ball perfectly hits a corner
      if (y >= boundingHeight - offsetAmount || y <= 0) {
        clearInterval(currentMovement);
        yVector = yVector - yVector * 2;
        y = y <= 0 ? 1 : boundingHeight - offsetAmount - 1;
        startMovement();
      }

      ball.setAttribute("style", `left: ${Math.round(x)}px; bottom: ${Math.round(y)}px`)
    }, 2)
  }

  startMovement();
}

const container = document.querySelector(".container");
for (let i = 0; i < 10; i++) moveBall(container, i < 5 ? 20 : 40);
