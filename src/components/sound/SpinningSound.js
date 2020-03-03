import React from 'react';
import spinSoundFile from "../../sound/spin-sound.wav";

function SpinningSound() {
  return (
    <audio preload="false" autoPlay>
      <source src={spinSoundFile} />
    </audio>
  );
}

export default SpinningSound;
