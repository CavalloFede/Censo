import "bootstrap-css-only";

import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";
import Layout from "../Pages/Layout/Layout";
import RegisterPeople from "../Pages/Dashboard/RegisterPeople";
import Table from "../Pages/Dashboard/Table";
import Chart from "../Pages/Dashboard/Chart";

import { Route, Routes } from "react-router-dom";
import NotFound from "../Pages/NotFound";
import PrivateRoute from "../Pages/PrivateRoute";
import "./App.css";
import Dashboard from "../Pages/Dashboard";

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
            </PrivateRoute>
          }
        >
          <Route path="" element={<Dashboard />} />
          <Route path="listado" element={<Table />} />
          <Route path="register" element={<RegisterPeople />} />
          <Route path="stats" element={<Chart />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
