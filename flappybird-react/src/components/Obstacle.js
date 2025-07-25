import React from "react";

const Obstacle = ({ left, bottom, isTop }) => {
  return (
    <div
      className={isTop ? "topObstacle" : "obstacle"}
      style={{ left: `${left}px`, bottom: `${bottom}px` }}
    ></div>
  );
};

export default Obstacle; 