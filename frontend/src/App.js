import logo from './logo.svg';
import './App.css';
import TicTacToeGame from './js/socket_js.js';


function App() {
  return (
    <div className="text-center" id="box">
      <header>
          <h1>Play Tic Tac Toe</h1>
      </header>
      <TicTacToeGame></TicTacToeGame>
    </div>
  );
}

export default App;
