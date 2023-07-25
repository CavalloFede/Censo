import { useState, useEffect } from 'react';
import Select from './Select';
import { getOcupaciones, getDepartamentos, getCiudadesByDepartamento, addPersona } from '../../library/apiConnect';

const RegisterPeople = () => {
  const [persona, setPersona] = useState({
    name: '',
    selectedDepartment: '',
    selectedCity: '',
    dateOfBirth: '',
    selectedOccupation: '',
  });

  const [occupations, setOccupations] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [cities, setCities] = useState([]);
  const formattedToday = new Date().toISOString().split('T')[0];

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
    getCiudadesByDepartamento(apiKey, idUsuario, persona.selectedDepartment)
      .then((ciudadesObtenidas) => {
        setCities(ciudadesObtenidas.ciudades);
      })
      .catch((error) => {
        console.log('Hubo un error al obtener los ciudades');
      });
  }, [persona.selectedDepartment]);

  const handleInputChange = (event) => {
    console.log(event.target);
    const { name, value } = event.target;
    setPersona({
      ...persona,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const apiKey = sessionStorage.getItem('apiKey');
    const idUsuario = sessionStorage.getItem('id');
    addPersona(apiKey, idUsuario, persona)
      .then((personCensada) => {
        console.log(personCensada);
      })
      .catch((error) => {
        console.log('Hubo un error al censar a la persona');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre:</label>
        <input type="text" name="name" value={persona.name} onChange={handleInputChange} />
      </div>
      <div>
        <label>Fecha de nacimiento:</label>
        <input
          type="date"
          name="dateOfBirth"
          value={persona.dateOfBirth}
          onChange={handleInputChange}
          max={formattedToday}
        />
      </div>
      <div>
        <label>Ocupación:</label>
        <Select
          options={occupations}
          name="selectedOccupation"
          value={persona.selectedOccupation}
          onChange={handleInputChange}
        ></Select>
      </div>
      <div>
        <label>Departamento:</label>
        <Select
          options={departments}
          name="selectedDepartment"
          value={persona.selectedDepartment}
          onChange={handleInputChange}
        />
      </div>
      {persona.selectedDepartment && (
        <div>
          <label>Ciudad:</label>
          <Select options={cities} name="selectedCity" value={persona.selectedCity} onChange={handleInputChange} />
        </div>
      )}
      <button type="submit">Censar</button>
    </form>
  );
};
export default RegisterPeople;
