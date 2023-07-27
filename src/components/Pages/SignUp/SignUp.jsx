import SignUpForm from './SingUpForm';
import logo from './logo.svg';

const SignUp = ({ onLogin }) => {
  return (
    <>
      <section className="d-flex flex-md justify-content-center login">
        <div className="card shadow-p">
          <img src={logo} width="70" height="70" alt="Logo" />
          <h3>Sign Up</h3>
          <section className="card-body">
            <SignUpForm onLogin={onLogin} />
          </section>
        </div>
      </section>
    </>
  );
};

export default SignUp;
