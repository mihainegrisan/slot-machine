import React from 'react';

function Panel(props) {
  return (
    <div className="credits-panel">
      <img
        src={props.srcCredits}
        alt="credits background"
        className="bg-credits"
      />
      <input
        style={{opacity: props.gameStarted ? '0.4' : '1'}}
        value={props.bet}
        onChange={props.onChange}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
      />
      <p
        style={{color: props.isWinner ? '#00ff21' : 'red'}}
        className="display-result"
      >
        {props.isWinner ? 'WON' : 'LOST'}
      </p>
      <img
        src={props.srcStartBtn}
        alt="start button"
        className="btn-start"
        onClick={props.onClick}
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
        onMouseDown={props.onMouseDown}
      />
    </div>
  );
}

export default Panel;
