### Server
* fetch stock data periodically
* store stock data in a JS object
* on update, push new data to clients via sockets
* configure hostname to be IP within private network

### Client
* component that establishes connection with server via sockets
* displays stock data

### Client - hacker mode
* inputting contra password enables hacker mode
* hacker client can take control of stock tickers on other clients. options include:
* * cause stock values to plummet to zero
* * fade in a picture of a skull