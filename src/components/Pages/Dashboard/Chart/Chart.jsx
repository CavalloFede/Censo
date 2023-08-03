import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchGetPersonasByUser,
  fetchGetDepartamentos,
  fetchGetOcupaciones,
  fetchGetTotalCenso,
} from '../../../../services/censoAPI';
import { Link } from 'react-router-dom';
import { onInitial as iniciarDepartamentos } from '../../../../app/slices/departamentosSlice';
import { onInitial as iniciarCensados } from '../../../../app/slices/censoSlice';
import { onInitial as iniciarOcupaciones } from '../../../../app/slices/ocupacionesSlice';

import Donut from './Donut';
import Bar from './Bar';
import Timer from './Timer';
import Percentage from './Percentage';

const Chart = () => {
  const dispatch = useDispatch();

  const userLogged = useSelector((state) => state.user.userLogged);
  const usersData = useSelector((state) => state.censo.censados);
  const departamentosData = useSelector(
    (state) => state.departamentos.departamentosData
  );
  const ocupacionesData = useSelector(
    (state) => state.ocupaciones.ocupacionesData
  );

  const [usersByState, setUsersByState] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [usersByOcupation, setUsersByOcupation] = useState([]);
  const [departmentsName, setDepartmentsName] = useState([]);
  const [ocupationsName, setOcupationsName] = useState([]);

  useEffect(() => {
    if (userLogged) {
      fetchGetTotalCenso(userLogged.apiKey, userLogged.id)
        .then((total) => {
          setTotalUsers(total.total);
        })
        .catch((e) => {
          console.error(e.message);
        });

      fetchGetPersonasByUser(userLogged.apiKey, userLogged.id)
        .then((users) => {
          dispatch(iniciarCensados(users.personas));
        })
        .catch((e) => {
          console.error(e.message);
        });

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
    if (usersData && departamentosData && ocupacionesData) {
      const cantidadPersonasPorDepartamento = departamentosData.map(
        (departamento) => 0
      );

      const minDepartamentoId = Math.min(
        ...departamentosData.map((departamento) => departamento.id)
      );

      usersData.forEach((persona) => {
        cantidadPersonasPorDepartamento[
          persona.departamento - minDepartamentoId
        ] += 1;
      });

      setUsersByState(cantidadPersonasPorDepartamento);

      const cantidadDePersonasPorOcupacion = ocupacionesData.map(
        (ocupacion) => 0
      );

      usersData.forEach((persona) => {
        if (persona.ocupacion > 5) {
          cantidadDePersonasPorOcupacion[persona.ocupacion - 2] += 1;
        } else {
          cantidadDePersonasPorOcupacion[persona.ocupacion - 1] += 1;
        }
      });

      setUsersByOcupation(cantidadDePersonasPorOcupacion);

      setDepartmentsName(
        departamentosData.map((departamento) => departamento.nombre)
      );
      setOcupationsName(
        ocupacionesData.map((ocupacion) => ocupacion.ocupacion)
      );
    }
  }, [usersData, departamentosData, ocupacionesData]);

  return (
    <>
      <div className="container justify-content-center align-items-center">
        <div className="card text-center ">
          <div className="card-header">
            <h5 className="card-title">Stats</h5>
          </div>
          <div className="card-body d-flex flex-sm-column ">
            <div className="card-body">
              <Donut
                usersByState={usersByState}
                departmentsName={departmentsName}
              />
              <br />
              <Bar
                usersByOcupation={usersByOcupation}
                ocupationsName={ocupationsName}
              />
              <br />
              <Timer />
              <br />
              <Percentage totalUsers={totalUsers} usersByUser={usersData} />
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
