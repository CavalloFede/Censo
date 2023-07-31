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
    const response = await fetch(
      `${BASE_URL}/departamentos.php`,
      requestOptions
    );
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

async function fetchGetCiudadesByDepartamento(apiKey, idUser, idDepartamento) {
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
    const response = await fetch(
      `${BASE_URL}/ciudades.php?idDepartamento=${idDepartamento}`,
      requestOptions
    );
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

async function fetchGetAllCiudades(apiKey, idUser) {
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
    const response = await fetch(`${BASE_URL}/ciudades.php`, requestOptions);
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

async function fetchGetPersonasByUser(apiKey, idUser) {
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
    const response = await fetch(
      `${BASE_URL}/personas.php?idUsuario=${idUser}`,
      requestOptions
    );
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

async function addPersona(apiKey, idUser, personaData) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: apiKey,
      iduser: idUser,
    },
    body: JSON.stringify({
      idUsuario: idUser,
      nombre: personaData.nombre,
      departamento: personaData.departamento,
      ciudad: personaData.ciudad,
      fechaNacimiento: personaData.fechaNacimiento,
      ocupacion: personaData.ocupacion,
    }),
    redirect: 'follow',
  };
  try {
    const response = await fetch(`${BASE_URL}/personas.php`, requestOptions);
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

async function delPersona(apiKey, idUser, idCenso) {
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      apikey: apiKey,
      iduser: idUser,
    },
    redirect: 'follow',
  };

  try {
    const response = await fetch(
      `${BASE_URL}/personas.php?idCenso=${idCenso}`,
      requestOptions
    );
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

async function fetchGetOcupaciones(apiKey, idUser) {
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
    const response = await fetch(`${BASE_URL}/ocupaciones.php`, requestOptions);
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
async function fetchGetTotalCenso(apiKey, idUser) {
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
    const response = await fetch(
      `${BASE_URL}/totalCensados.php`,
      requestOptions
    );
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

export {
  fetchLogin,
  fetchRegister,
  fetchGetDepartamentos,
  fetchGetCiudadesByDepartamento,
  fetchGetAllCiudades,
  fetchGetPersonasByUser,
  addPersona,
  delPersona,
  fetchGetOcupaciones,
  fetchGetTotalCenso,
};
