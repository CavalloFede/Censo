import "bootstrap-css-only";
import "./App.css";
import Login from "../Pages/Login";
// eslint-disable-next-line no-unused-vars
import SignUp from "../Pages/SignUp";
import Layout from "../Pages/Layout/Layout";
import { useSelector, useDispatch } from "react-redux";
import { onLogin, onLogout } from "../../app/slices/userSlice";
import {
  removeUserFromLocalStorage,
  setUserToLocalStorage,
} from "../../utils/storage";
import { Route, Routes, useNavigate } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
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
        <Route path="/" element={<Login onLogin={_onLogin} />} />
        <Route path="/login" element={<Login onLogin={_onLogin} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/dashboard"
          element={<Layout onLogout={_onLogout} />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
