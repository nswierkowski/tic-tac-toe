import logo from './logo.svg';
import './App.css';
import TicTacToeGame from './components/socket_js.js';
import { Account } from './components/Account.js';
import Signup from './components/Signup.js';
import Login from './components/Login.js';


function App() {
  return (
    <div className="text-center" id="box">
      <Account>
        <Signup />
        <Login />
      </Account>
      <header>
          <h1>Play Tic Tac Toe</h1>
      </header>
      <TicTacToeGame></TicTacToeGame>
    </div>
  );
}

export default App;
