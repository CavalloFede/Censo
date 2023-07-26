import { useState } from 'react';
import { fetchLogin, fetchRegister } from '../../../../services/censoAPI';
import Button from '../../../UI/Button';
import Alert from '../../../UI/Alert';

const SingUpForm = ({ onLogin }) => {
  const [alertInfo, setAlertInfo] = useState({ message: '', classColor: '' });
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const _checkWhitespace = (value) => {
    const trimmedValue = value.trim();
    if (value.length !== trimmedValue.length) {
      return true;
    }
    return /\s/.test(trimmedValue);
  };

  const _checkSimbols = (value) => {
    const trimmedValue = value.trim();
    return /[^A-Za-z0-9]/.test(trimmedValue);
  };

  const _onHandleLogin = async (e) => {
    e.preventDefault();

    const hasWhitespace =
      _checkWhitespace(username) || _checkWhitespace(password);

    const hasSimbols = _checkSimbols(username) || _checkSimbols(password);

    if (username.trim() === '' || password.trim() === '') {
      setAlertInfo({
        message: 'Por favor complete los campos',
        classColor: 'danger',
      });
      return;
    }

    if (hasWhitespace) {
      setAlertInfo({
        message:
          'El usuario y la contraseña no pueden contener espacios en blanco',
        classColor: 'danger',
      });
      return;
    }

    if (hasSimbols) {
      setAlertInfo({
        message: 'El usuario y la contraseña no pueden contener simbolos',
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

    const hasWhitespace = _checkWhitespace(value);
    const hasSimbols = _checkSimbols(value);
    if (hasWhitespace) {
      setAlertInfo({
        message:
          'El usuario y la contraseña no pueden contener espacios en blanco',
        classColor: 'danger',
      });
    } else if (hasSimbols) {
      setAlertInfo({
        message: 'El usuario y la contraseña no pueden contener simbolos',
        classColor: 'danger',
      });
    } else {
      setAlertInfo({
        message: '',
        classColor: '',
      });
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

export default SingUpForm;
