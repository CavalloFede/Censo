import { useEffect } from "react";
import "./Login.css";
import LoginForm from "./LoginForm";
import logo from "./logo.svg";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ onLogin, user }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  });

  return (
    <>
      <section className="d-flex flex-md justify-content-center login">
        <div className="card shadow-p">
          <img src={logo} width="70" height="70" alt="Logo" />
          <h3>Login</h3>
          <section className="card-body">
            <LoginForm onLogin={onLogin} />
            <br />
            <Link to="/singup">No tienes cuenta?</Link>
          </section>
        </div>
      </section>
    </>
  );
};

export default Login;
