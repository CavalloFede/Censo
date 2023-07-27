import { useEffect, useState } from 'react';
import Table from './Table';
import {
  fetchGetPersonasByUser,
  delPersona,
  fetchGetDepartamentos,
} from '../../../services/censoAPI';
import Button from '../../UI/Button';
import Chart from './Chart';

const Dashboard = ({ userLogged }) => {
  const [usersData, setUsersData] = useState([]);
  const [departamentosData, setDepartamentosData] = useState([]);

  useEffect(() => {
    if (userLogged) {
      fetchGetPersonasByUser(userLogged.apiKey, userLogged.id)
        .then((users) => {
          setUsersData(users.personas);
        })
        .catch((e) => {
          console.error(e.message);
        });

      fetchGetDepartamentos(userLogged.apiKey, userLogged.id)
        .then((departamentos) => {
          setDepartamentosData(departamentos.departamentos);
        })
        .catch((e) => {
          console.error(e.message);
        });
    }
  }, [userLogged]);

  const _onDelete = (id) => {
    delPersona(userLogged.apiKey, userLogged.id, id).then(() => {
      const newUsersData = usersData.filter((user) => user.id !== id);
      setUsersData(newUsersData);
    });
  };
  return (
    <>
      <div className="container justify-content-center align-items-center">
        <div className="card text-center ">
          <div className="card-header">
            <h5 className="card-title">Menú Censista</h5>
          </div>
          <div className="card-body d-flex flex-sm-column ">
            <Button className="btn-primary" cta="Censar" />
            <Button className="btn-primary" cta="Listado" />
            <Button className="btn-primary" cta="Stats" />
          </div>
          <div className="card-body">
            <Table data={usersData} onDelete={_onDelete} />;
          </div>
        </div>
      </div>
      <Chart data={usersData} departamentosData={departamentosData} />
    </>
  );
};
export default Dashboard;
