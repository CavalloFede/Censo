import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { onInitial as iniciarDepartamentos } from '../../../../../app/slices/departamentosSlice';
import { onInitial as iniciarOcupaciones } from '../../../../../app/slices/ocupacionesSlice';
import { onInitial as iniciarCiudades } from '../../../../../app/slices/ciudadesSlice';
import { onAdd as agregarPersona } from '../../../../../app/slices/censoSlice';

import Select from '../../../../UI/Select';
import Button from '../../../../UI/Button';

import {
  addPersona,
  fetchGetDepartamentos,
  fetchGetOcupaciones,
  fetchGetCiudadesByDepartamento,
} from '../../../../../services/censoAPI';

const RegisterPeopleForm = () => {
  const dispatch = useDispatch();

  const userLogged = useSelector((state) => state.user.userLogged);
  const departamentosData = useSelector(
    (state) => state.departamentos.departamentosData
  );
  const ciudadesData = useSelector((state) => state.ciudades.ciudadesData);
  const ocupacionesData = useSelector(
    (state) => state.ocupaciones.ocupacionesData
  );

  const [persona, setPersona] = useState({
    id: '',
    nombre: '',
    departamento: '',
    ciudad: '',
    fechaNacimiento: '',
    ocupacion: '',
  });

  const formattedToday = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (userLogged) {
      fetchGetDepartamentos(userLogged.apiKey, userLogged.id)
        .then((departamentos) => {
          dispatch(iniciarDepartamentos(departamentos.departamentos));
        })
        .catch((e) => {
          console.error(e.message); //cambiar error
        });

      fetchGetOcupaciones(userLogged.apiKey, userLogged.id)
        .then((ocupaciones) => {
          dispatch(iniciarOcupaciones(ocupaciones.ocupaciones));
        })
        .catch((e) => {
          console.error(e.message); //cambiar error
        });
    }
  }, [userLogged, dispatch]);

  useEffect(() => {
    if (userLogged) {
      fetchGetCiudadesByDepartamento(
        userLogged.apiKey,
        userLogged.id,
        persona.departamento
      )
        .then((ciudadesObtenidas) => {
          dispatch(iniciarCiudades(ciudadesObtenidas.ciudades));
        })
        .catch((error) => {
          console.log('Hubo un error al obtener los ciudades');
        });
    }
  }, [persona.departamento, userLogged, dispatch]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setPersona({
      ...persona,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    addPersona(userLogged.apiKey, userLogged.id, persona)
      .then((personCensada) => {
        persona.id = personCensada.idCenso;
        dispatch(agregarPersona(persona));
      })
      .catch((error) => {
        console.log('Hubo un error al censar a la persona');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Nombre:</label>
      <br />
      <input
        className="form-control"
        type="text"
        name="nombre"
        value={persona.nombre}
        onChange={handleInputChange}
      />
      <label>Fecha de nacimiento:</label>
      <br />
      <input
        className="form-control"
        type="date"
        name="fechaNacimiento"
        value={persona.fechaNacimiento}
        onChange={handleInputChange}
        max={formattedToday}
      />
      <label>Ocupación:</label>
      <br />
      <Select
        options={ocupacionesData}
        name="ocupacion"
        value={persona.ocupacion}
        onChange={handleInputChange}
      ></Select>
      <label>Departamento:</label>
      <br />
      <Select
        options={departamentosData}
        name="departamento"
        value={persona.departamento}
        onChange={handleInputChange}
      />
      {persona.departamento && (
        <>
          <label>Ciudad:</label>
          <br />
          <Select
            options={ciudadesData}
            name="ciudad"
            value={persona.ciudad}
            onChange={handleInputChange}
          />
          <br />
        </>
      )}
      <br />
      <Button cta={'Censar'} classColor={'btn-primary'} />
    </form>
  );
};
export default RegisterPeopleForm;
