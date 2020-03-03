import React, { Component } from 'react';

class Spinner extends Component {
  constructor(props){
    super(props);
    this.state = {
      position: 0
    }
    this.spin = this.spin.bind(this);
  };

  static iconHeight = 150;

  spin() {
    // Stop the previous spin
    if (this.timer) {
      clearInterval(this.timer);
    }

    this.startPosition = this.setStartPosition();

    this.setState({
      position: this.startPosition,
      timeRemaining: this.props.timer
    });

    // Start a new spin
    this.timer = setInterval(() => {
      this.tick()
    }, 100);
  }

  setStartPosition() {
    return ((Math.floor((Math.random()*5))) * Spinner.iconHeight);
  }

  tick() {
    if (this.state.timeRemaining <= 0) {
      clearInterval(this.timer);
      this.getSymbolFromPosition();
    } else {
      this.moveBackground();
    }
  }

  moveBackground() {
    this.setState({
      position: this.state.position + Spinner.iconHeight,
      timeRemaining: this.state.timeRemaining - 100
    })
  }

  getSymbolFromPosition() {
    let moved = (this.props.timer/100);
    let lastPosition = this.startPosition + Spinner.iconHeight * moved;
    this.props.onFinish(lastPosition % 750);
  }

  render() {
    let { position } = this.state;

    return (
      <div
        style={{backgroundPosition: '8px ' + position + 'px'}}
        className="icons"
      />
    )
  }
}

export default Spinner;
