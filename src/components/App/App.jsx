import 'bootstrap-css-only';

import Login from '../Pages/Login';
import SignUp from '../Pages/SignUp';
import Layout from '../Pages/Layout/Layout';
import RegisterPeople from '../Pages/Dashboard/RegisterPeople';
import Table from '../Pages/Dashboard/Table';
import Chart from '../Pages/Dashboard/Chart';

import { Route, Routes, Outlet } from 'react-router-dom';
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
          exact
          path="/dashboard"
          element={
            <PrivateRoute redirectTo="/login">
              <Layout />
              <Outlet />
            </PrivateRoute>
          }
        >
          <Route path="/dashboard/register" element={<RegisterPeople />} />
          <Route path="/dashboard/listado" element={<Table />} />
          <Route path="/dashboard/stats" element={<Chart/>} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
//
