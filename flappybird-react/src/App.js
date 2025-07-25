import React, { useState, useRef, useCallback } from "react";
import Bird from "./components/Bird";
import Obstacle from "./components/Obstacle";
import Ground from "./components/Ground";
import Sky from "./components/Sky";
import Borders from "./components/Borders";
import {
  GAME_WIDTH,
  GAME_HEIGHT,
  BIRD_START_LEFT,
  OBSTACLE_GAP,
} from "./components/GameConstants";
import useBird from "./hooks/useBird";
import useObstacles from "./hooks/useObstacles";
import useCollision from "./hooks/useCollision";
import "./App.css";

function App() {
  const [isGameOver, setIsGameOver] = useState(false);
  const [movingGround, setMovingGround] = useState(true);
  const [birdBottom, setBirdBottom] = useBird(isGameOver);
  const [birdLeft] = useState(BIRD_START_LEFT);
  const [obstacles, setObstacles] = useObstacles(isGameOver);
  const gameAreaRef = useRef();

  const handleGameOver = useCallback(() => {
    setIsGameOver(true);
    setMovingGround(false);
    setTimeout(() => {
      alert("Game Over!");
    }, 100);
  }, []);

  useCollision(birdLeft, birdBottom, obstacles, handleGameOver);

  return (
    <div style={{ position: "relative", width: GAME_WIDTH, height: GAME_HEIGHT, margin: "auto" }}>
      <Borders />
      <div className="game-container" ref={gameAreaRef}>
        <Sky>
          <Bird left={birdLeft} bottom={birdBottom} />
          {obstacles.map((ob) => (
            <React.Fragment key={ob.id}>
              <Obstacle left={ob.left} bottom={ob.bottom} isTop={false} />
              <Obstacle
                left={ob.left}
                bottom={ob.bottom + OBSTACLE_GAP}
                isTop={true}
              />
            </React.Fragment>
          ))}
        </Sky>
      </div>
      <div className="ground-container">
        <Ground moving={movingGround} />
      </div>
    </div>
  );
}

export default App;
