import { Link } from "react-router-dom";
import RegisterPeopleForm from "./RegisterPeopleForm";
import logo from "./logo.svg";

const RegisterPeople = () => {
  return (
    <>
      <section className="d-flex flex-md justify-content-center login">
        <div className="card shadow-p">
          <img src={logo} width="70" height="70" alt="Logo" />
          <h3>Censar</h3>
          <section className="card-body">
            <RegisterPeopleForm />
            <br />
            <Link to="/dashboard">Volver</Link>
          </section>
        </div>
      </section>
    </>
  );
};
export default RegisterPeople;
