import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import RegisterPeople from './components/RegisterPeople/RegisterPeople';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Inicio de sesión</h1>
        <Login />
        <Register />
        <RegisterPeople />
      </header>
    </div>
  );
}

export default App;
