import 'bootstrap-css-only'

import './App.css';
import Login from '../Pages/Login';
import SingUp from '../Pages/SingUp/SingUp';
import RegisterPeople from '../Pages/RegisterPeople/';

import { useState } from 'react';
import { getItemFromLocalStorage } from '../../utils/storage';

function App() {
  const storedUser = getItemFromLocalStorage('censoUser');
  const [userLogged, setUserLogged] = useState(storedUser);
  const _onLogin = userData => {
    setUserLogged(userData)
  }

  return (
    <div className="App">
      <header className="App-header">
        {userLogged ? <RegisterPeople userLogged={userLogged}/> : <Login onLogin={_onLogin} />}

      </header>
    </div>
  );
}

export default App;
