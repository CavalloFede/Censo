import { useState } from 'react';
import { fetchLogin } from '../../../../services/censoAPI';
import Button from '../../../UI/Button';
import Alert from '../../../UI/Alert';

const LoginForm = ({ onLogin }) => {
  const [alertInfo, setAlertInfo] = useState({ message: '', classColor: '' });
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const _onHandleLogin = async (e) => {
    e.preventDefault();
    if (username.trim() === '' || password.trim() === '') {
      setAlertInfo({
        message: 'Por favor complete los campos',
        classColor: 'danger',
      });
      return;
    }

    try {
      const userData = await fetchLogin(username, password);
      setAlertInfo({ message: 'Registro exitoso', classColor: 'success' });
      setTimeout(() => {
        onLogin(userData);
      }, 2000);
    } catch (error) {
      setAlertInfo({
        message: error.message || 'Ha ocurrido un error',
        classColor: 'danger',
      });
    }
  };

  const _onHandleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }

    setBtnDisabled(username.trim() === '' || password.trim() === '');
  };

  return (
    <>
      <form>
        {alertInfo.message && (
          <Alert
            classColor={alertInfo.classColor}
            message={alertInfo.message}
          />
        )}
        <label>Username</label>
        <br />
        <input
          className="form-control"
          type="text"
          name="username"
          value={username}
          onChange={_onHandleChange}
        />
        <br />
        <label>Password</label>
        <br />
        <input
          className="form-control"
          type="password"
          name="password"
          value={password}
          onChange={_onHandleChange}
        />
        <br />
        <br />
        <Button
          cta={'Sign UP'}
          classColor={'btn-primary'}
          onHandleClick={_onHandleLogin}
          disabled={btnDisabled}
        />
      </form>
    </>
  );
};

export default LoginForm;
