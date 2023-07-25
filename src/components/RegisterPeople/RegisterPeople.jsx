import { useState, useEffect } from 'react';
import Select from './Select';
import { getOcupaciones, getDepartamentos, getCiudadesByDepartamento, addPersona } from '../../library/apiConnect';

const RegisterPeople = () => {
  const [name, setName] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [selectedOccupation, setSelectedOccupation] = useState('');
  const [occupations, setOccupations] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const apiKey = sessionStorage.getItem('apiKey');
    const idUsuario = sessionStorage.getItem('id');

    getOcupaciones(apiKey, idUsuario)
      .then((ocupacionesObtenidas) => {
        setOccupations(ocupacionesObtenidas.ocupaciones);
      })
      .catch((error) => {
        console.log('Hubo un error al obtener las ocupaciones');
      });

    getDepartamentos(apiKey, idUsuario)
      .then((departamentosObtenidos) => {
        setDepartments(departamentosObtenidos.departamentos);
      })
      .catch((error) => {
        console.log('Hubo un error al obtener las ocupaciones');
      });
  }, []);

  useEffect(() => {
    const apiKey = sessionStorage.getItem('apiKey');
    const idUsuario = sessionStorage.getItem('id');
    getCiudadesByDepartamento(apiKey, idUsuario, selectedDepartment)
      .then((ciudadesObtenidas) => {
        console.log(ciudadesObtenidas.ciudades);
        setCities(ciudadesObtenidas.ciudades);
      })
      .catch((error) => {
        console.log('Hubo un error al obtener las ocupaciones');
      });
  }, [selectedDepartment]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
    console.log(selectedDepartment);
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const handleDateOfBirthChange = (event) => {
    setDateOfBirth(event.target.value);
  };

  const handleOccupationChange = (event) => {
    setSelectedOccupation(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes realizar cualquier acción que necesites con los datos censados,
    // por ejemplo, enviarlos a un servidor o guardarlos en una base de datos.

    // Mostramos los datos censados en la consola para este ejemplo:
    console.log('Nombre:', name);
    console.log('Departamento:', selectedDepartment);
    console.log('Ciudad:', selectedCity);
    console.log('Fecha de nacimiento:', dateOfBirth);
    console.log('Ocupación:', selectedOccupation);

    // Luego de censar la persona, podrías mostrar un mensaje de éxito o redirigir a otra página.
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre:</label>
        <input type="text" value={name} onChange={handleNameChange} />
      </div>
      <div>
        <label>Fecha de nacimiento:</label>
        <input type="date" value={dateOfBirth} onChange={handleDateOfBirthChange} />
      </div>
      <div>
        <label>Ocupación:</label>
        <select value={selectedOccupation} onChange={handleOccupationChange}>
          <option value="">Seleccionar ocupación</option>
          {occupations.map((occupation) => (
            <option key={occupation.id} value={occupation.id}>
              {occupation.ocupacion}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Departamento:</label>
        <select value={selectedDepartment} onChange={handleDepartmentChange}>
          <option value="">Seleccionar Departamento</option>
          {departments.map((department) => (
            <option key={department.id} value={department.id}>
              {department.nombre}
            </option>
          ))}
        </select>
      </div>
      {selectedDepartment && (
        <div>
          <label>Ciudad:</label>
          <select value={selectedCity} onChange={handleCityChange}>
            <option value="">Seleccionar ciudad</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.nombre}
              </option>
            ))}
          </select>
        </div>
      )}
      <button type="submit">Censar</button>
    </form>
  );
};
export default RegisterPeople;
