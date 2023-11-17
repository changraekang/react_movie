import React from "react";
import ReactAudioPlayer from "react-audio-player";
import config from "../config";
const Hint1 = ({ number , isLoading }) => {
  return (
    <div>
      <ReactAudioPlayer
        src={`${config.assetsUrl}/level1/${number}.mp3`}
        autoPlay
        controls
      />
    </div>
  );
};

export default Hint1;
