import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchGetPersonasByUser,
  fetchGetDepartamentos,
  fetchGetOcupaciones,
} from '../../../../services/censoAPI';
import { Link } from 'react-router-dom';
import { onInitial as iniciarDepartamentos } from '../../../../app/slices/departamentosSlice';
import { onInitial as iniciarCensados } from '../../../../app/slices/censoSlice';
import { onInitial as iniciarOcupaciones } from '../../../../app/slices/ocupacionesSlice';

import Donut from './Donut';
import Bar from './Bar';
import Timer from './Timer';
import PeopleMap from './PeopleMap';
import Progress from './Progress';

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
  const [usersByOcupation, setUsersByOcupation] = useState([]);
  const [departmentsName, setDepartmentsName] = useState([]);
  const [ocupationsName, setOcupationsName] = useState([]);

  useEffect(() => {
    if (userLogged) {
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
      const cantidadPersonasPorDepartamento = departamentosData.map(() => 0);

      const minDepartamentoId = Math.min(
        ...departamentosData.map((departamento) => departamento.id)
      );

      usersData.forEach((persona) => {
        cantidadPersonasPorDepartamento[
          persona.departamento - minDepartamentoId
        ] += 1;
      });

      setUsersByState(cantidadPersonasPorDepartamento);

      const cantidadDePersonasPorOcupacion = ocupacionesData.map(() => 0);

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
      <section className="justify-content-center ventana">
        <div className="container card">
          <h5 className="card-title">Stats</h5>

          <div className="row w-100 mx-0">
            <div className="col-6 bg-primary">
              <Timer />
            </div>
            <div className="col-6 bg-secondary">
              <Progress censadosPorUsuario={usersData.length} />
            </div>
          </div>
          <div className="row w-100 mx-0">
            <div className="col px-0 col-6">
              <div className="row w-100 mx-0 bg-success">
                <Donut
                  usersByState={usersByState}
                  departmentsName={departmentsName}
                />
              </div>
              <div className="row w-100 mx-0 bg-info ">
                <Bar
                  usersByOcupation={usersByOcupation}
                  ocupationsName={ocupationsName}
                />
              </div>
            </div>
            <div className="col col-6 bg-danger ">
              <PeopleMap
                departamentos={departamentosData}
                usersByState={usersByState}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Chart;
