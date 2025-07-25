import { useEffect } from "react";
import { detectCollision } from "../utils/gameHelpers";

export default function useCollision(birdLeft, birdBottom, obstacles, onGameOver) {
  useEffect(() => {
    if (detectCollision(birdLeft, birdBottom, obstacles)) {
      onGameOver();
    }
    
    // eslint-disable-next-line
  }, [birdLeft, birdBottom, obstacles, onGameOver]);
} 