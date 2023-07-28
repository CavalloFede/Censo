import "bootstrap-css-only";
import "./App.css";
import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";
import Layout from "../Pages/Layout/Layout";
import {
  removeUserFromLocalStorage,
  setUserToLocalStorage,
} from "../../utils/storage";
import { Route, Routes, useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  const _onLogin = ({ apiKey, id }) => {
    dispatch(onLogin({ apiKey, id }));
    setUserToLocalStorage({ apiKey, id });
    navigate("/dashboard");
  };
  const _onLogout = ({ apiKey, id }) => {
    dispatch(onLogout({ apiKey, id }));
    removeUserFromLocalStorage();
  };
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/dashboard"
          element={<Layout />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
