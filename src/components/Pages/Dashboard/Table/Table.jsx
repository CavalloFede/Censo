import Alert from '../../../UI/Alert';
import ToDoItemRow from './ItemRow';
import './Table.css';

const Table = ({ data }) => {
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>

      {data.length > 0 ? (
        <tbody>
          {data.map(({ id, nombre }) => (
            <ToDoItemRow key={id} id={id} nombre={nombre} />
          ))}
        </tbody>
      ) : (
        <Alert
          classColor={'primart'}
          message={'Aún no tienes Usuarios Censados'}
        />
      )}
    </table>
  );
};
export default Table;
