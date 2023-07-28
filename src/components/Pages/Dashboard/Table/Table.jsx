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
      <tbody>
        {data.length > 0 ? (
          data.map(({ id, nombre }) => <ToDoItemRow id={id} nombre={nombre} />)
        ) : (
          <Alert
            classColor={'primart'}
            message={'Aún no tienes Usuarios Censados'}
          />
        )}
      </tbody>
    </table>
  );
};
export default Table;
