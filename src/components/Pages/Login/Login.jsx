import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import LoginForm from "./LoginForm";
import logo_censo from "./logo_censo.svg";

const Login = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userLogged);

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <>
      <section className="d-flex flex-md justify-content-center ventana">
        <div className="card shadow-p">
          <img src={logo_censo} width="120" height="90" alt="Logo" />
          <h3>Iniciar Sesión</h3>
          <section className="card-body">
            <LoginForm />
            <br />
            <Link to="/signup">¿No tenés cuenta?</Link>
          </section>
        </div>
      </section>
    </>
  );
};

export default Login;
