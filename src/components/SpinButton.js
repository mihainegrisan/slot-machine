import React from 'react';
import spinSoundFile from "../sound/spin-sound-1.wav";

function SpinningSound() {
  return (
    <audio preload="false" autoPlay>
      <source src={spinSoundFile} />
    </audio>
  );
}

function SpinButton(props) {
  let { src, onClick, onMouseEnter, onMouseLeave, onMouseDown, isSpinning } = props;
  let spinningSound = <SpinningSound />

  return (
    <div>
      {isSpinning ? spinningSound : null}
      <img
        alt="spin button"
        src={src}
        className="btn-spin"
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseDown={onMouseDown}
      />
    </div>
  );
}

export default SpinButton;
