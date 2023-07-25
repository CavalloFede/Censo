import { useState } from 'react';
import { login } from '../../library/apiConnect';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleUsernameChange = (event) => {
    const value = event.target.value;
    // Validar que el campo de usuario no contenga espacios en el medio
    if (/\s/.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: 'El nombre de usuario no puede contener espacios',
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, username: undefined }));
    }
    setUsername(value);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    // Validar que el campo de contraseña no contenga espacios en el medio
    if (/\s/.test(value)) {
      console.log('soi');
      setErrors((prevErrors) => ({ ...prevErrors, password: 'La contraseña no puede contener espacios' }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, password: undefined }));
    }
    setPassword(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validación
    const validationErrors = {};
    if (!username.trim()) {
      validationErrors.username = 'El nombre de usuario es requerido.';
    }
    if (!password.trim()) {
      validationErrors.password = 'La contraseña es requerida.';
    }
    if (/\s/.test(username)) {
      validationErrors.username = 'El nombre de usuario no puede contener espacios';
    }
    if (/\s/.test(password)) {
      validationErrors.password = 'La contraseña no puede contener espacios';
    }

    // Si hay errores de validación, actualizamos el estado y detenemos el envío del formulario.
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Realizar el inicio de sesión solo si no hay errores de validación.
    login(username, password)
      .then(() => {
        // Limpiamos los errores después del inicio de sesión exitoso.
        clearErrors();
        // Luego de iniciar sesión, podrías redirigir a otra página o mostrar un mensaje de éxito.
      })
      .catch((error) => {
        // Si ocurre un error en la función de inicio de sesión, podrías mostrar un mensaje de error general.
        console.log('Error al iniciar sesión:', error);
      });
  };

  const clearErrors = () => {
    setErrors({});
  };

  const isFormEmpty = () => {
    return !username.trim() || !password.trim();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Usuario:</label>
        <input type="text" value={username} onChange={handleUsernameChange} />
        {errors.username && <span className="error">{errors.username}</span>}
      </div>
      <div>
        <label>Contraseña:</label>
        <input type="password" value={password} onChange={handlePasswordChange} />
        {errors.password && <span className="error">{errors.password}</span>}
      </div>
      <button type="submit" disabled={isFormEmpty()}>
        Iniciar sesión
      </button>
    </form>
  );
};

export default Login;
