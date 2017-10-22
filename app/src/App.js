import React, { Component } from 'react';
import io from 'socket.io-client';

import './App.css';
import config from './config.js';

class App extends Component {

  componentWillMount() {
    this.socket = io(config.serviceUrl);
  }

  _handleClick() {
    this.socket.emit('chat message', 'ahoy');
  }

  render() {
    return (
      <div className="App">
        <button onClick={this._handleClick.bind(this)}>Send chat message</button>
      </div>
    );
  }
}

export default App;
