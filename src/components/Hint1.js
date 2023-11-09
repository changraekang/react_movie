import React from "react";
import ReactAudioPlayer from "react-audio-player";

const Hint1 = ({ number }) => {
  return (
    <div>
      <ReactAudioPlayer
        src={`https://moviequiz-asset.s3.ap-southeast-2.amazonaws.com/moviequiz/level1/${number}.mp3`}
        autoPlay
        controls
      />
    </div>
  );
};

export default Hint1;
