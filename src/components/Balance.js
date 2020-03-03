import React from 'react';
import CreditsBeforeGame from '../img/Credits/Before-Game.svg';

function Balance(props) {
  return (
    <div className="credits-panel balance">
      <img
        src={CreditsBeforeGame}
        alt="credits"
      />
      <p>{props.balance}</p>
    </div>
  );
}

export default Balance;
