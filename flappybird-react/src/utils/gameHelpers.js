// gameHelpers.js
import { OBSTACLE_WIDTH, OBSTACLE_GAP } from "../components/GameConstants";

export function detectCollision(birdLeft, birdBottom, obstacles) {
  for (const ob of obstacles) {
    if (
      ob.left > birdLeft - OBSTACLE_WIDTH &&
      ob.left < birdLeft + OBSTACLE_WIDTH
    ) {
      if (
        birdBottom < ob.bottom + 153 ||
        birdBottom > ob.bottom + OBSTACLE_GAP - 200
      ) {
        return true;
      }
    }
  }
  return birdBottom === 0;
}

export function generateObstacle(id, gameWidth) {
  const randomHeight = Math.random() * 60;
  return {
    left: gameWidth,
    bottom: randomHeight,
    id,
  };
} 