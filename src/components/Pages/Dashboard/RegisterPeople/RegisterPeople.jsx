import { Link } from "react-router-dom";
import RegisterPeopleForm from "./RegisterPeopleForm";

const RegisterPeople = () => {
  return (
    <>
      <section className="d-flex flex-md justify-content-center ventana">
        <div className="card shadow-p">
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
