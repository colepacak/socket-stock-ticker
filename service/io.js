import socket_io from 'socket.io';
import fetch from 'node-fetch';

import defaultState from './defaultState.js';

let marketData = defaultState;
const io = socket_io();

io.on('connect', socket => {
  handleConnect.call(socket);

  socket.on('disconnect', handleDisconnect.bind(socket));

  socket.on('fetch market data', msg => handleFetchMarketData.call(socket, msg, marketData));
});

function handleConnect() {
  console.log('Client connected: ' + this.id);
  this.emit('market data', marketData);
}

function handleDisconnect() {
  console.log('Client disconnected: ' + this.id);
}

function handleFetchMarketData(msg, marketData) {
  console.log(msg);
  fetch('https://core-api.barchart.com/v1/quotes/get?method=quotes&fields=symbol%2CsymbolName%2ClastPrice%2CpercentChange%2Cprevious&symbols=%24SPX%2C%24DOWI%2C%24NASX&description=%5Bobject%20Object%5D')
    .then(res => {
      return res.json();
    })
    .then(json => {
      // this transformation is ugly. redux rather than rely on global object? even though the store ends up being a global object.
      marketData = {
        spx: json.data.find(item => { return item.symbol === '$SPX'; }),
        dowi: json.data.find(item => { return item.symbol === '$DOWI'; }),
        nasx: json.data.find(item => { return item.symbol === '$NASX'; }),
        date: Date.now()
      };
      this.emit('market data', marketData);
    });
}


export default io;