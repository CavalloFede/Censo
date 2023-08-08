import { Link } from "react-router-dom";

import SignUpForm from "./SingUpForm";
import logo from "./logo.svg";

const SignUp = () => {
  return (
    <>
      <section className="d-flex flex-md justify-content-center ventana">
        <div className="card shadow-p">
          <img src={logo} width="70" height="70" alt="Logo" />
          <h3>Registrarse</h3>
          <section className="card-body">
            <SignUpForm />
            <br />
            <Link to="/login">Volver</Link>
          </section>
        </div>
      </section>
    </>
  );
};

export default SignUp;
