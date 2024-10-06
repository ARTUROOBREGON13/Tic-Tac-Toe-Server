# Tic-Tac-Toe Server

This is a WebSocket server for the Tic-Tac-Toe game. It acts as a bridge between two clients, allowing real-time communication to facilitate online gameplay.

## Features

- WebSocket-based communication for online Tic-Tac-Toe matches.
- Supports multiple games by handling individual connections per session.
- Sends real-time updates to clients as players take turns.

## Prerequisites

- Node.js (version 14 or above)
- NPM (version 6 or above)

## Getting Started

1. Clone this repository:

```bash
git clone https://github.com/your-username/tic-tac-toe-server.git
```

2. Navigate into the project directory:

```bash
cd tic-tac-toe
```

3. Install the dependencies:

```bash
npm install
```

4. Run the WebSocket server:

```bash
node server.js
```

5. The server will run on ws://localhost:8080/ by default.

## WebSocket Server Details

- The server listens for client connections on port 8080.
- Upon connection, each player is assigned either X or O.
- Clients exchange game updates through messages in JSON format.
- The server ensures that only the correct player can make a move on their turn.
- When a player wins or the game ends in a draw, the server broadcasts the result to both clients.

### Example Message Format

#### Client to Server (Move):

```json
{
  "type": "move",
  "player": "X",
  "position": 4
}
```

#### Server to Client (Update):

```json
{
  "type": "update",
  "board": ["X", "", "", "", "O", "", "", "", ""],
  "nextPlayer": "O"
}
```

## Customization

You can change the port and other settings by editing `server.js`. You can also extend the logic to support more features such as spectators or score tracking.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
