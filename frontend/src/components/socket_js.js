import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import Signup from './Signup';

const url = process.env.REACT_APP_API_URL;
console.log(`url = ${url}`)

const TicTacToeGame = () => {
  const [gameId, setGameId] = useState(null);
  const [playerType, setPlayerType] = useState('');
  const [turns, setTurns] = useState([["#", "#", "#"], ["#", "#", "#"], ["#", "#", "#"]]);
  const [gameOn, setGameOn] = useState(false);
  const [opponent, setOpponent] = useState('');
  let stompClient;

  useEffect(() => {
    if (gameId) {
      connectToSocket(gameId);
    }
  }, [gameId]);

  const connectToSocket = (gameId) => {
    console.log("connecting to the game");
    const socket = new SockJS(url + "/gameplay");
    stompClient = new Client({ webSocketFactory: () => socket });
    stompClient.activate();
    stompClient.onConnect = () => {
      console.log("Connected to WebSocket");
      stompClient.subscribe("/topic/game-progress/" + gameId, (response) => {
        const data = JSON.parse(response.body);
        console.log(data);
        displayResponse(data);
      });
    };
  };

  const createGame = () => {
    const login = document.getElementById("login").value;
    if (!login) {
      alert("Please enter login");
    } else {
      fetch(url  + "/game/start", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "login": login
        })
      })
      .then(response => response.json())
      .then(data => {
        setGameId(data.gameId);
        setPlayerType('X');
        reset();
        setGameOn(true);
        alert("You created a game. Game id is: " + data.gameId);
      })
      .catch(error => console.log(error));
    }
  };

  const connectToRandom = () => {
    const login = document.getElementById("login").value;
    if (!login) {
      alert("Please enter login");
    } else {
      fetch(url + "/game/connect/random", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "login": login
        })
      })
      .then(response => response.json())
      .then(data => {
        setGameId(data.gameId);
        setPlayerType('O');
        setOpponent(data.player1.login);
        reset();
        setGameOn(true);
        alert("Congrats you're playing with: " + data.player1.login);
      })
      .catch(error => console.log(error));
    }
  };

  const playerTurn = (id) => {
    if (gameOn) {
      const xCoordinate = id.split("_")[0];
      const yCoordinate = id.split("_")[1];
      const spotTaken = turns[xCoordinate][yCoordinate];
      if (spotTaken === "#") {
        makeAMove(playerType, xCoordinate, yCoordinate);
      }
    }
  };

  const makeAMove = (type, xCoordinate, yCoordinate) => {
    fetch(url + "/game/gameplay", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "type": type,
        "coordinateX": xCoordinate,
        "coordinateY": yCoordinate,
        "gameId": gameId
      })
    })
    .then(response => response.json())
    .then(data => {
      setGameOn(false);
      displayResponse(data);
    })
    .catch(error => console.log(error));
  };

  const displayResponse = (data) => {
    const newTurns = [...turns];
    data.board.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (cell === 1) {
          newTurns[i][j] = 'X';
        } else if (cell === 2) {
          newTurns[i][j] = 'O';
        }
      });
    });
    setTurns(newTurns);
    if (data.winner) {
      alert("Winner is " + data.winner);
    }
    setGameOn(true);
  };

  const reset = () => {
    setTurns([["#", "#", "#"], ["#", "#", "#"], ["#", "#", "#"]]);
  };

  return (
    <div>
      <Signup />
      <input type="text" id="login" placeholder="Enter login" />
      <button onClick={createGame}>Create Game</button>
      <button onClick={connectToRandom}>Connect to Random Game</button>
      <ul id="gameBoard">
        {turns.map((row, i) => (
          row.map((cell, j) => (
            <li key={`${i}_${j}`} className="tic" id={`${i}_${j}`} onClick={() => playerTurn(`${i}_${j}`)}>
              {cell}
            </li>
          ))
        ))}
      </ul>
      <input id="game_id" placeholder="Paste game id"/>
      <button onClick={connectToSocket}>Connect by game id</button>
      <button onClick={reset}>Reset</button>
      <div id="message"></div>
      <div className="clearfix"></div>
      <footer>
          <span>You are playing with {opponent}</span>
          <br />
          <span>It's {gameOn ? 'your' : opponent}'s move</span>
      </footer>
    </div>
  );
};

export default TicTacToeGame;
