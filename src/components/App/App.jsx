import 'bootstrap-css-only';

import './App.css';
import Login from '../Pages/Login';
import SignUp from '../Pages/SignUp';
import Layout from '../Pages/Layout/Layout';

import { useState } from 'react';
import { getItemFromLocalStorage } from '../../utils/storage';

function App() {
  const storedUser = getItemFromLocalStorage('censoUser');
  const [userLogged, setUserLogged] = useState(storedUser);
  const _onLogin = (userData) => {
    setUserLogged(userData);
  };

  return (
    <div className="App">
      {userLogged ? (
        <Layout userLogged={userLogged} />
      ) : (
        <Login onLogin={_onLogin} />
      )}
    </div>
  );
}

export default App;
