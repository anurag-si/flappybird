import React from "react";

const Bird = ({ left, bottom }) => {

  
  return (
    <div
      className="bird"
      style={{ left: `${left}px`, bottom: `${bottom}px` }}
    ></div>
  );
};

export default Bird; 