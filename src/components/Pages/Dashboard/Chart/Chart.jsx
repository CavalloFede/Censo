import { useEffect, useState } from 'react';
import Donut from './Donut';

const Chart = ({ usersData, departamentosData }) => {
  const [usersByState, setUsersByState] = useState([]);
  const [departmentNames, setDepartmentNames] = useState([]);

  useEffect(() => {
    if (usersData && departamentosData) {
      const cantidadPersonasPorDepartamento = [];
      const nombresDepartamentos = [];

      const minDepartamentoId = Math.min(
        ...departamentosData.map((departamento) => departamento.id)
      );

      departamentosData.forEach((departamento) => {
        cantidadPersonasPorDepartamento[
          departamento.id - minDepartamentoId
        ] = 0;
      });

      usersData.forEach((persona) => {
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
  }, [usersData, departamentosData]);

  return (
    <>
      <div>
        <Donut personas={usersByState} departamentos={departmentNames} />
      </div>
    </>
  );
};
export default Chart;
