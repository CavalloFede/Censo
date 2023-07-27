import { useEffect, useState } from 'react';
import Donut from './Donut';

const Chart = ({ data, departamentosData }) => {
  const [usersByState, setUsersByState] = useState([]);
  const [departmentNames, setDepartmentNames] = useState([]);

  useEffect(() => {
    if (data) {
      // Inicializamos los arrays para almacenar la cantidad de personas y los nombres de los departamentos
      const cantidadPersonasPorDepartamento = [];
      const nombresDepartamentos = [];
      // Paso 1: Inicializamos el array cantidadPersonasPorDepartamento con valores en 0
      // Paso 1: Inicializamos el array cantidadPersonasPorDepartamento con valores en 0
      const minDepartamentoId = Math.min(
        ...departamentosData.map((departamento) => departamento.id)
      );

      departamentosData.forEach((departamento) => {
        cantidadPersonasPorDepartamento[
          departamento.id - minDepartamentoId
        ] = 0;
      });

      // Paso 2: Recorremos el array de personas para contar la cantidad de personas por departamento
      data.forEach((persona) => {
        cantidadPersonasPorDepartamento[
          persona.departamento - minDepartamentoId
        ] += 1;
      });

      setUsersByState(cantidadPersonasPorDepartamento);

      departamentosData.forEach((departamento) => {
        nombresDepartamentos[departamento.id - minDepartamentoId] =
          departamento.nombre;
      });
      setDepartmentNames(nombresDepartamentos);
    }
  }, [data]);

  console.log(usersByState);
  console.log(departmentNames);

  return (
    <>
      <div>
        <Donut personas={usersByState} departamentos={departmentNames} />
      </div>
    </>
  );
};
export default Chart;
