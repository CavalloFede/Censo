import SignUpForm from './SingUpForm';
import logo from './logo.svg';

const SignUp = () => {
  return (
    <>
      <section className="d-flex flex-md justify-content-center login">
        <div className="card shadow-p">
          <img src={logo} width="70" height="70" alt="Logo" />
          <h3>Sign Up</h3>
          <section className="card-body">
            <SignUpForm />
          </section>
        </div>
      </section>
    </>
  );
};

export default SignUp;
