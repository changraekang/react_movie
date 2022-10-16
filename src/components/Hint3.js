import React from "react";

const Hint3 = ({ number }) => {
  return (
    <div>
      <img
        src={`https://static.moviequizrae.fun/level3/${number}.jpg`}
        alt=""
        width={350}
        height={500}
      />
    </div>
  );
};

export default Hint3;
