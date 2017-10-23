import React, { Component } from 'react';
import io from 'socket.io-client';

import './App.css';
import config from './config.js';

class App extends Component {

  state = {
    timestamp: null,
    spx: {},
    dowi: {},
    nasx: {}
  };

  componentWillMount() {
    this.socket = io(config.serviceUrl);

    this.socket.on('market data', msg => {
      this.setState({
        date: msg.date,
        spx: msg.spx
      });
    });
  }

  _handleClick() {
    this.socket.emit('fetch market data', 'woofer');
  }

  render() {
    return (
      <div className="App">
        {this.state.spx.lastPrice}
        <button onClick={this._handleClick.bind(this)}>Send chat message</button>
      </div>
    );
  }
}

export default App;
