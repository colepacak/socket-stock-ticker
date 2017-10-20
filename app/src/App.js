import React, { Component } from 'react';
import './App.css';
import io from 'socket.io-client';

class App extends Component {

  componentWillMount() {
    this.socket = io('http://localhost:4000');
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
