import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchGetPersonasByUser,
  fetchGetDepartamentos,
} from '../../../services/censoAPI';

import { onInitial as iniciarDepartamentos } from '../../../app/slices/departamentosSlice';
import { onInitial as iniciarCensados } from '../../../app/slices/censoSlice';
import { onInitial as iniciarOcupaciones } from '../../../app/slices/ocupacionesSlice';
import { onInitial as iniciarCiudades } from '../../../app/slices/ciudadesSlice';

import Button from '../../UI/Button';
import Table from './Table';
import Chart from './Chart';
import RegisterPeople from './RegisterPeople';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const dispatch = useDispatch();

  const userLogged = useSelector((state) => state.user.userLogged);
  const usersData = useSelector((state) => state.censo.censados);
  const departamentosData = useSelector(
    (state) => state.departamentos.departamentosData
  );

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
    }
  }, [userLogged, dispatch]);

  return (
    <>
      <div className="container justify-content-center align-items-center">
        <div className="card text-center ">
          <div className="card-header">
            <h5 className="card-title">Menú Censista</h5>
          </div>
          <div className="card-body d-flex flex-sm-column ">
            <Link to="/dashboard/register">
              <Button className="btn-primary" cta="Censar" />
            </Link>
            <br />
            <Link to="/dashboard/listado">
              <Button className="btn-primary" cta="Listado" />
            </Link>
            <br />
            <Link to="/dashboard/stats">
              <Button className="btn-primary" cta="Stats" />
            </Link>
          </div>
          <div className="card-body">
            <Table data={usersData} />
          </div>
          <div className="card-body">
            <RegisterPeople />
          </div>
          <div className="card-body">
            <Chart usersData={usersData} departamentosData={departamentosData} />
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
