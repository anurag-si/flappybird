window.onload = function () {
  const flappyBird = document.querySelector(".bird");
  const gameArea = document.querySelector(".game-container");
  const movingGround = document.querySelector(".ground-moving");

  let birdLeftPosition = 220;
  let birdBottomPosition = 100;
  let gravityForce = 3;
  let isGameOver = false;
  let obstacleGap = 430;

  function initiateGame() {
    birdBottomPosition -= gravityForce;
    flappyBird.style.bottom = birdBottomPosition + "px";
    flappyBird.style.left = birdLeftPosition + "px";
  }

  let gameTimerId = setInterval(initiateGame, 20);

  function handleKeyPress(event) {
    if (event.keyCode === 32) {
      jump();
    }
  }

  function jump() {
    if (birdBottomPosition < 500) birdBottomPosition += 50;
    flappyBird.style.bottom = birdBottomPosition + "px";
    console.log(birdBottomPosition);
  }

  document.addEventListener("keyup", handleKeyPress);

  function generateObstacle() {
    let obstacleLeftPosition = 500;
    let randomHeight = Math.random() * 60;
    let obstacleBottomPosition = randomHeight;
    const obstacleElement = document.createElement("div");
    const topObstacleElement = document.createElement("div");

    if (!isGameOver) {
      obstacleElement.classList.add("obstacle");
      topObstacleElement.classList.add("topObstacle");
    }

    gameArea.appendChild(obstacleElement);
    gameArea.appendChild(topObstacleElement);

    obstacleElement.style.left = obstacleLeftPosition + "px";
    topObstacleElement.style.left = obstacleLeftPosition + "px";
    obstacleElement.style.bottom = obstacleBottomPosition + "px";
    topObstacleElement.style.bottom =
      obstacleBottomPosition + obstacleGap + "px";

    function moveObstacle() {
      obstacleLeftPosition -= 2;
      obstacleElement.style.left = obstacleLeftPosition + "px";
      topObstacleElement.style.left = obstacleLeftPosition + "px";

      if (obstacleLeftPosition === -60) {
        clearInterval(timerId);
        gameArea.removeChild(obstacleElement);
        gameArea.removeChild(topObstacleElement);
      }

      if (
        (obstacleLeftPosition > 200 &&
          obstacleLeftPosition < 280 &&
          birdLeftPosition === 220 &&
          (birdBottomPosition < obstacleBottomPosition + 153 ||
            birdBottomPosition > obstacleBottomPosition + obstacleGap - 200)) ||
        birdBottomPosition === 0
      ) {
        gameOver();
        clearInterval(timerId);
      }
    }
    let timerId = setInterval(moveObstacle, 20);

    if (!isGameOver) setTimeout(generateObstacle, 3000);
  }

  generateObstacle();

  function gameOver() {
    clearInterval(gameTimerId);
    alert("Game Over!");
    isGameOver = true;
    document.removeEventListener("keyup", handleKeyPress);
    movingGround.classList.add("ground");
    movingGround.classList.remove("ground-moving");
  }
};
