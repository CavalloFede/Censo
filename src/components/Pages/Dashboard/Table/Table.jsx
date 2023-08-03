import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  fetchGetPersonasByUser,
  fetchGetOcupaciones,
} from '../../../../services/censoAPI';
import { onInitial as iniciarCensados } from '../../../../app/slices/censoSlice';
import { onInitial as iniciarOcupaciones } from '../../../../app/slices/ocupacionesSlice';

import logo from './logo.svg';
import Alert from '../../../UI/Alert';
import Select from '../../../UI/Select';
import ToDoItemRow from './ItemRow';
import './Table.css';

const Table = () => {
  const dispatch = useDispatch();

  const userLogged = useSelector((state) => state.user.userLogged);
  const usersData = useSelector((state) => state.censo.censados);
  const ocupacionesData = useSelector(
    (state) => state.ocupaciones.ocupacionesData
  );

  const [ocupacion, setOcupacion] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(usersData);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setOcupacion(value);
  };

  useEffect(() => {
    if (userLogged) {
      fetchGetPersonasByUser(userLogged.apiKey, userLogged.id)
        .then((users) => {
          dispatch(iniciarCensados(users.personas));
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
    if (ocupacion !== '') {
      console.log('hola');
      const filteredUsersData = usersData.filter(
        (user) => user.ocupacion === parseInt(ocupacion)
      );
      setFilteredUsers(filteredUsersData);
    } else {
      setFilteredUsers(usersData);
    }
  }, [ocupacion, usersData]);

  return (
    <>
      <section className="d-flex flex-md justify-content-center login">
        <div className="card shadow-p">
          <img src={logo} width="70" height="70" alt="Logo" />
          <h3>Listado de personas censadas</h3>
          <section className="card-body">
            <Select
              options={ocupacionesData}
              value={ocupacion}
              name={ocupacion}
              onChange={handleInputChange}
            ></Select>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Ocupacion</th>
                  <th scope="col">Borrar</th>
                </tr>
              </thead>

              {filteredUsers.length > 0 ? (
                <tbody>
                  {filteredUsers.map(({ id, nombre, ocupacion }) => (
                    <ToDoItemRow
                      key={id}
                      id={id}
                      nombre={nombre}
                      ocupacion={ocupacion}
                      ocupaciones={ocupacionesData}
                    />
                  ))}
                </tbody>
              ) : (
                <Alert
                  classColor={'primary'}
                  message={'Aún no tienes Usuarios Censados'}
                />
              )}
            </table>
            <Link to="/dashboard">Volver</Link>
          </section>
        </div>
      </section>
    </>
  );
};
export default Table;
