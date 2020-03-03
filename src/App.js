import React, { Component } from 'react';
import StartBtn from './img/StartButton/Normal.svg';
import StartBtnHover from './img/StartButton/Hover.svg';
import StartBtnFocused from './img/StartButton/Focused.svg';
import StartBtnDisabled from './img/StartButton/Disabled.svg';
import SpinBtn from './img/SpinButton/Normal.svg';
import SpinBtnHover from './img/SpinButton/Hover.svg';
import SpinBtnFocused from './img/SpinButton/Focused.svg';
import SpinBtnDisabled from './img/SpinButton/Disabled.svg';
import CreditsBeforeGame from './img/Credits/Before-Game.svg';
import CreditsBeforeGameFocused from './img/Credits/Focused.svg';
import './App.scss';

// Components
import Panel from './components/Panel';
import SpinButton from './components/SpinButton';
import Balance from './components/Balance';
import Spinner from './components/Spinner';

// Sound
import WinningSound from './components/sound/WinningSound.js';
import StartSound from './components/sound/StartSound.js';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isWinner: false,
      balance: 1000,
      bet: 100,
      gameStarted: false,
      isSpinning: false,
      startBtnSrc: StartBtn,
      spinBtnSrc: SpinBtnDisabled,
      creditsSrc: CreditsBeforeGame,
    };
    this.handleSpin = this.handleSpin.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.finishHandler = this.finishHandler.bind(this);
  };

  static matches = [];
  static winBetMultiplier = 25;

  blinkDisplayTimeout() {
    const displayResultElement = document.querySelector('.display-result');
    displayResultElement.classList.add('display-on');
    setTimeout( () => {
      displayResultElement.classList.remove('display-on');
    }, 400);
  }

  displayResult(count) {
    let i = 0;

    let blink_interval = setInterval( () => {
      this.blinkDisplayTimeout();
      i++;
      if(i === count) {
        clearInterval(blink_interval);
      }
    }, 800);
  }

  finishHandler(value) {
    App.matches.push(value);
    if (App.matches.length === 3) {
      const first = App.matches[0];
      let results = App.matches.every(match => match === first)

      if (results) {
        this.setState({
          isWinner: results,
          isSpinning: false,
          balance: this.state.balance + this.state.bet * App.winBetMultiplier
        });
      } else {
        this.setState({
          isWinner: results,
          isSpinning: false
        });
      }
      console.log(App.matches);
      this.displayResult(2);
    }
  }

  resetGame() {
    this.setState({
      isWinner: false,
      balance: 1000,
      bet: 100,
      gameStarted: false,
      startBtnSrc: StartBtn,
      spinBtnSrc: SpinBtnDisabled,
      creditsSrc: CreditsBeforeGame,
    });
  }

  handleSpin() {
    let { gameStarted, balance, bet } = this.state;
    if (gameStarted) {
      if (bet <= balance) {
        this.setState({
          isWinner: false,
          balance: balance - bet,
          isSpinning: true,
          spinBtnSrc: SpinBtn,
        });
        App.matches = [];
        this._child1.spin();
        this._child2.spin();
        this._child3.spin();
      } else {
        this.resetGame();
      }
    }
  }

  handleStart() {
    let { gameStarted, balance, bet } = this.state;
    if (!gameStarted) {
      if (bet <= 0 || bet > balance) {
        this.setState({ startBtnSrc: StartBtn });
      } else {
        this.setState({
          gameStarted: !gameStarted,
          startBtnSrc: StartBtnDisabled,
          spinBtnSrc: SpinBtn,
        });
      }
    }
  }

  handleInputChange(e) {
    const filteredInput = e.target.value.replace(/[^0-9]/g, '');
    if (!this.state.gameStarted &&
      filteredInput.length >= 0 &&
      filteredInput.length < 5) {
        this.setState({ bet: filteredInput });
    }
  }

  // Button states
  handleMouseEnterStartBtn() {
    if (!this.state.gameStarted) {
      this.setState({
        startBtnSrc: StartBtnHover,
      });
    }
  }
  handleMouseLeaveStartBtn() {
    if (!this.state.gameStarted) {
      this.setState({
        startBtnSrc: StartBtn,
        creditsSrc: CreditsBeforeGame,
      });
    }
  }
  handleFocusStartBtn() {
    if (!this.state.gameStarted) {
      this.setState({
        startBtnSrc: StartBtnFocused,
      });
    }
  }
  handleFocusCredits() {
    if (!this.state.gameStarted) {
      this.setState({
        creditsSrc: CreditsBeforeGameFocused,
      });
    }
  }
  handleMouseEnterSpinBtn() {
    if (this.state.gameStarted) {
      this.setState({
        spinBtnSrc: SpinBtnHover,
      });
    }
  }
  handleMouseLeaveSpinBtn() {
    if (this.state.gameStarted) {
      this.setState({
        spinBtnSrc: SpinBtn,
      });
    }
  }
  handleFocusSpinBtn() {
    if (this.state.gameStarted) {
      this.setState({
        spinBtnSrc: SpinBtnFocused,
      });
    }
  }

  render() {
    const { isWinner, gameStarted, bet, balance, isSpinning, startBtnSrc, spinBtnSrc, creditsSrc } = this.state;

    return (
    <div className="App">
      {isWinner ? <WinningSound /> : null}
      {gameStarted ? <StartSound /> : null}

      <h1>Slot Machine</h1>

      <div className="game-and-panel-wrapper">

        <div className="game">
          <Balance balance={balance}/>

          <div className="slots-wrapper">
            <div className="slots-container">
              <Spinner onFinish={this.finishHandler} ref={child => { this._child1 = child; }} timer="1500" />
              <Spinner onFinish={this.finishHandler} ref={child => { this._child2 = child; }} timer="1900" />
              <Spinner onFinish={this.finishHandler} ref={child => { this._child3 = child; }} timer="2500" />
              <div className="gradient-fade"></div>
            </div>
          </div>
        </div>

        <div className="panel">
          <Panel
            srcStartBtn={startBtnSrc}
            srcCredits={creditsSrc}
            onClick={() => this.handleStart()}
            bet={bet}
            isWinner={isWinner}
            gameStarted={gameStarted}
            onChange={e => this.handleInputChange(e)}
            onKeyPress={e => this.handleKeyPress(e)}
            onMouseEnter={() => this.handleMouseEnterStartBtn()}
            onMouseLeave={() => this.handleMouseLeaveStartBtn()}
            onFocus={() => this.handleFocusCredits()}
            onBlur={() => this.handleMouseLeaveStartBtn()}
            onMouseDown={() => this.handleFocusStartBtn()}

          />
          <SpinButton
            src={spinBtnSrc}
            onClick={this.handleSpin}
            isSpinning={isSpinning}
            onMouseEnter={() => this.handleMouseEnterSpinBtn()}
            onMouseLeave={() => this.handleMouseLeaveSpinBtn()}
            onMouseDown={() => this.handleFocusSpinBtn()}
          />
        </div>
      </div>

    </div>
    );
  }
}


export default App;
