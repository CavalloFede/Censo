import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Donut from "./Donut";

const Chart = () => {
  const usersData = useSelector((state) => state.censo.censados);
  const departamentosData = useSelector(
    (state) => state.departamentos.departamentosData
  );

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
      <div className="container justify-content-center align-items-center">
        <div className="card text-center ">
          <div className="card-header">
            <h5 className="card-title">Stats</h5>
          </div>
          <div className="card-body d-flex flex-sm-column ">
            <div className="card-body">
              <Donut personas={usersByState} departamentos={departmentNames} />
              <br />
              <Link to="/dashboard">Volver</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Chart;
