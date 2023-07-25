const url = 'https://censo.develotion.com';

function login(user, password) {
  let myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  let raw = JSON.stringify({
    usuario: user,
    password: password,
  });
  console.log(raw);

  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  return fetch(`${url}/login.php`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      sessionStorage.setItem('apiKey', result.apiKey);
      sessionStorage.setItem('id', result.id);
    })
    .catch((error) => {
      console.log('error', error);
      throw error; // Propaga el error para que pueda ser manejado en el lugar donde se llama la función
    });
}

function register(user, password) {
  let myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  let raw = JSON.stringify({
    usuario: user,
    password: password,
  });

  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  return fetch(`${url}/usuarios.php`, requestOptions)
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => {
      console.log('error', error);
      throw error; // Propaga el error para que pueda ser manejado en el lugar donde se llama la función
    });
}

function getDepartamentos(apiKey, idUser) {
  let myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('apikey', apiKey);
  myHeaders.append('iduser', idUser);

  let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  return fetch(`${url}/departamentos.php`, requestOptions)
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => {
      console.log('error', error);
      throw error; // Propaga el error para que pueda ser manejado en el lugar donde se llama la función
    });
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
  console.log(idDepartamento);
  return fetch(`${url}/ciudades.php?idDepartamento=${idDepartamento}.php`, requestOptions)
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

  return fetch(`${url}/ciudades.php`, requestOptions)
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

  return fetch(`${url}/personas.php?idUsuario=${idUser}`, requestOptions)
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

  return fetch(`${url}/personas.php`, requestOptions)
    .then((response) => response.json())
    .then((result) => console.log(result))
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

  return fetch(`${url}/personas.php?idCenso=${idCenso}`, requestOptions)
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

  return fetch(`${url}/ocupaciones.php`, requestOptions)
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

  return fetch(`${url}/totalCensados.php`, requestOptions)
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => {
      console.log('error', error);
      throw error; // Propaga el error para que pueda ser manejado en el lugar donde se llama la función
    });
}

export {
  login,
  register,
  getDepartamentos,
  getCiudadesByDepartamento,
  getAllCiudades,
  getPersonasByUser,
  addPersona,
  delPersona,
  getOcupaciones,
  getTotalCenso,
};
