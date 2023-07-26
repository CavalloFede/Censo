import { setUserToLocalStorage } from '../utils/storage';

const BASE_URL = 'https://censo.develotion.com';

const fetchLogin = async (username, password) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      usuario: username,
      password: password,
    }),
  };

  try {
    const response = await fetch(`${BASE_URL}/login.php`, requestOptions);
    if (response.status === 200) {
      return response.json().then((data) => {
        const { apiKey, id } = data;
        console.log(data);
        setUserToLocalStorage({ apiKey, id });
        return Promise.resolve({
          apiKey,
          id,
        });
      });
    }

    return Promise.reject({
      code: response.status,
      message: 'Ha ocurrido un error',
    });
  } catch (error) {
    return Promise.reject({
      message: error,
    });
  }
};

const fetchRegister = async (username, password) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      usuario: username,
      password: password,
    }),
  };

  try {
    const response = await fetch(`${BASE_URL}/usuarios.php`, requestOptions);
    if (response.status === 200) {
      return response.json().then((data) => {
        const { apiKey, id } = data;
        setUserToLocalStorage({ apiKey, id });
        return Promise.resolve({
          apiKey,
          id,
        });
      });
    }
    return Promise.reject({
      code: response.status,
      message: 'Ha ocurrido un error',
    });
  } catch (error) {
    return Promise.reject({
      message: error,
    });
  }
};

async function fetchGetDepartamentos(apiKey, idUser) {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      apikey: apiKey,
      iduser: idUser,
    },
    redirect: 'follow',
  };

  try {
    const response = await fetch(`${BASE_URL}/departamentos.php`, requestOptions);
    if (response.status === 200) {
      return response.json();
    }
    return Promise.reject({
      code: response.status,
      message: 'Ha ocurrido un error',
    });
  } catch (error) {
    return Promise.reject({
      message: error,
    });
  }
}

function getCiudadesByDepartamento(apiKey, idUser, idDepartamento) {
  let myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('apikey', apiKey);
  myHeaders.append('iduser', idUser);

  let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };
  return fetch(`${BASE_URL}/ciudades.php?idDepartamento=${idDepartamento}`, requestOptions) //preguntar porque aca con .php no anda
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => {
      console.log('error', error);
      throw error; // Propaga el error para que pueda ser manejado en el lugar donde se llama la función
    });
}

function getAllCiudades(apiKey, idUser) {
  let myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('apikey', apiKey);
  myHeaders.append('iduser', idUser);

  let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  return fetch(`${BASE_URL}/ciudades.php`, requestOptions)
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => {
      console.log('error', error);
      throw error; // Propaga el error para que pueda ser manejado en el lugar donde se llama la función
    });
}

function getPersonasByUser(apiKey, idUser) {
  let myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('apikey', apiKey);
  myHeaders.append('iduser', idUser);

  let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  return fetch(`${BASE_URL}/personas.php?idUsuario=${idUser}`, requestOptions)
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => {
      console.log('error', error);
      throw error; // Propaga el error para que pueda ser manejado en el lugar donde se llama la función
    });
}

function addPersona(apiKey, idUser, personaData) {
  let myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('apikey', apiKey);
  myHeaders.append('iduser', idUser);

  let raw = JSON.stringify({
    idUsuario: idUser,
    nombre: personaData.nombre,
    departamento: personaData.idDepartamento,
    ciudad: personaData.idCiudad,
    fechaNacimiento: personaData.fechaNacimiento,
    ocupacion: personaData.idOcupacion,
  });

  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  return fetch(`${BASE_URL}/personas.php`, requestOptions)
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => {
      console.log('error', error);
      throw error; // Propaga el error para que pueda ser manejado en el lugar donde se llama la función
    });
}

function delPersona(apiKey, idUser, idCenso) {
  let myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('apikey', apiKey);
  myHeaders.append('iduser', idUser);

  let requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    redirect: 'follow',
  };

  return fetch(`${BASE_URL}/personas.php?idCenso=${idCenso}`, requestOptions)
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => {
      console.log('error', error);
      throw error; // Propaga el error para que pueda ser manejado en el lugar donde se llama la función
    });
}

function getOcupaciones(apiKey, iduser) {
  let myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('apikey', apiKey);
  myHeaders.append('iduser', iduser);

  let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  return fetch(`${BASE_URL}/ocupaciones.php`, requestOptions)
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => {
      console.log('error', error);
      throw error; // Propaga el error para que pueda ser manejado en el lugar donde se llama la función
    });
}
function getTotalCenso(apiKey, iduser) {
  let myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('apikey', apiKey);
  myHeaders.append('iduser', iduser);

  let urlencoded = new URLSearchParams();

  let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow',
  };

  return fetch(`${BASE_URL}/totalCensados.php`, requestOptions)
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => {
      console.log('error', error);
      throw error; // Propaga el error para que pueda ser manejado en el lugar donde se llama la función
    });
}

export {
  fetchLogin,
  fetchRegister,
  fetchGetDepartamentos,
  getCiudadesByDepartamento,
  getAllCiudades,
  getPersonasByUser,
  addPersona,
  delPersona,
  getOcupaciones,
  getTotalCenso,
};
