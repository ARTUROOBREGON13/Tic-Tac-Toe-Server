const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

let players = []; // Stores Players and Symbols

wss.on('connection', (ws) => {
  // If there's less than two players, it assigns symbols X or O
  if (players.length < 2) {
    const symbol = players.length === 0 ? 'X' : 'O';
    players.push({ ws, symbol });
    ws.send(JSON.stringify({ type: 'symbol', symbol }));

    // Notifies who is connected
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ type: 'info', message: `Player ${symbol} connected.` }));
      }
    });

    // When both players are connected, it starts the game
    if (players.length === 2) {
      players[0].ws.send(JSON.stringify({ type: 'start', turn: 'X' }));
      players[1].ws.send(JSON.stringify({ type: 'start', turn: 'X' }));
    }
  } else {
    ws.send(JSON.stringify({ type: 'info', message: 'Game is full.' }));
    ws.close(); // Closes connection for extra players
  }

  ws.on('message', (message) => {
    const parsedMessage = JSON.parse(message);
    const currentPlayer = players.find(player => player.ws === ws);
    
    // Only the current turn player can move
    if (parsedMessage.type === 'move' && parsedMessage.turn === currentPlayer.symbol) {
      // Sends move to each player
      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: 'move', moveIndex: parsedMessage.moveIndex, symbol: currentPlayer.symbol }));
        }
      });

      // Toggles Turn
      const nextTurn = currentPlayer.symbol === 'X' ? 'O' : 'X';
      players.forEach(player => {
        player.ws.send(JSON.stringify({ type: 'turn', turn: nextTurn }));
      });
    }
    if (parsedMessage.type == 'reset'){
      players.forEach(player => {
        player.ws.send(JSON.stringify({ type: 'reset' }));
      });
    }
    
  });

  ws.on('close', () => {
    // Deletes disconnected player
    players = players.filter(player => player.ws !== ws);
  });
});
