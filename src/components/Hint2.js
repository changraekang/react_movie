import React from "react";

const Hint2 = ({ number }) => {
  return (
    <div>
      <img
        src={`https://static.moviequizrae.fun/level2/${number}.jpg`}
        alt=""
        width={500}
        height={350}
      />
    </div>
  );
};

export default Hint2;
