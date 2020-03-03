import React from 'react';
import startSoundFile from "../../sound/start-sound.wav";

function StartSound() {
  return (
    <audio preload="false" autoPlay>
      <source src={startSoundFile} />
    </audio>
  );
}

export default StartSound;
