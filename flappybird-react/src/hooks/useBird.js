import { useState, useEffect } from "react";
import { BIRD_START_BOTTOM, GRAVITY, JUMP_HEIGHT, GAME_HEIGHT } from "../components/GameConstants";

export default function useBird(isGameOver) {
  const [birdBottom, setBirdBottom] = useState(BIRD_START_BOTTOM);

  // Gravity
  useEffect(() => {
    if (!isGameOver) {
      const timer = setInterval(() => {
        setBirdBottom((prev) => Math.max(prev - GRAVITY, 0));
      }, 20);
      return () => clearInterval(timer);
    }
  }, [isGameOver]);

  // Jump
  useEffect(() => {
    const handleKeyUp = (e) => {
      if (e.keyCode === 32 && !isGameOver) {
        setBirdBottom((prev) => Math.min(prev + JUMP_HEIGHT, GAME_HEIGHT - 230));
      }
    };
    window.addEventListener("keyup", handleKeyUp);
    return () => window.removeEventListener("keyup", handleKeyUp);
  }, [isGameOver]);

  return [birdBottom, setBirdBottom];
} 