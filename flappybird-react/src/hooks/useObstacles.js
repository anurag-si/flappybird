import { useState, useEffect, useRef } from "react";
import { GAME_WIDTH, OBSTACLE_WIDTH, OBSTACLE_INTERVAL } from "../components/GameConstants";
import { generateObstacle } from "../utils/gameHelpers";
import Queue from "../utils/Queue";

export default function useObstacles(isGameOver) {
  const queueRef = useRef(new Queue());
  const [obstacles, setObstacles] = useState([]);
  const obstacleId = useRef(0);

  // Generate obstacles
  useEffect(() => {
    if (isGameOver) return;
    const addObstacle = () => {
      queueRef.current.enqueue(generateObstacle(obstacleId.current++, GAME_WIDTH));
      setObstacles(queueRef.current.toArray());
    };
    addObstacle();
    const interval = setInterval(addObstacle, OBSTACLE_INTERVAL);
    return () => clearInterval(interval);
  }, [isGameOver]);

  // Move obstacles
  useEffect(() => {
    if (isGameOver) return;
    const timer = setInterval(() => {
      const moved = queueRef.current.toArray().map((ob) => ({ ...ob, left: ob.left - 2 }));
      while (moved.length && moved[0].left <= -OBSTACLE_WIDTH) {
        queueRef.current.dequeue();
        moved.shift();
      }
      // Update queue with moved obstacles
      queueRef.current.items = moved;
      setObstacles(queueRef.current.toArray());
    }, 20);
    return () => clearInterval(timer);
  }, [isGameOver]);

  return [obstacles, setObstacles];
} 