import { useEffect, useState } from 'react';
import Alert from '../../../UI/Alert';
import Select from '../../../UI/Select';
import ToDoItemRow from './ItemRow';
import './Table.css';

const Table = ({ usersData, ocupacionesData }) => {
  const [ocupacion, setOcupacion] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(usersData);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setOcupacion(value);
  };

  useEffect(() => {
    if (ocupacion !== '') {
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
            classColor={'primart'}
            message={'Aún no tienes Usuarios Censados'}
          />
        )}
      </table>
    </>
  );
};
export default Table;
