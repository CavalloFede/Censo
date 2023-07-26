import './SingUp.css'
import SingUpForm from './SingUpForm/SingUpForm';
import logo from './logo.svg';


const SingUp = ({ onLogin }) => {
  return (
    <>
      <section className="d-flex flex-md justify-content-center login">
        <div className="card shadow-p">
          <img src={logo} width="70" height="70" alt="Logo" />
          <h3>Sing Up</h3>
          <section className="card-body">
            <SingUpForm onLogin={onLogin} />
          </section>
        </div>
      </section>
    </>
  );
};

export default SingUp;
