import { useEffect, useState } from "react";
import Donut from "./Donut";

const Chart = ({ data, departamentosData }) => {
  const [usersByState, setUsersByState] = useState([]);
  const [departmentNames, setDepartmentNames] = useState([]);

  useEffect(() => {
    if (data) {
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
  }, [data, departamentosData]);

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
