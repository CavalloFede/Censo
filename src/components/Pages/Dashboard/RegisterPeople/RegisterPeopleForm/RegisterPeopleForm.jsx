import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { onInitial as iniciarDepartamentos } from '../../../../../app/slices/departamentosSlice';
import { onInitial as iniciarOcupaciones } from '../../../../../app/slices/ocupacionesSlice';
import { onInitial as iniciarCiudades } from '../../../../../app/slices/ciudadesSlice';
import { onAdd as agregarPersona } from '../../../../../app/slices/censoSlice';
import {
  addPersona,
  fetchGetDepartamentos,
  fetchGetOcupaciones,
  fetchGetCiudadesByDepartamento,
} from '../../../../../services/censoAPI';

import Select from '../../../../UI/Select';
import Button from '../../../../UI/Button';
import Alert from '../../../../UI/Alert';

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

  const [alertInfo, setAlertInfo] = useState({ message: '', classColor: '' });
  const [opcionesOcupacion, setOpcionesOcupacion] = useState(ocupacionesData);
  const [isFormComplete, setIsFormComplete] = useState(true);
  const [persona, setPersona] = useState({
    id: '',
    nombre: '',
    departamento: '',
    ciudad: '',
    fechaNacimiento: '',
    ocupacion: '',
    ocupacionName: '',
  });

  const resetPersonaState = () => {
    setPersona({
      id: '',
      nombre: '',
      departamento: '',
      ciudad: '',
      fechaNacimiento: '',
      ocupacion: '',
      ocupacionName: '',
    });
  };

  const formattedToday = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const isComplete =
      persona.nombre.trim() !== '' &&
      persona.departamento.trim() !== '' &&
      persona.ciudad.trim() !== '' &&
      persona.fechaNacimiento.trim() !== '' &&
      persona.ocupacion.trim() !== '';
    setIsFormComplete(!isComplete);
  }, [persona]);

  useEffect(() => {
    if (userLogged) {
      fetchGetDepartamentos(userLogged.apiKey, userLogged.id)
        .then((departamentos) => {
          dispatch(iniciarDepartamentos(departamentos.departamentos));
        })
        .catch((e) => {
          console.error(e.message);
        });

      fetchGetOcupaciones(userLogged.apiKey, userLogged.id)
        .then((ocupaciones) => {
          dispatch(iniciarOcupaciones(ocupaciones.ocupaciones));
        })
        .catch((e) => {
          console.error(e.message);
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

  useEffect(() => {
    const filteredOcupaciones =
      persona.fechaNacimiento && calcularEdad(persona.fechaNacimiento) < 18
        ? [ocupacionesData.find((opcion) => opcion.ocupacion === 'Estudiante')]
        : ocupacionesData;

    setOpcionesOcupacion(filteredOcupaciones);
  }, [persona.fechaNacimiento, ocupacionesData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
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
        persona.departamento = parseInt(persona.departamento);
        persona.ocupacion = parseInt(persona.ocupacion);
        persona.ciudad = parseInt(persona.ciudad);

        dispatch(agregarPersona(persona));
        setAlertInfo({ message: 'Censo exitoso', classColor: 'success' });
        resetPersonaState();
        setTimeout(() => {
          setAlertInfo({ message: '', classColor: '' });
        }, 2000);
      })
      .catch((error) => {
        setAlertInfo({
          message: error.message || 'Ha ocurrido un error',
          classColor: 'danger',
        });
        setTimeout(() => {
          setAlertInfo({ message: '', classColor: '' });
        }, 2000);
      });
  };

  const calcularEdad = (fechaNacimiento) => {
    const fechaNacimientoDate = new Date(fechaNacimiento);
    const hoy = new Date();

    let edad = hoy.getFullYear() - fechaNacimientoDate.getFullYear();
    const mesActual = hoy.getMonth();
    const diaActual = hoy.getDate();
    const mesNacimiento = fechaNacimientoDate.getMonth();
    const diaNacimiento = fechaNacimientoDate.getDate();

    if (
      mesActual < mesNacimiento ||
      (mesActual === mesNacimiento && diaActual < diaNacimiento)
    ) {
      edad--;
    }

    return edad;
  };

  return (
    <form onSubmit={handleSubmit}>
      {alertInfo.message && (
        <Alert classColor={alertInfo.classColor} message={alertInfo.message} />
      )}
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
        options={opcionesOcupacion}
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
      <Button
        cta={'Censar'}
        classColor={'btn-primary'}
        disabled={isFormComplete}
      />
    </form>
  );
};
export default RegisterPeopleForm;
