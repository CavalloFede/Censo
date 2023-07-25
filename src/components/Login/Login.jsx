import { useState } from 'react';
import { login } from '../../library/apiConnect';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes agregar la lógica para enviar el formulario al servidor o realizar la autenticación.
    login(username, password);
    console.log('Usuario:', username);
    console.log('Contraseña:', password);
    // Luego de enviar el formulario, podrías redirigir a otra página o mostrar un mensaje de éxito.
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Usuario:</label>
        <input type="text" value={username} onChange={handleUsernameChange} />
      </div>
      <div>
        <label>Contraseña:</label>
        <input type="password" value={password} onChange={handlePasswordChange} />
      </div>
      <button type="submit">Iniciar sesión</button>
    </form>
  );
};

export default Login;
