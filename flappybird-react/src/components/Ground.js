import React from "react";

const Ground = ({ moving }) => {
  
  return (
    <div className={moving ? "ground-moving" : "ground"}></div>
  );
};

export default Ground; 