import './Login.css';
import LoginForm from './LoginForm';
import logo from './logo.svg';

const Login = ({ onLogin }) => {
  return (
    <>
      <section className="d-flex flex-md justify-content-center login">
        <div className="card shadow-p">
          <img src={logo} width="70" height="70" alt="Logo" />
          <h3>Login</h3>
          <section className="card-body">
            <LoginForm onLogin={onLogin} />
            <br />
            <a href="#/test">No tienes cuenta?</a>
          </section>
        </div>
      </section>
    </>
  );
};

export default Login;
