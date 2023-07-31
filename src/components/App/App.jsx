import 'bootstrap-css-only';

import Login from '../Pages/Login';
import SignUp from '../Pages/SignUp';
import Layout from '../Pages/Layout/Layout';
import RegisterPeople from '../Pages/Dashboard/RegisterPeople';
import Table from '../Pages/Dashboard/Table';
 

import { Route, Routes } from 'react-router-dom';
import NotFound from '../Pages/NotFound';
import PrivateRoute from '../Pages/PrivateRoute';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute redirectTo="/login">
              <Layout />
            </PrivateRoute>
          }
        >
          <Route path="register" element={<RegisterPeople />} />
          <Route path="listado" element={<Table />} />
          <Route path="stats" element={<RegisterPeople />} />

        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
//
