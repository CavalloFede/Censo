import { useEffect, useState } from 'react';
import Table from './Table';
import { fetchGetPersonasByUser } from '../../../services/censoAPI';
const Dashboard = ({ userLogged }) => {
  const [usersData, setUsersData] = useState([]);
  useEffect(() => {
    if (userLogged) {
        fetchGetPersonasByUser(userLogged.apiKey, userLogged.id)
        .then((users) => {
          setUsersData(users.personas);
        })
        .catch((e) => {
          console.error(e.message);
        });
    }
  }, [userLogged]);
  return <Table data={usersData} />;
};
export default Dashboard;
